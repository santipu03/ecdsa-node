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
  "0x82850e255b1b6dc6ca2014da9731b5cdbf3b40b3": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/verify", (req, res) => {
  const { msgHash, signature, recoveryBit } = req.body;
  const recoverPublicKey = async (msgHash, signature, recoveryBit) => {
    const recoveredPublicKey = await secp.recoverPublicKey(
      msgHash,
      signature,
      recoveryBit
    );
    return recoveredPublicKey;
  };

  recoverPublicKey(msgHash, signature, parseInt(recoveryBit)).then(
    (recoveredPublicKey) => {
      res.send({
        recoveredPublicKey: toHex(recoveredPublicKey),
      });
    }
  );
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
