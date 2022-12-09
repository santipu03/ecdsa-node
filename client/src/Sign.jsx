import { useState } from "react";
import server from "./server";

function Sign() {
  const [privateKey, setPrivateKey] = useState("");
  const [signature, setSignature] = useState("");
  const [msgHash, setMsgHash] = useState("");
  const [recoveryBit, setRecoveryBit] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value.toLowerCase());

  const sign = async (e) => {
    e.preventDefault();
    try {
      const {
        data: { msgHash, signature, recoveryBit },
      } = await server.post(`sign`, {
        privateKey,
      });
      setMsgHash(msgHash);
      setSignature(signature);
      setRecoveryBit(recoveryBit);
      setPrivateKey("");
    } catch (err) {
      console.log(err);
    }
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

      <div className="balance">Message Hash: {msgHash}</div>
      <div className="balance">Signature: {signature}</div>
      <div className="balance">Recovery Bit: {recoveryBit}</div>

      <input type="submit" className="button" value="Sign" />
    </form>
  );
}

export default Sign;
