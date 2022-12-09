const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");

const privateKey =
  "1c7f9a779b571fa7453d6f399904fb1c6689529e5f840d2350655b8563d36f29";
const bytesArrayMsg = utf8ToBytes("Hello");
const messageHash = keccak256(bytesArrayMsg);

const sign = async (msg) => {
  const msgHash = keccak256(msg);
  const array = await secp.sign(msgHash, privateKey, { recovered: true });
  return [msgHash, array[0], array[1]];
};

sign(messageHash).then((array) => {
  console.log(`MsgHash: ${toHex(array[0])}`);
  console.log(`Signature: ${toHex(array[1])}`);
  console.log(`Recovery Bit: ${array[2]}`);
});
