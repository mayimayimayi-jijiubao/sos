import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AV from 'leancloud-storage';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [loading, setLoading] = useState(false);

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

  const handleRegister = async () => {
    if (!name || !phone || !emergencyContact || !emergencyPhone) {
      alert('请填写完整信息');
      return;
    }

    setLoading(true);
    try {
      const EmergencyInfo = AV.Object.extend('EmergencyInfo');
      const form = new EmergencyInfo();
      form.set('name', name);
      form.set('phone', phone);
      form.set('emergencyContact', emergencyContact);
      form.set('emergencyPhone', emergencyPhone);

      const savedObj = await form.save();
      const userId = savedObj.id;

      localStorage.setItem('userId', userId);
      navigate(`/qrcode?userId=${userId}`);
    } catch (error) {
      console.error(error);
      alert('注册失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '90%', maxWidth: '400px', padding: '20px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <h1 style={{ textAlign: 'center', fontSize: '24px', marginBottom: '16px' }}>注册急救信息</h1>
        <input className="input-field" placeholder="姓名" value={name} onChange={e => setName(e.target.value)} />
        <input className="input-field" placeholder="手机号码" value={phone} onChange={e => setPhone(e.target.value)} />
        <input className="input-field" placeholder="紧急联系人" value={emergencyContact} onChange={e => setEmergencyContact(e.target.value)} />
        <input className="input-field" placeholder="紧急联系人电话" value={emergencyPhone} onChange={e => setEmergencyPhone(e.target.value)} />
        <button
          style={{ width: '100%', marginTop: '16px', padding: '10px', borderRadius: '8px', backgroundColor: loading ? '#ccc' : '#007bff', color: '#fff', cursor: loading ? 'not-allowed' : 'pointer' }}
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? '生成中...' : '生成二维码'}
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
