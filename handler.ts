import { app } from './app';
import serverless from 'serverless-http';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';

const serverlessApp = serverless(app);
module.exports.api = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
  try {
    await serverlessApp(event, context);
    return {
      statusCode: 200,
      body: 'Success! server is running'
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    };
  }
};
