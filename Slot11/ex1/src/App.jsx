import { useState } from 'react'
import ProfileForm from './components/ProfileForm'
import './App.css'

function App() {
  // Hàm xử lý khi form được submit
  const handleFormSubmit = (formData) => {
    console.log('Form data received:', formData);
    // Bạn có thể xử lý dữ liệu ở đây (gửi lên server, lưu vào database, etc.)
  };

  return (
    <div className="App">
      <ProfileForm onSubmit={handleFormSubmit} />
    </div>
  )
}

export default App
