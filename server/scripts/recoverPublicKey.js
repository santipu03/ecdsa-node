const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");

// Paste here the values to recover the Public Key
const msgHash =
  "ed39ccdbf3d862bc10d67dbf77b0f5f22c3ec3e08ea4be7d379762b281d2c1c6";
const signature =
  "3045022100f219150dad22ba0559df524da404114a7e2632dff755138aefd3e3548b8dc177022003e7ecbb12d80ab2da5964fa87c839934bed17d8222678e738feef96f285957a";
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
