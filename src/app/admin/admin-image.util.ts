const MAX_BYTES = 1_800_000;
const MAX_EDGE = 1920;

export function readImageAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/') && !file.name.toLowerCase().endsWith('.svg')) {
      reject(new Error('Choose an image file (PNG, JPG, WebP, or SVG).'));
      return;
    }
    if (file.size > MAX_BYTES && file.type === 'image/svg+xml') {
      reject(new Error('That SVG is too large. Keep uploads under about 1.8 MB.'));
      return;
    }

    if (file.type === 'image/svg+xml' || file.name.toLowerCase().endsWith('.svg')) {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ''));
      reader.onerror = () => reject(new Error('Could not read that file.'));
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const raw = String(reader.result || '');
      if (file.size <= 700_000) {
        resolve(raw);
        return;
      }
      compressDataUrl(raw)
        .then(resolve)
        .catch(() => resolve(raw));
    };
    reader.onerror = () => reject(new Error('Could not read that file.'));
    reader.readAsDataURL(file);
  });
}

function compressDataUrl(dataUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, MAX_EDGE / Math.max(img.width, img.height));
      const width = Math.max(1, Math.round(img.width * scale));
      const height = Math.max(1, Math.round(img.height * scale));
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas unavailable'));
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', 0.82));
    };
    img.onerror = () => reject(new Error('Could not process image'));
    img.src = dataUrl;
  });
}

/** Logo upload: keep brand colors, turn flat black/near-black plates transparent. */
export async function readLogoAsDataUrl(file: File): Promise<string> {
  const raw = await readImageAsDataUrl(file);
  if (file.type === 'image/svg+xml' || file.name.toLowerCase().endsWith('.svg')) {
    return raw;
  }
  try {
    return await knockOutFlatDarkBackground(raw);
  } catch {
    return raw;
  }
}

function knockOutFlatDarkBackground(dataUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) {
        resolve(dataUrl);
        return;
      }
      ctx.drawImage(img, 0, 0);
      const image = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = image.data;
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const lum = (r + g + b) / 3;
        const sat = max === 0 ? 0 : (max - min) / max;
        // Flat black/charcoal plate → transparent; keep saturated brand colors
        if (lum < 38 && sat < 0.22) {
          data[i + 3] = 0;
        }
      }
      ctx.putImageData(image, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = () => reject(new Error('Could not process logo'));
    img.src = dataUrl;
  });
}
