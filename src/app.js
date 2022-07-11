let response;

const dynamodbService = require('./services/dynamodbService');
const s3Service = require('./services/s3Service');

exports.lambdaHandler = async (event, context) => {
    try {
        const dynamoDbItem = await dynamodbService.GetBlogPostByKey(event.queryStringParameters.key);

        console.log('dynamodb item');
        console.log(dynamoDbItem);

        Promise.all([
            dynamodbService.DeleteBlogPost(dynamoDbItem.title.S),
            s3Service.DeleteObject(dynamoDbItem.content_bucket_key.S)
        ]);

        response = {
            'statusCode': 200,
            'isBase64Encoded': false,
            'headers': {}
        }

    } catch (err) {
        console.log(err);
        response = {
            'statusCode': 500,
            'body': JSON.stringify({ error: err }),
            'isBase64Encoded': false,
            'headers': {}
        }
    }

    return response
};