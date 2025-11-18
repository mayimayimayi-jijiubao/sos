import React, { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../styles/form.css"; // 保持按钮样式一致

const QRCodeResultPage = () => {
  const qrRef = useRef(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const [qrReady, setQrReady] = useState(false);

  useEffect(() => {
    if (!userId || !qrRef.current) return;

    const size = Math.round(window.innerWidth * 0.8); // 根据屏幕宽度自适应

    const qr = new QRCodeStyling({
      width: size,
      height: size,
      data: `${window.location.origin}/emergency?userId=${userId}`,
      image: "/logo.png",
      qrOptions: { errorCorrectionLevel: "Q" },
      imageOptions: { imageSize: 0.33, margin: 0 }
    });

    qrRef.current.innerHTML = "";
    qr.append(qrRef.current);
    setQrReady(true);
  }, [userId]);

  return (
    <div style={{ textAlign: "center", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      
      {/* 按钮 - 显示我的急救信息 */}
      <button
        className="enabled"
        style={{ maxWidth: 300, width: "90%", marginBottom: 12 }}
        onClick={() => navigate(`/emergency?userId=${userId}`)}
      >
        显示我的急救信息
      </button>

      {/* 文字提示 */}
      <p style={{ fontSize: 14, color: "#666", marginBottom: 12 }}>
        长按二维码，保存到手机中
      </p>

      {/* 二维码容器 */}
      <div
        ref={qrRef}
        style={{
          marginTop: 10,
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      />
    </div>
  );
};

export default QRCodeResultPage;
