import { useState } from 'react'
import ProfileForm from './components/ProfileForm'
import './App.css'

function App() {
  // Hàm xử lý khi form được submit
  const handleFormSubmit = async (formData) => {
    console.log('Form data received:', formData);
    
    // Giả lập việc gửi dữ liệu lên server
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Giả lập 90% thành công, 10% thất bại
        if (Math.random() > 0.1) {
          console.log('✅ Submit successful!');
          resolve(formData); // Thành công
        } else {
          console.log('❌ Submit failed!');
          reject(new Error('Server error')); // Thất bại
        }
      }, 1000); // Giả lập delay 1 giây
    });
  };

  return (
    <div className="App">
      <ProfileForm onSubmit={handleFormSubmit} />
    </div>
  )
}

export default App
