import { useState } from 'react';
import { convertSilverPrice } from '../utils/silverLogic';

export default function PriceConverter() {
  const [usdOz, setUsdOz] = useState(30.5);
  const [exchangeRate, setExchangeRate] = useState(25400);
  const [result, setResult] = useState(null);

  const handleConvert = () => {
    const res = convertSilverPrice(Number(usdOz), Number(exchangeRate));
    setResult(res);
  };

  return (
    <div>
      <div className="section-header" style={{ marginBottom: '16px' }}>
        <span className="section-title">USD/oz to VND/Tael Converter</span>
      </div>
      <p style={{ color: 'var(--muted)', fontSize: '11px', marginBottom: '24px', letterSpacing: '0.04em' }}>
        Conversion tool to translate global silver spot price to domestic price based on custom fx rate.
      </p>
      
      <div className="input-group">
        <label>Global Silver (USD/oz)</label>
        <input 
          type="number" 
          value={usdOz} 
          onChange={(e) => setUsdOz(e.target.value)} 
          step="0.1"
        />
      </div>

      <div className="input-group">
        <label>USD/VND Exchange Rate</label>
        <input 
          type="number" 
          value={exchangeRate} 
          onChange={(e) => setExchangeRate(e.target.value)} 
        />
      </div>

      <button onClick={handleConvert}>Calculate Price</button>

      {result !== null && (
        <div className="info-row" style={{ marginTop: '24px', borderBottom: 'none' }}>
          <span className="info-key">Converted Price</span>
          <span className="info-val" style={{ color: 'var(--accent-light)', fontSize: '16px' }}>
            {Math.round(result).toLocaleString('en-US')} VND/Tael
          </span>
        </div>
      )}
    </div>
  );
}
