const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");

exports.DeleteObject = async function (objectKey) {

    if (!objectKey) {
        throw new Error('object key is required');
    }
    else {

        const client = new S3Client({ region: process.env.Region });
        const command = new DeleteObjectCommand({
            Bucket: process.env.BlogPostContentBucketName,
            Key: objectKey
        });

        await client.send(command);
    }
}