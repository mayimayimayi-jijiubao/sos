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

      // 先生成二维码
      await QRCode.toCanvas(canvas, dataUrl, {
        width: 300,
        margin: 2,
        errorCorrectionLevel: "H",
        color: { dark: "#000000", light: "#ffffff" },
      });

      // 加载 logo
      const logo = new Image();
      logo.src = "/logo.png"; // 必须是同域资源
      logo.onload = () => {
        const size = 60;
        const x = (canvas.width - size) / 2;
        const y = (canvas.height - size) / 2;

        // 画白色方块背景
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

        // 绘制 logo
        ctx.drawImage(logo, x, y, size, size);

        // 转成 PNG
        setImgSrc(canvas.toDataURL("image/png"));
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
