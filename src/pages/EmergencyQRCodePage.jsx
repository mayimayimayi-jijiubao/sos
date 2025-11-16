import React, { useState, useRef, useEffect } from "react";
import QRCodeStyling from "qr-code-styling";
import AV from "leancloud-storage"; // 需要先安装 leancloud-storage

const EmergencyQRCodePage = () => {
  // 表单状态
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");

  // 验证状态
  const [valid, setValid] = useState({
    name: false,
    phone: false,
    emergencyName: false,
    emergencyPhone: false,
  });

  // 二维码 ref
  const qrRef = useRef(null);

  // 初始化 LeanCloud
  useEffect(() => {
    AV.init({
      appId: "Ivzq5oxAhWX2BqNvdFKQbBjl-gzGzoHsz",
      appKey: "ESfT6VmHoUAzyc8Ay0ebZbuC",
      serverURL: "https://ivzq5oxa.lc-cn-n1-shared.com",
    });
  }, []);

  // 正则规则
  const namePattern = /^[\u4e00-\u9fa5A-Za-z0-9]{1,10}$/;
  const phonePattern = /^[0-9]{11}$/;
  const emgPhonePattern = /^[0-9\-]{6,12}$/;

  // 验证函数
  const validateAll = () => {
    setValid({
      name: namePattern.test(name.trim()),
      phone: phonePattern.test(phone.trim()),
      emergencyName: namePattern.test(emergencyName.trim()),
      emergencyPhone: emgPhonePattern.test(emergencyPhone.trim()),
    });
  };

  useEffect(() => {
    validateAll();
  }, [name, phone, emergencyName, emergencyPhone]);

  // 提交表单并生成二维码
  const submitForm = async () => {
    try {
      const query = new AV.Query("UserInfo");
      query.equalTo("phone", phone.trim());
      const existing = await query.first();
      let obj = existing ? existing : new (AV.Object.extend("UserInfo"))();
      obj.set("name", name.trim());
      obj.set("phone", phone.trim());
      obj.set("emergencyName", emergencyName.trim());
      obj.set("emergencyPhone", emergencyPhone.trim());
      await obj.save();

      alert("信息保存成功");

      // 生成二维码
      const url = window.location.origin + "/qrcode?phone=" + encodeURIComponent(phone.trim());

      const qrCode = new QRCodeStyling({
        width: 200,
        height: 200,
        data: url,
        image: "/logo.png",
        qrOptions: { errorCorrectionLevel: "Q" },
        imageOptions: { imageSize: 0.4, margin: 0, crossOrigin: "anonymous" },
        dotsOptions: { color: "#000000", type: "square" },
        backgroundOptions: { color: "#ffffff" },
      });

      if (qrRef.current) {
        qrRef.current.innerHTML = "";
        qrCode.append(qrRef.current);
      }
    } catch (err) {
      alert("保存失败：" + err.message);
    }
  };

  // 样式迁移（参考原 index.html）
  const styles = {
    body: {
      fontFamily: '"PingFang SC","Microsoft YaHei",sans-serif',
      background: "#fff",
      display: "flex",
      justifyContent: "center",
      padding: "28px 4%",
      minHeight: "100vh",
    },
    container: { width: "100%", maxWidth: "420px", textAlign: "center" },
    logo: { width: "140px", margin: "0 auto 16px" },
    h2: { fontSize: "22px", marginBottom: "12px", color: "#222" },
    label: { display: "block", fontSize: "14px", color: "#222", textAlign: "left" },
    inputRow: { position: "relative", marginBottom: "14px" },
    input: (isValid) => ({
      width: "100%",
      height: "44px",
      padding: "0 12px",
      fontSize: "16px",
      borderRadius: "8px",
      border: `1px solid ${isValid ? "#1bc41b" : "#ccc"}`,
      background: isValid ? "#fafafa" : "#fff",
      outline: "none",
      transition: ".2s",
    }),
    button: {
      width: "100%",
      height: "48px",
      fontSize: "17px",
      fontWeight: "bold",
      borderRadius: "8px",
      border: "none",
      cursor: valid.name && valid.phone && valid.emergencyName && valid.emergencyPhone ? "pointer" : "not-allowed",
      background: valid.name && valid.phone && valid.emergencyName && valid.emergencyPhone ? "#E60000" : "#ccc",
      color: "#fff",
      transition: ".2s",
    },
    qrArea: { marginTop: "24px" },
    errMsg: { color: "red", fontSize: "12px", marginTop: "3px", textAlign: "left" },
    okTag: { color: "green", fontSize: "14px", position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)" },
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <img style={styles.logo} src="/logo.png" alt="logo" />
        <h2 style={styles.h2}>创建我的急救信息卡</h2>

        {/* 姓名 */}
        <label style={styles.label}>姓名 *</label>
        <div style={styles.inputRow}>
          <input
            value={name}
            placeholder="仅支持汉字、字母和数字"
            onChange={(e) => setName(e.target.value)}
            style={styles.input(valid.name)}
          />
          {valid.name && <span style={styles.okTag}>OK</span>}
        </div>
        {!valid.name && name.length > 0 && <div style={styles.errMsg}>格式不正确</div>}

        {/* 手机 */}
        <label style={styles.label}>手机号 *</label>
        <div style={styles.inputRow}>
          <input
            type="tel"
            value={phone}
            placeholder="仅支持中国手机号"
            onChange={(e) => setPhone(e.target.value)}
            style={styles.input(valid.phone)}
          />
          {valid.phone && <span style={styles.okTag}>OK</span>}
        </div>
        {!valid.phone && phone.length > 0 && <div style={styles.errMsg}>必须为11位数字</div>}

        {/* 紧急联系人 */}
        <label style={styles.label}>紧急联系人 *</label>
        <div style={styles.inputRow}>
          <input
            value={emergencyName}
            placeholder="仅支持汉字、字母和数字"
            onChange={(e) => setEmergencyName(e.target.value)}
            style={styles.input(valid.emergencyName)}
          />
          {valid.emergencyName && <span style={styles.okTag}>OK</span>}
        </div>
        {!valid.emergencyName && emergencyName.length > 0 && <div style={styles.errMsg}>格式不正确</div>}

        {/* 联系人电话 */}
        <label style={styles.label}>紧急联系人电话 *</label>
        <div style={styles.inputRow}>
          <input
            type="tel"
            value={emergencyPhone}
            placeholder="支持手机和固定电话"
            onChange={(e) => setEmergencyPhone(e.target.value)}
            style={styles.input(valid.emergencyPhone)}
          />
          {valid.emergencyPhone && <span style={styles.okTag}>OK</span>}
        </div>
        {!valid.emergencyPhone && emergencyPhone.length > 0 && <div style={styles.errMsg}>仅支持数字和 -</div>}

        {/* 提交按钮 */}
        <button style={styles.button} disabled={!(valid.name && valid.phone && valid.emergencyName && valid.emergencyPhone)} onClick={submitForm}>
          生成我的急救信息卡
        </button>

        {/* 二维码显示 */}
        <div ref={qrRef} style={styles.qrArea}></div>
      </div>
    </div>
  );
};

export default EmergencyQRCodePage;
