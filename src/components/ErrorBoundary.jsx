import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    handleReset = () => {
        // Clear potentially corrupted data and reload
        if (window.confirm('앱을 초기화하고 다시 시도하시겠습니까? (저장된 카드 데이터는 유지됩니다)')) {
            localStorage.removeItem('appLanguage');
            localStorage.removeItem('partnerId');
            // partnerId는 유지하고 싶을 수 있지만, 초기화가 목적이므로 일단 제거하거나 검증 로직 추가 가능
            window.location.reload();
        }
    };

    handleHardReset = () => {
        if (window.confirm('모든 데이터를 초기화하시겠습니까? 수집한 모든 카드가 사라집니다.')) {
            localStorage.clear();
            window.location.reload();
        }
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-pokemon-light flex items-center justify-center p-6">
                    <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 border-4 border-pokemon-red text-center">
                        <div className="text-6xl mb-4">😵</div>
                        <h1 className="text-2xl font-black text-pokemon-dark mb-4">앗! 오류가 발생했어요</h1>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            앱을 불러오는 중에 문제가 발생했습니다. 브라우저 캐시나 설정 문제일 수 있습니다.
                        </p>
                        <div className="space-y-3">
                            <button
                                onClick={() => window.location.reload()}
                                className="w-full py-3 bg-pokemon-blue text-white rounded-xl font-bold hover:bg-blue-600 transition-colors"
                            >
                                다시 시도하기
                            </button>
                            <button
                                onClick={this.handleReset}
                                className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                            >
                                환경 설정 초기화
                            </button>
                            <button
                                onClick={this.handleHardReset}
                                className="w-full py-2 text-xs text-red-400 hover:text-red-600 transition-colors"
                            >
                                데이터 전체 초기화 (주의!)
                            </button>
                        </div>
                        {process.env.NODE_ENV === 'development' && (
                            <div className="mt-6 p-3 bg-red-50 rounded-lg text-left overflow-auto max-h-40">
                                <code className="text-xs text-red-500">{this.state.error?.toString()}</code>
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
