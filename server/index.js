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
  "0xbb1b09a9f2647a136255bdf733511d4dee68e37b": 100,
  "0x18c0c8c13ad7bc329a4276fa2a159da361af24da": 50,
  "0x67d99d0a0aa726f8c7d0402b2940aeda93b51d7c": 75,
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
