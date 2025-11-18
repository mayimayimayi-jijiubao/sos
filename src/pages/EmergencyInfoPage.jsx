import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AV from "leancloud-storage";
import "../styles/form.css";

const EmergencyInfoPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const [info, setInfo] = useState(null);

  useEffect(() => {
    if (!AV._initialized) {
      AV.init({
        appId: "Ivzq5oxAhWX2BqNvdFKQbBjl-gzGzoHsz",
        appKey: "ESfT6VmHoUAzyc8Ay0ebZbuC",
        serverURL: "https://ivzq5oxa.lc-cn-n1-shared.com",
      });
      AV._initialized = true;
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

    const query = new AV.Query("UserInfo");
    query.get(userId)
      .then((data) => {
        setInfo({
          name: data.get("name"),
          phone: data.get("phone"),
          emergencyName: data.get("emergencyName"),
          emergencyPhone: data.get("emergencyPhone"),
        });
      })
      .catch(() => setInfo(null));
  }, [userId]);

  if (!info) {
    return (
      <div style={{ textAlign: "center", marginTop: 80, fontSize: 16 }}>
        暂无急救信息
      </div>
    );
  }

  return (
    <div className="container fade-in" style={{ paddingBottom: 30 }}>


<h2 className="emergency-title">我的急救信息</h2>

      <div className="infoCard" style={{ lineHeight: "1.8em", fontSize: "16px" }}>
        <p><strong>姓名：</strong>{info.name}</p>

        {/* 手机号改为纯文本 */}
        <p><strong>手机号码：</strong>{info.phone}</p>

        <p><strong>紧急联系人：</strong>{info.emergencyName}</p>

        {/* 紧急联系人电话仍支持拨号 */}
        <p><strong>紧急联系人电话：</strong>
          <a href={`tel:${info.emergencyPhone}`} style={{ color: "#007bff" }}>
            {info.emergencyPhone}
          </a>
        </p>
      </div>

      <button
        className="enabled"
        style={{ maxWidth: 300, width: "90%", marginTop: 20 }}
        onClick={() => navigate("/")}
      >
        创建新的急救信息卡
      </button>
    </div>
  );
};

export default EmergencyInfoPage;
