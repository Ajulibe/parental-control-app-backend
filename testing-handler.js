const { app } = require('./app');
const serverless = require('serverless-http');

const serverlessApp = serverless(app);
module.exports.api = async (event, context) => {
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
