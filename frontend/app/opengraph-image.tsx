import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ alignItems: "flex-end", background: "linear-gradient(135deg, #2C2118 0%, #4A3425 55%, #4A3425 100%)", color: "#FFFFFF", display: "flex", flexDirection: "column", height: "100%", justifyContent: "center", padding: "70px", width: "100%" }}><div style={{ color: "#D9AD28", fontFamily: "Arial, sans-serif", fontSize: 25, fontWeight: 700, letterSpacing: 5, textTransform: "uppercase" }}>Galagadi Tours & Safari</div><div style={{ display: "flex", flexDirection: "column", fontFamily: "Arial, sans-serif", fontSize: 76, lineHeight: 1.05, marginTop: 24 }}><span>Victoria Falls</span><span>with heart.</span></div><div style={{ color: "#F4EFE5", fontFamily: "Arial, sans-serif", fontSize: 28, marginTop: 30 }}>Personal journeys through Zimbabwe and Botswana</div></div>, size);
}
