const { saveImageMetadata } = require('./service');

const handler = async (event) => {
    console.log("S3 Event received:", JSON.stringify(event, null, 2));
    const imageMetadata = [];
    for (const record of event.Records) {
        const bucket = record.s3.bucket.name;
        const key = decodeURIComponent(record.s3.object.key.replace(/\+/g, " "));
        const size = record.s3.object.size;

        imageMetadata.push({ bucket, key, size });
        await saveImageMetadata(imageMetadata);
    }
}

module.exports = { handler };