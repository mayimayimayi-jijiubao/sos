import React, { useRef, useEffect, useState } from "react";
import QRCode from "qrcode";

const QRCodeGenerator = ({ dataUrl }) => {
  const canvasRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  useEffect(() => {
    if (!dataUrl) return;

    const generate = async () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      await QRCode.toCanvas(canvas, dataUrl, {
        width: 300,
        margin: 2,
        errorCorrectionLevel: "H",
        color: { dark: "#000000", light: "#ffffff" },
      });

      const logo = new Image();
      logo.src = "/logo.png";
      logo.onload = () => {
        const size = 60;
        const x = (canvas.width - size) / 2;
        const y = (canvas.height - size) / 2;

        const r = 8;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + size - r, y);
        ctx.quadraticCurveTo(x + size, y, x + size, y + r);
        ctx.lineTo(x + size, y + size - r);
        ctx.quadraticCurveTo(x + size, y + size, x + size - r, y + size);
        ctx.lineTo(x + r, y + size);
        ctx.quadraticCurveTo(x, y + size, x, y + size - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
        ctx.fill();

        ctx.drawImage(logo, x, y, size, size);

        // ⭐ 关键改动：使用 blob 转 URL，让手机能长按保存
        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          setImgSrc(url);
        }, "image/png");
      };
    };

    generate();
  }, [dataUrl]);

  return (
    <div style={{ textAlign: "center" }}>
      {imgSrc ? (
        <img
          src={imgSrc}
          alt="qr"
          style={{ width: 260 }}
        />
      ) : (
        <canvas
          ref={canvasRef}
          width={300}
          height={300}
          style={{ position: "absolute", left: "-9999px" }}
        />
      )}
    </div>
  );
};

export default QRCodeGenerator;
