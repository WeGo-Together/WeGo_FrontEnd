import { IMAGE_CONFIG } from './constants/image';

export const validateImage = async (file: File): Promise<{ valid: boolean; error?: string }> => {
  // 1. 확장자 검증
  const fileName = file.name.toLowerCase();
  const hasValidExtension = IMAGE_CONFIG.allowedExtensions.some((ext) => fileName.endsWith(ext));

  if (!hasValidExtension) {
    return {
      valid: false,
      error: `파일 확장자가 올바르지 않습니다. \n(${IMAGE_CONFIG.allowedExtensions.join(', ')}만 가능)`,
    };
  }

  // 2. 파일 크기 검증
  if (file.size > IMAGE_CONFIG.maxSizeBytes) {
    const currentSizeMB = (file.size / (1024 * 1024)).toFixed(0);
    return {
      valid: false,
      error: `이미지 크기가 너무 큽니다. 최대 20MB까지 가능합니다. \n현재: ${currentSizeMB}MB`,
    };
  }

  // 3. 파일 사이즈 검증
  const { width, height } = await getImageDimensions(file);
  if (width > 2000 || height > 2000) {
    return {
      valid: false,
      error: `이미지는 2000x2000 이하여야 합니다. \n현재: 너비(${width}), 높이(${height})`,
    };
  }

  return { valid: true };
};

const getImageDimensions = async (file: File): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url); // 메모리 해제
      resolve({
        width: img.width,
        height: img.height,
      });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('이미지 로드 실패'));
    };

    img.src = url;
  });
};
