/**
 * 이미지 압축 유틸리티 함수
 */

/**
 * 이미지를 압축하여 base64 문자열로 반환
 * @param {string} imageSrc - base64 이미지 문자열 (data:image/jpeg;base64,...)
 * @param {number} maxWidth - 최대 너비 (기본값: 800px)
 * @param {number} maxHeight - 최대 높이 (기본값: 800px)
 * @param {number} quality - JPEG 품질 (0.1 ~ 1.0, 기본값: 0.7)
 * @returns {Promise<string>} 압축된 base64 이미지 문자열
 */
export function compressImage(imageSrc, maxWidth = 800, maxHeight = 800, quality = 0.7) {
  return new Promise((resolve, reject) => {
    try {
      const img = new Image()
      
      img.onload = () => {
        // 원본 크기
        const originalWidth = img.width
        const originalHeight = img.height
        
        // 비율 유지하면서 리사이즈
        let width = originalWidth
        let height = originalHeight
        
        if (width > maxWidth) {
          height = (height * maxWidth) / width
          width = maxWidth
        }
        
        if (height > maxHeight) {
          width = (width * maxHeight) / height
          height = maxHeight
        }
        
        // Canvas 생성
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        
        // 이미지 그리기
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)
        
        // JPEG로 변환 (압축)
        const compressedBase64 = canvas.toDataURL('image/jpeg', quality)
        resolve(compressedBase64)
      }
      
      img.onerror = (error) => {
        reject(new Error('이미지 로드 실패: ' + error))
      }
      
      img.src = imageSrc
    } catch (error) {
      reject(error)
    }
  })
}
