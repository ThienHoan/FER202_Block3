import { StrictMode } from 'react' // Chế độ nghiêm ngặt giúp phát hiện vấn đề
import { createRoot } from 'react-dom/client' // API tạo root React 18
import 'bootstrap/dist/css/bootstrap.min.css' // CSS của Bootstrap
import './index.css' // CSS toàn cục của app
import App from './App.jsx' // Component gốc

createRoot(document.getElementById('root')).render( // Mount ứng dụng vào #root
  <StrictMode>
    <App />
  </StrictMode>,
)
