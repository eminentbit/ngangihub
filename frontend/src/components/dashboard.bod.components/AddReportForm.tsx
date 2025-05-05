import React, { useState } from 'react';

interface AddReportFormProps {
  isDarkMode: boolean;
}

const AddReportForm: React.FC<AddReportFormProps> = ({ isDarkMode }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Financial');
  const [status, setStatus] = useState('Pending');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [metrics, setMetrics] = useState({ revenue: '', expenses: '', profit: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New Report:', { title, type, status, summary, content, metrics });
    setTitle('');
    setType('Financial');
    setStatus('Pending');
    setSummary('');
    setContent('');
    setMetrics({ revenue: '', expenses: '', profit: '' });
  };

  const isMobile = window.innerWidth < 768;

  return (
    <div style={{
      backgroundColor: isDarkMode ? '#4b5563' : 'white',
      padding: '16px',
      borderRadius: '4px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      width: isMobile ? '100%' : '300px',
      margin: isMobile ? '0 auto' : undefined
    }}>
      <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: isDarkMode ? 'white' : 'black' }}>Add Report</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input
          type="text"
          placeholder="Report Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid',
            borderColor: isDarkMode ? '#6b7280' : '#d1d5db',
            backgroundColor: isDarkMode ? '#374151' : 'white',
            color: isDarkMode ? 'white' : 'black',
            fontSize: isMobile ? '14px' : '16px'
          }}
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid',
            borderColor: isDarkMode ? '#6b7280' : '#d1d5db',
            backgroundColor: isDarkMode ? '#374151' : 'white',
            color: isDarkMode ? 'white' : 'black',
            fontSize: isMobile ? '14px' : '16px'
          }}
        >
          {['Financial', 'Operational', 'Strategic'].map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid',
            borderColor: isDarkMode ? '#6b7280' : '#d1d5db',
            backgroundColor: isDarkMode ? '#374151' : 'white',
            color: isDarkMode ? 'white' : 'black',
            fontSize: isMobile ? '14px' : '16px'
          }}
        >
          {['Pending', 'Approved', 'Archived'].map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid',
            borderColor: isDarkMode ? '#6b7280' : '#d1d5db',
            backgroundColor: isDarkMode ? '#374151' : 'white',
            color: isDarkMode ? 'white' : 'black',
            fontSize: isMobile ? '14px' : '16px'
          }}
        />
        <textarea
          placeholder="Report Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid',
            borderColor: isDarkMode ? '#6b7280' : '#d1d5db',
            backgroundColor: isDarkMode ? '#374151' : 'white',
            color: isDarkMode ? 'white' : 'black',
            minHeight: '80px',
            resize: 'vertical',
            fontSize: isMobile ? '14px' : '16px'
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <input
            type="text"
            placeholder="Revenue (e.g., $10M)"
            value={metrics.revenue}
            onChange={(e) => setMetrics({ ...metrics, revenue: e.target.value })}
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid',
              borderColor: isDarkMode ? '#6b7280' : '#d1d5db',
              backgroundColor: isDarkMode ? '#374151' : 'white',
              color: isDarkMode ? 'white' : 'black',
              fontSize: isMobile ? '14px' : '16px'
            }}
          />
          <input
            type="text"
            placeholder="Expenses (e.g., $7M)"
            value={metrics.expenses}
            onChange={(e) => setMetrics({ ...metrics, expenses: e.target.value })}
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid',
              borderColor: isDarkMode ? '#6b7280' : '#d1d5db',
              backgroundColor: isDarkMode ? '#374151' : 'white',
              color: isDarkMode ? 'white' : 'black',
              fontSize: isMobile ? '14px' : '16px'
            }}
          />
          <input
            type="text"
            placeholder="Profit (e.g., $3M)"
            value={metrics.profit}
            onChange={(e) => setMetrics({ ...metrics, profit: e.target.value })}
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid',
              borderColor: isDarkMode ? '#6b7280' : '#d1d5db',
              backgroundColor: isDarkMode ? '#374151' : 'white',
              color: isDarkMode ? 'white' : 'black',
              fontSize: isMobile ? '14px' : '16px'
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: '#9333ea',
            color: 'white',
            padding: '8px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            fontSize: isMobile ? '14px' : '16px'
          }}
        >
          Add Report
        </button>
      </form>
    </div>
  );
};

export default AddReportForm;