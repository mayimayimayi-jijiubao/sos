import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AV from "leancloud-storage";
import "../styles/form.css";
import "../styles/animate.css"; // 页面淡入动画

const EmergencyFormPage = () => {
  const navigate = useNavigate();

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

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [loading, setLoading] = useState(false);

  // 正则规则
  const namePattern = /^[\u4e00-\u9fa5A-Za-z0-9]{1,10}$/;
  const phonePattern = /^[0-9]{11}$/;
  const emgPhonePattern = /^[0-9\-]{11,13}$/;

  // 表单校验
  const valid =
    namePattern.test(name) &&
    phonePattern.test(phone) &&
    namePattern.test(emergencyName) &&
    emgPhonePattern.test(emergencyPhone);

  const handleSubmit = async () => {
    if (!valid) return;
    setLoading(true);

    try {
      // 手机号唯一性校验
      const query = new AV.Query("UserInfo");
      query.equalTo("phone", phone);
      const existing = await query.first();

      if (existing) {
        setLoading(false);
        alert("本手机号已经注册，请返回重新填写手机号码");
        return;
      }

      const userObj = new AV.Object("UserInfo");
      const acl = new AV.ACL();
      acl.setPublicReadAccess(true);
      acl.setPublicWriteAccess(true);
      userObj.setACL(acl);

      userObj.set("name", name);
      userObj.set("phone", phone);
      userObj.set("emergencyName", emergencyName);
      userObj.set("emergencyPhone", emergencyPhone);

      // 保存成功后取 objectId 作为 userId
      const savedObj = await userObj.save();
      const userId = savedObj.id;

      setLoading(false);
      navigate(`/qrcode?userId=${encodeURIComponent(userId)}`);
    } catch (err) {
      setLoading(false);
      alert("保存失败：" + err.message);
    }
  };

  return (
    <div className="container fade-in">
      <img className="logo" src="/logo.png" alt="logo" />
      <h2>创建我的急救信息卡</h2>

      {/* 姓名 */}
      <label>
        姓名 <span className="required">*</span>
      </label>
      <input
        type="text"
        value={name}
        placeholder="请输入常用昵称或者实名，便于识别您的身份"
        onChange={(e) => {
          const val = e.target.value.slice(0, 10);
          setName(val);
        }}
      />
      {!name && <p className="hint">请用常用昵称或者实名，仅支持汉字、字母和数字</p>}
      {name && !namePattern.test(name) && <p className="err">格式不正确，仅支持汉字、字母和数字</p>}

      {/* 手机号 */}
      <label>
        手机号 <span className="required">*</span>
      </label>
      <input
        type="tel"
        value={phone}
        placeholder="请输入常用手机号码"
        onChange={(e) => {
          const val = e.target.value.replace(/\D/g, "").slice(0, 11);
          setPhone(val);
        }}
      />
      {!phone && <p className="hint">手机号码是用户唯一ID</p>}
      {phone && !phonePattern.test(phone) && <p className="err">格式不正确，现在仅支持中国手机号</p>}

      {/* 紧急联系人 */}
      <label>
        紧急联系人 <span className="required">*</span>
      </label>
      <input
        type="text"
        value={emergencyName}
        placeholder="请输入常用昵称或者实名，便于准确的联系到您"
        onChange={(e) => {
          const val = e.target.value.slice(0, 10);
          setEmergencyName(val);
        }}
      />
      {!emergencyName && (
        <p className="hint">请用常用昵称或者实名，仅支持汉字、字母和数字</p>
      )}
      {emergencyName && !namePattern.test(emergencyName) && (
        <p className="err">格式不正确，仅支持汉字、字母和数字</p>
      )}

      {/* 紧急联系人电话 */}
      <label>
        紧急联系人电话 <span className="required">*</span>
      </label>
      <input
        type="text"
        value={emergencyPhone}
        placeholder="请输入紧急联系人常用电话，支持手机和固定电话"
        onChange={(e) => {
          const val = e.target.value.slice(0, 13);
          setEmergencyPhone(val);
        }}
      />
      {!emergencyPhone && (
        <p className="hint">支持手机号码和固定电话，固定电话必须加区号和“-”</p>
      )}
      {emergencyPhone && !emgPhonePattern.test(emergencyPhone) && (
        <p className="err">
          格式不正确，仅支持中国手机号码和固定电话，固定电话必须加区号和“-”
        </p>
      )}

      {/* 提交按钮 */}
      <div style={{ textAlign: "center", marginTop: 16 }}>
        <button className={valid ? "enabled" : ""} disabled={!valid || loading} onClick={handleSubmit}>
          {loading ? "生成中..." : "生成我的急救信息卡"}
        </button>
      </div>
    </div>
  );
};

export default EmergencyFormPage;
