const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");

app.use(cors());
app.use(express.json());

const balances = {
  "0xe34655d1af60239111125ba68377f6731f83f54d": 100,
  "0x83a54340b036b2679cef2b300b1178e33033f67e": 50,
  "0x3a6ed79d36d90ccb6160d8cfd610b1fc9f9b95a7": 75,
};

const usedSignatures = [];

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { amount, recipient, msgHash, signature, recoveryBit } = req.body;
  let recoveredPublicKey, senderAddress;

  recoverPublicKey(msgHash, signature, recoveryBit).then((publicKey) => {
    recoveredPublicKey = publicKey;
    senderAddress = `0x${toHex(
      keccak256(recoveredPublicKey).slice(1).slice(-20)
    )}`;

    setInitialBalance(senderAddress);
    setInitialBalance(recipient);

    if (balances[senderAddress] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else if (usedSignatures.includes(signature)) {
      res.status(400).send({ message: "Signature already used!" });
    } else {
      usedSignatures.push(signature);
      balances[senderAddress] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[senderAddress], senderAddress });
    }
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

async function recoverPublicKey(msgHash, signature, recoveryBit) {
  const recoveredPublicKey = await secp.recoverPublicKey(
    msgHash,
    signature,
    parseInt(recoveryBit)
  );

  return recoveredPublicKey;
}

// Private Key: c059043036d17488a7cd07197f474e972669e86ce5f66d1e2e8e42aafa1197b0
// Public Key: 04258b958c6284e247ad8630b65b44540535a14490418b9540f183758978a18e087a972c74152fae4938942eadf3146fb57b320756ed4d93ed8588d309e8754461
// Address: 0x3a6ed79d36d90ccb6160d8cfd610b1fc9f9b95a7
