const { docClient } = require("../core/databaseclient");
const { PutCommand } = require("@aws-sdk/lib-dynamodb");

const tableName = process.env.METADATA_TABLE;

const saveImageMetadata = async (imageMetadata) => {

    for (const metadata of imageMetadata) {

        const { bucket, key, size } = metadata;
        const params = {
            TableName: tableName,
            Item: {
                imageId: key,
                bucket: bucket,
                size: size,
                processedAt: new Date().toISOString()
            }
        }

        try {
            const command = new PutCommand(params);
            await docClient.send(command);
            console.log("Successfully saved metadata for:", key);
        } catch (error) {
            console.log("Error saving metadata:", error?.message);
        }
    }
};

module.exports = { saveImageMetadata };