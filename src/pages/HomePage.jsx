import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      navigate('/register');
    } else {
      navigate(`/emergency?userId=${userId}`);
    }
  }, [navigate]);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <p className="text-gray-500 text-lg">加载中...</p>
    </div>
  );
};

export default HomePage;
