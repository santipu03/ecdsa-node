import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";
import { useState } from "react";

function Wallet({
  address,
  setAddress,
  balance,
  setBalance,
  signedMessage,
  setSignedMessage,
}) {
  const { status, setStatus } = false;

  async function onChange(evt) {
    const signedMessage = evt.target.value;
    setSignedMessage(signedMessage);
  }

  async function checkBalance() {
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  // async function verifyMessage() {
  //   if (signedMessage) {
  //     const {
  //       data: { balance },
  //     } = await server.get(`balance/${address}`);
  //     setBalance(balance);
  //   } else {
  //     setBalance(0);
  //   }
  // }

  async function verifyMessage() {
    if (signedMessage) {
      const {
        data: { msg },
      } = await server.post(`verify`, {
        msg: signedMessage,
      });
      console.log(msg);
    }
  }

  return (
    <div className="container wallet">
      <h1>Wallet</h1>

      <label>
        Signed Message
        <input
          placeholder="Paste the signed message here"
          value={signedMessage}
          onChange={onChange}
        ></input>
      </label>

      {status ? <div>Status: VERIFIED</div> : <div>Status: NOT VERIFIED</div>}

      <button onClick={verifyMessage} className="button">
        Verify Message
      </button>

      <div className="balance">Wallet: {address}</div>
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
