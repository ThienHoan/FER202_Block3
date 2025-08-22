import React from 'react';
import { Toast as BootstrapToast, ToastContainer } from 'react-bootstrap';
import { useToast } from '../context/ToastContext';

const Toast = () => {
  const { toasts, removeToast } = useToast();

  return (
    <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1055 }}>
      {toasts.map((toast) => (
        <BootstrapToast
          key={toast.id}
          onClose={() => removeToast(toast.id)}
          show={true}
          delay={toast.duration}
          autohide
          bg={toast.type}
        >
          <BootstrapToast.Header closeButton>
            <strong className="me-auto">
              {toast.type === 'success' && 'Success!'}
              {toast.type === 'error' && 'Error!'}
              {toast.type === 'warning' && 'Warning!'}
              {toast.type === 'info' && 'Info!'}
            </strong>
          </BootstrapToast.Header>
          <BootstrapToast.Body className={toast.type === 'dark' ? 'text-white' : ''}>
            {toast.message}
          </BootstrapToast.Body>
        </BootstrapToast>
      ))}
    </ToastContainer>
  );
};

export default Toast;
