import React, { useRef, useEffect, useState } from "react";
import QRCode from "qrcode";

const QRCodeGenerator = ({ dataUrl }) => {
const canvasRef = useRef(null);
const [imgSrc, setImgSrc] = useState(null);

useEffect(() => {
if (!dataUrl) return;

```
const generateQRCode = async () => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  // 生成二维码到 canvas
  await QRCode.toCanvas(canvas, dataUrl, {
    width: 300,
    margin: 2,
    color: { dark: "#000000", light: "#ffffff" },
  });

  const ctx = canvas.getContext("2d");

  // 加载 Logo
  const logo = new Image();
  logo.src = "/logo.png";
  logo.crossOrigin = "anonymous"; // 确保部署环境能加载
  logo.onload = () => {
    const logoSize = 60; // Logo 大小，可调整
    const x = (canvas.width - logoSize) / 2;
    const y = (canvas.height - logoSize) / 2;

    // 白底圆角方块背景
    const radius = 8;
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + logoSize - radius, y);
    ctx.quadraticCurveTo(x + logoSize, y, x + logoSize, y + radius);
    ctx.lineTo(x + logoSize, y + logoSize - radius);
    ctx.quadraticCurveTo(x + logoSize, y + logoSize, x + logoSize - radius, y + logoSize);
    ctx.lineTo(x + radius, y + logoSize);
    ctx.quadraticCurveTo(x, y + logoSize, x, y + logoSize - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();

    ctx.drawImage(logo, x, y, logoSize, logoSize);

    // 将 canvas 转为图片显示
    setImgSrc(canvas.toDataURL("image/png"));
  };
};

generateQRCode();
```

}, [dataUrl]);

const handleDownload = () => {
if (!imgSrc) return;
const link = document.createElement("a");
link.href = imgSrc;
link.download = "jiujiubao_qr.png";
link.click();
};

return (
<div style={{ textAlign: "center" }}>
{imgSrc ? (
<>
<img src={imgSrc} alt="二维码" style={{ width: 260 }} />
<div style={{ marginTop: 8 }}> <button onClick={handleDownload}>下载二维码</button> </div>
</>
) : (
<canvas ref={canvasRef} style={{ display: "none" }} />
)} </div>
);
};

export default QRCodeGenerator;
