export const APP_COLOR = {
  ORANGE: "#f4511e",
  GREY: "#d0d0d0",
  BLUE_BTN: "#024EA1",
  BLACK: "#000000",
  WHITE: "#FFFFFF",
  RED: "#DC143C",
  BLUE_NEW: "#007AFF",
  CULTURED: "#f5f7fa",
};

export const hexToRGBA = (hex: string, opacity: number) => {
  let r = 0,
    g = 0,
    b = 0;

  // Xử lý màu có dạng #RRGGBB
  if (hex.length === 7) {
    r = parseInt(hex.substring(1, 3), 16);
    g = parseInt(hex.substring(3, 5), 16);
    b = parseInt(hex.substring(5, 7), 16);
  }

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
