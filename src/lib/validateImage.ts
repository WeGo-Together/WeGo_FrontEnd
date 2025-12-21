import { IMAGE_CONFIG } from './constants/image';

export const validateImage = (file: File): { valid: boolean; error?: string } => {
  // 1. 파일 크기 검증
  if (file.size > IMAGE_CONFIG.maxSizeBytes) {
    const currentSizeMB = (file.size / (1024 * 1024)).toFixed(0);
    return {
      valid: false,
      error: `이미지 크기가 너무 큽니다. 최대 20MB까지 가능합니다. \n(현재: ${currentSizeMB}MB)`,
    };
  }

  // 2. Content Type 검증
  if (!IMAGE_CONFIG.allowedTypes.includes(file.type)) {
    const currentFileType = file.type.split('/')[1];
    return {
      valid: false,
      error: `${IMAGE_CONFIG.allowedExtensions.join(', ')} 형식만 업로드 가능합니다. \n(현재: ${currentFileType})`,
    };
  }

  // 3. 확장자 검증
  const fileName = file.name.toLowerCase();
  const hasValidExtension = IMAGE_CONFIG.allowedExtensions.some((ext) => fileName.endsWith(ext));

  if (!hasValidExtension) {
    return {
      valid: false,
      error: `파일 확장자가 올바르지 않습니다. \n(${IMAGE_CONFIG.allowedExtensions.join(', ')}만 가능)`,
    };
  }

  return { valid: true };
};
