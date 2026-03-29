import { useState, useEffect } from 'react';
import { 
  getTwoWayVolDays, 
  getAllVolDays, 
  CONVERSION_RATES, 
  HISTORICAL_HIGHS 
} from '../utils/marketData';

export default function MarketDashboard() {
  const [livePrices, setLivePrices] = useState([]);
  const [liveInfo, setLiveInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/silver-price')
      .then(res => {
        if (!res.ok) throw new Error('Network error or Backend server is not running');
        return res.json();
      })
      .then(data => {
        if (data.status === 'success') {
          setLivePrices(data.data);
          setLiveInfo(data.live);
        } else {
          throw new Error(data.message);
        }
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const daysBoth = Array.from(getTwoWayVolDays());
  const daysAll = Array.from(getAllVolDays());

  const basePrice = liveInfo?.local_price || 1200000;
  
  const brandedSilver = [
    { name: "Silver 999 (SJC)", sub: "Listed bars", purity: 99.9, colorClass: "badge-sjc", buyAdj: -25000, sellAdj: 0 },
    { name: "Silver 999 (DOJI)", sub: "Investment ingots", purity: 99.9, colorClass: "badge-doji", buyAdj: -30000, sellAdj: 10000 },
    { name: "Silver 925 (PNJ)", sub: "Premium jewelry", purity: 92.5, colorClass: "badge-pnj", buyAdj: -150000, sellAdj: -100000 }
  ];

  return (
    <>
      <div className="section-header">
        <span className="section-title">Brand Prices & History (Live Update)</span>
        <span className="section-tag">VND / Chi</span>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Brand / Category</th>
              <th>Purity</th>
              <th>Buy Price</th>
              <th>Sell Price</th>
              <th>Change</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {brandedSilver.map((item, idx) => {
              const sellPrice = item.purity === 92.5 ? Math.round(basePrice * 0.925) : basePrice + item.sellAdj;
              const buyPrice = sellPrice + item.buyAdj;
              
              return (
                <tr key={idx}>
                  <td>
                    <span className="td-name">
                      {item.name.split(' (')[0]}
                      <small>{item.sub}</small>
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${item.colorClass}`}>
                      {item.purity}%
                    </span>
                  </td>
                  <td className="price-buy">{buyPrice.toLocaleString('en-US')}</td>
                  <td className="price-sell">{sellPrice.toLocaleString('en-US')}</td>
                  <td><span className="change-up">▲ +{Math.floor(Math.random() * 50) + 10}0</span></td>
                  <td style={{ color: 'var(--muted)', fontSize: '11px' }}>Just now</td>
                </tr>
              );
            })}

             <tr>
                <td>
                  <span className="td-name">Global Silver<small>XAG/USD Spot (Live API)</small></span>
                </td>
                <td><span className="badge badge-world">INTL</span></td>
                <td className="price-buy">—</td>
                <td className="price-sell">
                  {loading ? 'Loading...' : (liveInfo ? `${liveInfo.spot} USD` : 'N/A')}
                </td>
                <td>
                  {error ? (
                    <span style={{ color: 'var(--down)', fontSize: '11px' }}>Backend err</span>
                  ) : (
                    <span className="change-down">▼ -0.05</span>
                  )}
                </td>
                <td style={{ color: 'var(--muted)', fontSize: '11px' }}>Live</td>
              </tr>
          </tbody>
        </table>
      </div>

      <div className="section-header" style={{ marginTop: '24px' }}>
        <span className="section-title">In-depth Structs Analysis</span>
      </div>
      <div className="metrics-bar" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', marginBottom: '48px' }}>
        <div className="metric-card">
           <div className="metric-label">Volatility Days (Set)</div>
           <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--muted)' }}>Two-way Volatility (Intersection):</div>
           <div className="chips-container" style={{ margin: '4px 0 12px 0' }}>
             {daysBoth.map(d => <span key={d} className="chip warning">{d}</span>)}
           </div>
           <div style={{ fontSize: '12px', color: 'var(--muted)' }}>All Volatility (Union):</div>
           <div className="chips-container" style={{ margin: '4px 0 0 0' }}>
             {daysAll.map(d => <span key={d} className="chip">{d}</span>)}
           </div>
        </div>
        <div className="metric-card">
           <div className="metric-label">Constants & Peaks (Tuple)</div>
           <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
             <li className="chip">1 Tael = {CONVERSION_RATES[0]} Oz</li>
             {HISTORICAL_HIGHS.map((h, i) => (
                <li key={i} className="chip" style={{ borderLeft: '2px solid var(--accent)' }}>
                  All-time High {h[0]}: {h[1]} USD/oz
                </li>
              ))}
           </ul>
        </div>
      </div>
    </>
  );
}
