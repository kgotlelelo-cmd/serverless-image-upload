const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");


const s3Client = new S3Client({ region: process.env.AWS_REGION || 'us-east-1' });

const generatePresignedUrl = async () => {
    const bucketName = process.env.BUCKET_NAME;
    const key = `images/${Date.now()}-image.png`;

    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        ContentType: "image/png",
    });

    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    return { url, key };
}

module.exports = {
    generatePresignedUrl
};