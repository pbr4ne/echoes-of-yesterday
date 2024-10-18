export function useColorUtils() {
  const hexToRgba = (hex: string, alpha: number): string => {
    let c: any;
    if (hex.startsWith("#")) {
      hex = hex.slice(1);
    }

    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }

    c = parseInt(hex, 16);
    const r = (c >> 16) & 255;
    const g = (c >> 8) & 255;
    const b = c & 255;

    return `rgba(${r},${g},${b},${alpha})`;
  };

  return {
    hexToRgba,
  };
}
