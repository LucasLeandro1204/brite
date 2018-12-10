const { Secret, Token } = require('fernet');
const secret = new Secret('TluxwB3fV_GWuLkR1_BzGs1Zk90TYAuhNMZP_0q4WyM=');
const message = 'gAAAAABcDuXPk5f3YDdlPBpptdPYTv1pwD-ntRQeJKNDYXpYkB5UPSq1LHWqD5jS4P2GVn8AJNx68JvuyFwVy4WqKjkc6hClJSbfWSCERVBK608Yur_lLMf8GF3yLvnu9wY-VuPxg43qjahq1nAoyBIROqS1ZvCYqZoWb4u8V5r2dcmj0m13cUaQtWhzPlrE-a4k-HCUZgQO';
const token = new Token({
  secret,
  ttl: 0,
  token: message,
});

console.log(token.decode());
