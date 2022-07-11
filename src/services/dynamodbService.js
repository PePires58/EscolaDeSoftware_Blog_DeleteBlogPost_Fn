const { DynamoDBClient, DeleteItemCommand, GetItemCommand } = require("@aws-sdk/client-dynamodb");

exports.DeleteBlogPost = async function (key) {
    if (!key) {
        throw new Error('key is required')
    }
    else {
        const client = new DynamoDBClient({ region: process.env.Region });
        const command = new DeleteItemCommand({
            TableName: process.env.BlogPostTableName,
            Key: {
                "title": key
            }
        });

        await client.send(command);
    }
}

exports.GetBlogPostByKey = async function (key) {
    if (!key) {
        throw new Error('key is required')
    }
    else {
        const client = new DynamoDBClient({ region: process.env.Region });
        const command = new GetItemCommand({
            TableName: process.env.BlogPostTableName,
            Key: {
                'title': { S: key }
            }
        });
        const response = await client.send(command);

        return response.Item;
    }
}