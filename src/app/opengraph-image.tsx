import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Flört Mesajı Asistanı";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #070b20 0%, #11153a 58%, #170723 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 120,
            height: 120,
            borderRadius: 28,
            border: "3px solid rgba(236, 72, 153, 0.6)",
            background: "rgba(255, 255, 255, 0.05)",
            fontSize: 60,
            color: "#f9a8d4",
            marginBottom: 32,
          }}
        >
          ♡
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 56,
            fontWeight: 900,
            color: "white",
            textAlign: "center",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            maxWidth: 900,
          }}
        >
          Flört Mesajı Asistanı
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            fontWeight: 500,
            color: "#c4b5fd",
            marginTop: 20,
            textAlign: "center",
          }}
        >
          AI destekli mesaj önerileri · Ücretsiz · Hesap gerekmez
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
