import { ImageResponse } from "next/og";

export const size = { width: 48, height: 48 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(<div style={{ alignItems: "center", background: "#2C2118", color: "#D9AD28", display: "flex", fontFamily: "Arial, sans-serif", fontSize: 32, height: "100%", justifyContent: "center", width: "100%" }}>G</div>, size);
}
