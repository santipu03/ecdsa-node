import { useState } from "react";
import server from "./server";

function Transfer({ setBalance }) {
  const [signature, setSignature] = useState("");
  const [msgHash, setMsgHash] = useState("");
  const [recoveryBit, setRecoveryBit] = useState("");
  const [output, setOutput] = useState("");
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value.toLowerCase());

  async function transfer(evt) {
    evt.preventDefault();

    try {
      const {
        data: { balance, senderAddress },
      } = await server.post(`send`, {
        amount: parseInt(sendAmount),
        recipient,
        msgHash,
        signature,
        recoveryBit,
      });
      setBalance(balance);
      const shortSenderAddress = `${senderAddress.substring(
        0,
        4
      )}...${senderAddress.substring(senderAddress.length - 4)}`;
      const shortRecipientAddress = `${recipient.substring(
        0,
        4
      )}...${recipient.substring(recipient.length - 4)}`;

      setOutput(
        <div>
          <b>{shortSenderAddress}</b> sent <b>{shortRecipientAddress}</b> an
          amount of <b>{sendAmount}</b>
        </div>
      );
      setSendAmount("");
      setRecipient("");
      setMsgHash("");
      setSignature("");
      setRecoveryBit("");
    } catch (ex) {
      console.log(ex);
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x82850e255b1b6dc6ca2014da9731b5cdbf3b40b3"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <label>
        Message Hash
        <input
          placeholder="Paste hash of the message here"
          value={msgHash}
          onChange={setValue(setMsgHash)}
        ></input>
      </label>
      <label>
        Signature
        <input
          placeholder="Paste signature here"
          value={signature}
          onChange={setValue(setSignature)}
        ></input>
      </label>
      <label>
        Recovery Bit
        <input
          placeholder="Paste recovery bit here"
          value={recoveryBit}
          onChange={setValue(setRecoveryBit)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
      <div className="balance">Output: &nbsp;&nbsp;{output}</div>
    </form>
  );
}

export default Transfer;
