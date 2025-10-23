const { generatePresignedUrl } = require('./service');

const generateUploadURL = async (req, res) => {
    try {
        const results = await generatePresignedUrl();
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error?.message || "Could not generate upload URL" });
    }
}

module.exports = {
    generateUploadURL
};