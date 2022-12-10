import { useState } from "react";
import * as secp from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils";

function Sign() {
  const [privateKey, setPrivateKey] = useState("");
  const [signature, setSignature] = useState("");
  const [msgHash, setMsgHash] = useState("");
  const [recoveryBit, setRecoveryBit] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value.toLowerCase());

  const sign = async (e) => {
    e.preventDefault();

    const messageBytes = utf8ToBytes("something random");
    const messageHash = keccak256(messageBytes);
    const array = await secp.sign(messageHash, privateKey, {
      recovered: true,
      extraEntropy: true,
    });
    setMsgHash(toHex(messageHash));
    setSignature(toHex(array[0]));
    setRecoveryBit(array[1]);
  };

  return (
    <form className="container sign" onSubmit={sign}>
      <h1>Sign Transaction</h1>

      <label>
        Private Key
        <input
          placeholder="WARNING!! DO NOT PASTE ANY PRIVATE KEY WITH REAL FUNDS"
          value={privateKey}
          onChange={setValue(setPrivateKey)}
        ></input>
      </label>

      <div className="balance">
        <b>Message Hash: </b> {msgHash}
      </div>
      <div className="balance">
        <b>Signature:</b> {signature}
      </div>
      <div className="balance">
        <b>Recovery Bit:</b> {recoveryBit}
      </div>

      <input type="submit" className="button" value="Sign" />
    </form>
  );
}

export default Sign;
