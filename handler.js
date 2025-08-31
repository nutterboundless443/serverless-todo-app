const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'Todos';

module.exports.create = async (event) => {
  const todo = JSON.parse(event.body);
  const params = {
    TableName: TABLE_NAME,
    Item: todo
  };
  await docClient.put(params).promise();
  return { statusCode: 201, body: JSON.stringify(todo) };
};

module.exports.getAll = async () => {
  const params = {
    TableName: TABLE_NAME
  };
  const result = await docClient.scan(params).promise();
  return { statusCode: 200, body: JSON.stringify(result.Items) };
};

module.exports.delete = async (event) => {
  const id = event.pathParameters.id;
  const params = {
    TableName: TABLE_NAME,
    Key: { id: id.toString() }
  };
  await docClient.delete(params).promise();
  return { statusCode: 204 };
};