import React, { useRef, useEffect } from "react";
import QRCodeStyling from "qr-code-styling";

const QRCodeGenerator = ({ dataUrl }) => {
  const qrRef = useRef(null);

  const qrCode = useRef(
    new QRCodeStyling({
      width: 300,
      height: 300,
      data: dataUrl,
      image: "/logo.png",
      qrOptions: { errorCorrectionLevel: "Q" },
      imageOptions: { imageSize: 0.2, margin: 0, crossOrigin: "anonymous" },
      dotsOptions: { color: "#000000", type: "square" },
      backgroundOptions: { color: "#ffffff" },
    })
  ).current;

  useEffect(() => {
    if (qrRef.current) qrCode.append(qrRef.current);
    qrCode.update({ data: dataUrl });
  }, [dataUrl]);

  const handleDownload = () => {
    qrCode.download({ name: "jiujiubao_qr", extension: "png" });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div ref={qrRef}></div>
      <button onClick={handleDownload} style={{ marginTop: "10px" }}>
        下载二维码
      </button>
    </div>
  );
};

export default QRCodeGenerator;
