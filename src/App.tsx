import { useState } from 'react';
import './App.css';
import Home from './components/Home';
import SilcsViewer from './components/SilcsViewer';

export default function App() {
  const [page, setPage] = useState<'home' | 'viewer'>('home');

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ display: 'flex', gap: 8, padding: 8, background: '#111', alignItems: 'center' }}>
        <button
          onClick={() => setPage('home')}
          aria-current={page === 'home' ? 'page' : undefined}
          style={{
            padding: '8px 12px',
            background: page === 'home' ? '#646cff' : 'transparent',
            color: page === 'home' ? '#fff' : undefined,
            border: page === 'home' ? 'none' : undefined,
            borderRadius: 6,
            fontWeight: page === 'home' ? 600 : 400,
          }}
        >
          Home
        </button>

        <button
          onClick={() => setPage('viewer')}
          aria-current={page === 'viewer' ? 'page' : undefined}
          style={{
            padding: '8px 12px',
            background: page === 'viewer' ? '#646cff' : 'transparent',
            color: page === 'viewer' ? '#fff' : undefined,
            border: page === 'viewer' ? 'none' : undefined,
            borderRadius: 6,
            fontWeight: page === 'viewer' ? 600 : 400,
          }}
        >
          Interactive Viewer
        </button>
      </header>

      <main style={{ flex: 1, minHeight: 0 }}>
        {page === 'home' ? <Home /> : <SilcsViewer />}
      </main>
    </div>
  );
}
