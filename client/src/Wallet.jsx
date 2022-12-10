import server from "./server";

function Wallet({ address, setAddress, balance, setBalance }) {
  async function onChange(evt) {
    const address = evt.target.value.toLowerCase();
    setAddress(address);
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

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>
      <label>
        Wallet Address
        <input
          placeholder="Type an address"
          value={address}
          onChange={onChange}
        ></input>
      </label>
      <div type="button" className="button" onClick={checkBalance}>
        Check Balance
      </div>
      <div className="balance">Balance: {balance}</div>
      <div className="exampleWalletsContainer">
        <ul>
          <li>
            <b>Private Key:&nbsp;&nbsp;</b>
            7de927f359047962a4ccbf1dce5a477339199f6b8a1d6eeb2262f66dd684cc62
          </li>
          <li>
            <b>Address:&nbsp;</b> 0xbb1b09a9f2647a136255bdf733511d4dee68e37b
          </li>
        </ul>
        <ul>
          <li>
            <b>Private Key:&nbsp;&nbsp;</b>
            22a19353f97b9521bc03a723e0f3c61db8df93214eae5afbd5dcd64cca88bce8
          </li>
          <li>
            <b>Address:&nbsp;</b> 0x18c0c8c13ad7bc329a4276fa2a159da361af24da
          </li>
        </ul>
        <ul>
          <li>
            <b>Private Key:&nbsp;&nbsp;</b>
            e6e32a4f580432b1b8c474f418d6e94ad06a7a5feb988ec922c4f3aa91cb982b
          </li>
          <li>
            <b>Address:&nbsp;</b> 0x67d99d0a0aa726f8c7d0402b2940aeda93b51d7c
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Wallet;
