/**
 * 저장소 용량 모니터링 유틸리티
 */

// localStorage 최대 용량 (대부분의 브라우저에서 5MB)
const MAX_STORAGE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

/**
 * 현재 localStorage 사용량 계산 (bytes)
 * @returns {number} 사용 중인 바이트 수
 */
export function getStorageUsage() {
    let total = 0;

    try {
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                // 각 항목의 키와 값의 UTF-16 문자열 길이 * 2 (UTF-16은 문자당 2바이트)
                total += (key.length + localStorage.getItem(key).length) * 2;
            }
        }
    } catch (error) {
        console.error('저장소 사용량 계산 오류:', error);
    }

    return total;
}

/**
 * 저장소 사용률 (퍼센트)
 * @returns {number} 0-100 사이의 사용률
 */
export function getStoragePercentage() {
    const usage = getStorageUsage();
    return Math.min(Math.round((usage / MAX_STORAGE_SIZE) * 100), 100);
}

/**
 * 사람이 읽기 쉬운 용량 형식으로 변환
 * @param {number} bytes - 바이트 수
 * @returns {string} "1.5MB" 형식의 문자열
 */
export function formatStorageSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

/**
 * 저장소가 한계에 가까운지 확인
 * @param {number} warningThreshold - 경고 기준 퍼센트 (기본값 80)
 * @returns {{ isNearLimit: boolean, percentage: number, used: string, max: string }}
 */
export function checkStorageStatus(warningThreshold = 80) {
    const usage = getStorageUsage();
    const percentage = getStoragePercentage();

    return {
        isNearLimit: percentage >= warningThreshold,
        isCritical: percentage >= 90,
        percentage,
        used: formatStorageSize(usage),
        max: formatStorageSize(MAX_STORAGE_SIZE)
    };
}

/**
 * 저장소에 여유 공간이 있는지 확인 (스캔 전 체크용)
 * @returns {boolean} 저장 가능하면 true
 */
export function canSaveMore() {
    const percentage = getStoragePercentage();
    return percentage < 95; // 95% 미만이면 저장 가능
}
