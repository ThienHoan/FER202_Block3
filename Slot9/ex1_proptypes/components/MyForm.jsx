import React, { useState, useReducer } from "react";
import { Button, Form, Container, Alert } from "react-bootstrap";
import PropTypes from "prop-types";

// Reducer để quản lý trạng thái form
const initialState = {
  name: "",
  age: "",
  email: "",
  phoneNumber: "",
  sex: "",
  agree: false,
  isSubmitted: false,
  showSuccess: false,
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_CHECKBOX":
      return { ...state, [action.field]: action.checked };
    case "SUBMIT":
      return { ...state, isSubmitted: true, showSuccess: true };
    case "RESET_SUCCESS":
      return { ...state, showSuccess: false };
    default:
      return state;
  }
};
// Component Form
const MyForm = ({ title, onSubmit }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false); // Biến để kiểm soát việc hiển thị alert

  // Hàm xử lý thay đổi giá trị input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      dispatch({ type: "SET_CHECKBOX", field: name, checked });
    } else {
      dispatch({ type: "SET_FIELD", field: name, value });
    }
  };

  // Hàm kiểm tra lỗi trước khi submit
  const handleValidation = () => {
    const newErrors = {};
    
    // Validate tên: không được để trống, chứa 3-50 ký tự
    if (!state.name) {
      newErrors.name = "Tên không được để trống!";
    } else if (state.name.length < 3 || state.name.length > 50) {
      newErrors.name = "Tên phải chứa từ 3-50 ký tự!";
    }
    
    // Validate tuổi: không được để trống, từ 18-100 tuổi
    if (!state.age) {
      newErrors.age = "Tuổi không được để trống!";
    } else {
      const ageNum = parseInt(state.age, 10);
      if (isNaN(ageNum) || ageNum < 18 || ageNum > 100) {
        newErrors.age = "Tuổi phải từ 18-100 tuổi!";
      }
    }
    
    // Validate email: không được để trống, đúng định dạng
    if (!state.email) {
      newErrors.email = "Email không được để trống!";
    } else {
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      if (!emailRegex.test(state.email)) {
        newErrors.email = "Email không đúng định dạng!";
      }
    }
    
    // Validate số điện thoại: từ 10-15 chữ số
    if (!state.phoneNumber) {
      newErrors.phoneNumber = "Số điện thoại không được để trống!";
    } else {
      const phoneRegex = /^\d{10,15}$/;
      if (!phoneRegex.test(state.phoneNumber)) {
        newErrors.phoneNumber = "Số điện thoại phải từ 10-15 chữ số!";
      }
    }
    
    // Validate giới tính
    if (!state.sex) newErrors.sex = "Giới tính không được để trống!";
    
    // Validate đồng ý điều khoản
    if (!state.agree) newErrors.agree = "Bạn phải đồng ý với các điều khoản!";

    // Nếu có lỗi, hiển thị alert
    if (Object.keys(newErrors).length > 0) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      dispatch({ type: "SUBMIT" });
      onSubmit(state);
      
      // Tự động ẩn thông báo thành công sau 3 giây
      setTimeout(() => {
        dispatch({ type: "RESET_SUCCESS" });
      }, 3000);
    }
  };

  return (
    <Container>
      <h3>{title}</h3>

      {/* Hiển thị Alert nếu có lỗi */}
      {showAlert && (
        <Alert variant="danger">
          <strong>Lỗi:</strong> Vui lòng điền đầy đủ thông tin.
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Tên</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={state.name}
            onChange={handleChange}
            isInvalid={!!errors.name}
            placeholder="Nhập tên (3-50 ký tự)"
            maxLength="50"
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formAge">
          <Form.Label>Tuổi</Form.Label>
          <Form.Control
            type="number"
            name="age"
            value={state.age}
            onChange={handleChange}
            isInvalid={!!errors.age}
            min="18"
            max="100"
            placeholder="Nhập tuổi (18-100)"
          />
          <Form.Control.Feedback type="invalid">
            {errors.age}
          </Form.Control.Feedback>
        </Form.Group>


        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={state.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
            placeholder="Nhập email (example@domain.com)"
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formPhoneNumber">
          <Form.Label>Số điện thoại</Form.Label>
          <Form.Control
            type="text"
            name="phoneNumber"
            value={state.phoneNumber}
            onChange={handleChange}
            isInvalid={!!errors.phoneNumber}
            placeholder="Nhập số điện thoại (10-15 chữ số)"
            maxLength="15"
          />
          <Form.Control.Feedback type="invalid">
            {errors.phoneNumber}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formSex">
          <Form.Label>Giới tính</Form.Label>
          <Form.Control
            as="select"
            name="sex"
            value={state.sex}
            onChange={handleChange}
            isInvalid={!!errors.sex}
          >
            <option value="">Chọn giới tính</option>
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.sex}
          </Form.Control.Feedback>
        </Form.Group>
        {/* Tạo 1 nút click đồng ý với điều khoảng */}
        <Form.Group controlId="formAgree">
          <Form.Check
            type="checkbox"
            label="Tôi đồng ý với các điều khoản"
            checked={state.agree}
            onChange={handleChange}
            name="agree"
            isInvalid={!!errors.agree}
          />
          <Form.Control.Feedback type="invalid">
            {errors.agree}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
        
      </Form>
      {/* Tạo 1 thông báo khi nhấn gửi thành công */}
      {state.showSuccess && (
        <Alert variant="success" className="mt-3">
          <strong>Thành công:</strong> Dữ liệu đã được gửi đi.
        </Alert>
      )}
    </Container>
  );
};
// Xác định PropTypes cho MyForm
MyForm.propTypes = {
  title: PropTypes.string.isRequired, // Tiêu đề phải là một chuỗi
  onSubmit: PropTypes.func.isRequired, // Hàm onSubmit phải là một function
};
export default MyForm;

