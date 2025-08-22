import { Toast, ToastContainer } from 'react-bootstrap'; // Thành phần Toast của Bootstrap
import PropTypes from 'prop-types'; // Kiểm tra kiểu props

const NotificationToast = ({ show, onClose, message, variant = 'success' }) => { // Toast thông báo tái sử dụng
  return (
    <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}> {/* Góc trên bên phải */}
      <Toast 
        show={show} 
        onClose={onClose} 
        delay={3000} 
        autohide
        bg={variant}
      >
        <Toast.Header>
          <strong className="me-auto">
            {variant === 'success' ? '✅ Success' : '⚠️ Notice'}
          </strong>
        </Toast.Header>
        <Toast.Body className={variant === 'success' ? 'text-white' : 'text-dark'}>
          {message}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

NotificationToast.propTypes = { // Kiểu props cho Toast
  show: PropTypes.bool.isRequired, // Có hiện toast không
  onClose: PropTypes.func.isRequired, // Hàm đóng toast
  message: PropTypes.string.isRequired, // Nội dung hiển thị
  variant: PropTypes.oneOf(['success', 'warning', 'danger', 'info']) // Màu nền
};

export default NotificationToast; // Xuất mặc định Toast
