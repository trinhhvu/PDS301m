import { useState, useEffect } from 'react';

export default function LiveTicker() {
  const [prices, setPrices] = useState({ world: 31.50, local: 1200000 });
  const [prevPrices, setPrevPrices] = useState({ world: 31.50, local: 1200000 });
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/silver-price')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success' && data.live) {
          const liveWorld = data.live.spot;
          const liveLocal = data.live.local_price;
          setPrices({ world: liveWorld, local: liveLocal });
          setPrevPrices({ world: liveWorld, local: liveLocal });
          setIsFetched(true);
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!isFetched) return;

    const simulateTick = () => {
      setPrices(prev => {
        setPrevPrices(prev);
        const worldChange = (Math.random() * 0.1 - 0.05);
        const localChange = Math.floor(Math.random() * 600 - 300);
        
        return {
          world: parseFloat((prev.world + worldChange).toFixed(2)),
          local: prev.local + localChange
        };
      });
      
      const nextTick = Math.random() * 1500 + 1000;
      timeOutId = setTimeout(simulateTick, nextTick);
    };

    let timeOutId = setTimeout(simulateTick, 2000);
    return () => clearTimeout(timeOutId);
  }, [isFetched]);

  const worldIsUp = prices.world >= prevPrices.world;
  const worldDiff = (prices.world - prevPrices.world).toFixed(2);
  
  const localIsUp = prices.local >= prevPrices.local;
  const localDiff = prices.local - prevPrices.local;

  return (
    <div className="metrics-bar">
      <div className="metric-card">
        <div className="metric-label">Global Silver (Live Spot)</div>
        <div className="metric-value gold">${prices.world.toFixed(2)}</div>
        <div className={`metric-change ${worldIsUp ? 'up' : 'down'}`}>
          {worldIsUp ? '▲ +' : '▼ '}{worldDiff} (USD/oz)
        </div>
      </div>
      <div className="metric-card">
        <div className="metric-label">Silver 999 (Live VND)</div>
        <div className="metric-value gold">{prices.local.toLocaleString('en-US')}</div>
        <div className={`metric-change ${localIsUp ? 'up' : 'down'}`}>
          {localIsUp ? '▲ +' : '▼ '}{localDiff.toLocaleString('en-US')} (VND/chi)
        </div>
      </div>
      <div className="metric-card">
        <div className="metric-label">Silver 925 (Est.)</div>
        <div className="metric-value">{(Math.round(prices.local * 0.925)).toLocaleString('en-US')}</div>
        <div className="metric-change" style={{ color: 'var(--muted)' }}>Based on 999 price x 0.925</div>
      </div>
      <div className="metric-card">
        <div className="metric-label">Market Status</div>
        <div className="metric-value" style={{ color: 'var(--up)', fontSize: '18px', marginTop: '4px' }}>Open</div>
        <div className={`metric-change ${worldIsUp ? 'up' : 'down'}`}>Based on NY exchange</div>
      </div>
    </div>
  );
}
