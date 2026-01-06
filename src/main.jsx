import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

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
if (rootElement) {
  try {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error('React rendering error:', error);
    // 에러 발생 시 사용자에게 알림
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center; font-family: system-ui;">
        <h1>앱 로드 오류</h1>
        <p>브라우저를 새로고침해주세요.</p>
        <p style="color: #666; font-size: 12px;">${error.message}</p>
      </div>
    `;
  }
} else {
  console.error('Root element not found');
}



