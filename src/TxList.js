export default function TxList({ txs }) {
    if (txs.length === 0) return null;
  
    return (
      <>
        {txs.map((item) => (
          <div key={item} className="alert alert-info mt-5">
            <div className="flex-1">
              <label>transaction hash: {item.hash}</label>
              <p></p>
              <a href="https://acstuff.ru/s/q:race/online/join?ip=15.235.162.98&httpPort=8083">Launch the game!</a>
            </div>
          </div>
        ))}
      </>
    );
  }