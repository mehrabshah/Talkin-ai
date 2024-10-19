import { useCallback } from "react";

const useBlobBase64 = () => {
  const blobToBase64 = useCallback((blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }, []);

  const base64ToBlob = useCallback((base64, type = 'application/octet-stream') => {
    if (!base64) {
        throw new Error('Base64 string is empty');
    }

    const base64Index = base64.indexOf(';base64,');
    if (base64Index !== -1) {
        base64 = base64.substring(base64Index + 8);
    }

    const padding = base64.length % 4;
    if (padding > 0) {
        base64 += '='.repeat(4 - padding);
    }

    const byteCharacters = atob(base64);
    const byteNumbers = new Uint8Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    return new Blob([byteNumbers], { type });
}, []);


  return { blobToBase64, base64ToBlob };
};

export default useBlobBase64;
