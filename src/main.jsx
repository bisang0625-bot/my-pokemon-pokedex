import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import './index.css'
import { runImageCompressionMigration } from './utils/pokedexUtils'

// 초기화 전 localStorage 데이터 검증 (데이터 오염 방지)
try {
  const pokedexData = localStorage.getItem('pokedexCards');
  if (pokedexData && !pokedexData.startsWith('[')) {
    console.warn('Corrupted pokedex data detected, resetting...');
    localStorage.removeItem('pokedexCards');
  }
} catch (e) {
  console.error('LocalStorage validation failed:', e);
}

// 앱 초기화 시 기존 이미지 압축 마이그레이션 실행 (1회성)
runImageCompressionMigration().catch(error => {
  console.error('이미지 압축 마이그레이션 초기화 에러:', error)
})

// Service Worker 등록 (PWA 지원) - Safari 호환성 개선
if ('serviceWorker' in navigator) {
  // Safari에서도 안전하게 작동하도록 개선
  const registerServiceWorker = () => {
    try {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
          // Service Worker 등록 실패해도 앱은 정상 작동해야 함
        });
    } catch (error) {
      console.error('Service Worker registration error:', error);
      // 에러가 발생해도 앱은 계속 작동
    }
  };

  // Safari 호환성을 위해 DOMContentLoaded와 load 모두 처리
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', registerServiceWorker);
  } else {
    // 이미 로드된 경우 즉시 실행
    registerServiceWorker();
  }

  // 추가 안전장치: load 이벤트도 리스닝
  window.addEventListener('load', registerServiceWorker);
}

// React 앱 렌더링 - Service Worker와 독립적으로 실행
const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Root element not found');
  // body에 에러 메시지 표시
  document.body.innerHTML = `
    <div style="padding: 40px; text-align: center; font-family: system-ui; color: #333;">
      <h1 style="color: #ef4444;">앱 로드 오류</h1>
      <p>root 요소를 찾을 수 없습니다.</p>
      <p style="color: #666; font-size: 14px;">페이지를 새로고침해주세요.</p>
    </div>
  `;
} else {
  try {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </React.StrictMode>
    );
  } catch (error) {
    console.error('React rendering error:', error);
    // 에러 발생 시 사용자에게 알림
    rootElement.innerHTML = `
      <div style="padding: 40px; text-align: center; font-family: system-ui; background: #fff; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center;">
        <h1 style="color: #ef4444; margin-bottom: 20px;">앱 로드 오류</h1>
        <p style="color: #333; margin-bottom: 10px;">브라우저를 새로고침해주세요.</p>
        <p style="color: #666; font-size: 12px; margin-top: 10px;">${error.message || '알 수 없는 오류'}</p>
        <button onclick="window.location.reload()" style="margin-top: 20px; padding: 10px 20px; background: #ef4444; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">
          새로고침
        </button>
      </div>
    `;
  }
}



