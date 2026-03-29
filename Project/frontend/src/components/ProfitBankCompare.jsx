import { useState } from 'react';
import { compareInvestmentVsBank, calculateBreakEven } from '../utils/silverLogic';

export default function ProfitBankCompare() {
  const [activeTab, setActiveTab] = useState('compare');
  
  const [capital, setCapital] = useState(11800000 * 5 + 12500000 * 2);
  const [silverProfit, setSilverProfit] = useState(1600000);
  
  const [purchasePrice, setPurchasePrice] = useState(1200000);
  
  const [bankRateAnnual, setBankRateAnnual] = useState(5.0);
  const [months, setMonths] = useState(3);
  
  const [result, setResult] = useState(null);
  const [beResult, setBeResult] = useState(null);

  const handleCompare = () => {
    const res = compareInvestmentVsBank(
      Number(capital),
      Number(silverProfit),
      Number(bankRateAnnual),
      Number(months)
    );
    setResult(res);
  };

  const handleCalculateBE = () => {
    const res = calculateBreakEven(
      Number(purchasePrice),
      Number(bankRateAnnual),
      Number(months)
    );
    setBeResult(res);
  };

  return (
    <div>
      <div className="section-header" style={{ marginBottom: '16px' }}>
        <span className="section-title">Investment vs Banking Analysis</span>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        <button 
          onClick={() => setActiveTab('compare')}
          className={activeTab === 'compare' ? '' : 'btn-outline'}
          style={{ padding: '6px 16px', fontSize: '11px', minWidth: 'auto' }}
        >
          Profit Comparison
        </button>
        <button 
          onClick={() => setActiveTab('breakeven')}
          className={activeTab === 'breakeven' ? '' : 'btn-outline'}
          style={{ padding: '6px 16px', fontSize: '11px', minWidth: 'auto' }}
        >
          Break-even Target
        </button>
      </div>

      {activeTab === 'compare' ? (
        <>
          <p style={{ color: 'var(--muted)', fontSize: '11px', marginBottom: '16px' }}>
            Evaluate efficiency based on your actual silver profit returns.
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <div className="input-group" style={{ flex: 1 }}>
              <label>Capital (VND)</label>
              <input type="number" value={capital} onChange={(e) => setCapital(e.target.value)} />
            </div>
            <div className="input-group" style={{ flex: 1 }}>
              <label>Silver Profit (VND)</label>
              <input type="number" value={silverProfit} onChange={(e) => setSilverProfit(e.target.value)} />
            </div>
          </div>
        </>
      ) : (
        <>
          <p style={{ color: 'var(--muted)', fontSize: '11px', marginBottom: '16px' }}>
            Calculate the target sell price needed to out-perform a bank savings account.
          </p>
          <div className="input-group">
            <label>Buy Price (VND/chi)</label>
            <input 
              type="number" 
              value={purchasePrice} 
              onChange={(e) => setPurchasePrice(e.target.value)} 
            />
          </div>
        </>
      )}

      <div style={{ display: 'flex', gap: '16px' }}>
        <div className="input-group" style={{ flex: 1 }}>
          <label>Bank Term Rate (% / Year)</label>
          <input type="number" value={bankRateAnnual} onChange={(e) => setBankRateAnnual(e.target.value)} step="0.1" />
        </div>
        <div className="input-group" style={{ flex: 1 }}>
          <label>Savings Period (Months)</label>
          <input type="number" value={months} onChange={(e) => setMonths(e.target.value)} />
        </div>
      </div>

      <button 
        onClick={activeTab === 'compare' ? handleCompare : handleCalculateBE} 
        style={{ marginTop: '16px' }}
      >
        {activeTab === 'compare' ? 'Run Analysis' : 'Calculate Break-even'}
      </button>

      {activeTab === 'compare' && result && (
        <div className="result-box">
          <h3 style={{ marginBottom: '16px' }}>Results ({months} months):</h3>
          <div className="info-row" style={{ paddingTop: 0 }}>
            <span className="info-key">Silver Return</span>
            <span className="info-val" style={{ color: 'var(--accent-light)' }}>{result.silverProfit.toLocaleString('en-US')} VND</span>
          </div>
          <div className="info-row">
            <span className="info-key">Bank Savings Return</span>
            <span className="info-val">{Math.round(result.bankProfit).toLocaleString('en-US')} VND</span>
          </div>
          <div className="info-row" style={{ borderBottom: 'none', color: result.silverProfit > result.bankProfit ? 'var(--accent)' : 'var(--text)' }}>
            <span className="info-key" style={{ color: 'inherit' }}>Conclusion:</span>
            <span style={{ fontWeight: 500 }}>{result.conclusion}</span>
          </div>
        </div>
      )}

      {activeTab === 'breakeven' && beResult && (
        <div className="result-box">
          <h3 style={{ marginBottom: '16px' }}>Target Sell Price ({months} months):</h3>
          <div className="info-row" style={{ paddingTop: 0 }}>
            <span className="info-key">Corresponding Bank ROI</span>
            <span className="info-val" style={{ color: 'var(--up)' }}>+{beResult.targetReturnPercent}%</span>
          </div>
          <div className="info-row">
            <span className="info-key">Required Minimum Target</span>
            <span className="info-val" style={{ color: 'var(--accent-light)', fontSize: '18px' }}>
              {beResult.breakEvenPrice.toLocaleString('en-US')} VND/chi
            </span>
          </div>
          <p style={{ marginTop: '12px', fontSize: '11px', color: 'var(--muted)', fontStyle: 'italic' }}>
            *To outperform a savings account, ensure your exit price exceeds this calculated benchmark.
          </p>
        </div>
      )}
    </div>
  );
}
