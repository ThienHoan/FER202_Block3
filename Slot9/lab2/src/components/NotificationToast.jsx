import { Toast, ToastContainer } from 'react-bootstrap';
import PropTypes from 'prop-types';

const NotificationToast = ({ show, onClose, message, variant = 'success' }) => {
  return (
    <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
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

NotificationToast.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['success', 'warning', 'danger', 'info'])
};

export default NotificationToast;
