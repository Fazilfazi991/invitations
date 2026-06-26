import QRCode from "qrcode";

export async function createQrCodeSvg(publicUrl: string) {
  try {
    return await QRCode.toString(publicUrl, {
      type: "svg",
      errorCorrectionLevel: "M",
      margin: 2,
      width: 512,
      color: {
        dark: "#6C1785",
        light: "#FFFFFF",
      },
    });
  } catch (error) {
    console.warn("[occazn qr fallback] Could not generate QR SVG.", error);
    return "";
  }
}
