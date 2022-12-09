const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");

const privateKey =
  "23cb3031041e44c4afe62222c91f5350022ae1bdfa6309ab9d04d2ed8ce295bb";
const bytesArrayMsg = utf8ToBytes("Hello");
const messageHash = keccak256(bytesArrayMsg);

const sign = async (msg) => {
  const msgHash = keccak256(msg);
  const array = await secp.sign(msgHash, privateKey, {
    recovered: true,
    extraEntropy: true,
  });
  return [msgHash, array[0], array[1]];
};

sign(messageHash).then((array) => {
  console.log(`MsgHash: ${toHex(array[0])}`);
  console.log(`Signature: ${toHex(array[1])}`);
  console.log(`Recovery Bit: ${array[2]}`);
});
