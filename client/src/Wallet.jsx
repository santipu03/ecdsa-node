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
      <div className="balance">
        Example Wallets:
        <ul>
          <li>0xe34655d1af60239111125ba68377f6731f83f54d</li>
          <li>0x83a54340b036b2679cef2b300b1178e33033f67e</li>
          <li>0x82850e255b1b6dc6ca2014da9731b5cdbf3b40b3</li>
        </ul>
      </div>
    </div>
  );
}

export default Wallet;
