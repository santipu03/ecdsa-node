const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");

// Paste here the values to recover the Public Key
const msgHash =
  "8e5ba2564bac5c7de3890bd885a03a1777c50476f325c11a7dbd4e817bb13c02";
const signature =
  "3044022008ab49e98052968d3d341252f83b3acc43e0279d1dea60635899d50d87c9961a022051d1d2f1a5e6576831a43d005a69204febdf2f74f449b6aaba766cd51791b464";
const recoveryBit = 0;

const recoverPublicKey = async (msgHash, signature, recoveryBit) => {
  const recoveredPublicKey = await secp.recoverPublicKey(
    msgHash,
    signature,
    recoveryBit
  );
  return recoveredPublicKey;
};

recoverPublicKey(msgHash, signature, recoveryBit).then((recoveredPublicKey) => {
  console.log(`Recovered Public Key: ${toHex(recoveredPublicKey)}`);
});
