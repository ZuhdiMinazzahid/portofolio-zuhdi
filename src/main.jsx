import React, { StrictMode, Component } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Uncaught error in application:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', color: '#fff', backgroundColor: '#0e0e11', fontFamily: 'sans-serif', minHeight: '100vh' }}>
          <h2 style={{ color: '#ffc700', fontSize: '24px', fontWeight: 'bold' }}>Terjadi Kendala Memuat Halaman</h2>
          <pre style={{ backgroundColor: '#1b1b1e', padding: '16px', borderRadius: '12px', marginTop: '16px', color: '#ffb4ab', overflowX: 'auto' }}>
            {this.state.error?.toString()}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{ marginTop: '20px', padding: '10px 24px', borderRadius: '9999px', backgroundColor: '#ffc700', color: '#000', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
          >
            Muat Ulang Halaman
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
