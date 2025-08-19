import React, { useState, useEffect, useReducer, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { 
  Modal, 
  Form, 
  Button, 
  ProgressBar, 
  Nav, 
  Card, 
  Alert,
  Toast,
  ToastContainer
} from 'react-bootstrap';
import { 
  FaEye, 
  FaEyeSlash, 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaUserCircle,
  FaLock,
  FaQuestionCircle,
  FaKey,
  FaMapMarkerAlt,
  FaCity,
  FaFlag,
  FaMailBulk,
  FaCheckCircle,
  FaUserTag
} from 'react-icons/fa';

// Initial state for the form
const initialState = {
  about: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    avatar: null
  },
  account: {
    username: '',
    password: '',
    confirmPassword: '',
    secretQuestion: '',
    answer: ''
  },
  address: {
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  }
};

// Form reducer for managing complex state
const formReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        [action.section]: {
          ...state[action.section],
          [action.field]: action.value
        }
      };
    case 'RESET_FORM':
      return initialState;
    default:
      return state;
  }
};

// Validation functions
const validateAbout = (about) => {
  const errors = {};
  if (!about.firstName.trim()) errors.firstName = 'First name is required';
  if (!about.lastName.trim()) errors.lastName = 'Last name is required';
  if (!about.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(about.email)) {
    errors.email = 'Email is invalid';
  }
  if (!about.phone.trim()) errors.phone = 'Phone is required';
  if (!about.age) {
    errors.age = 'Age is required';
  } else if (isNaN(about.age) || about.age < 1 || about.age > 120) {
    errors.age = 'Age must be a valid number between 1 and 120';
  }
  return errors;
};

const validateAccount = (account) => {
  const errors = {};
  if (!account.username.trim()) {
    errors.username = 'Username is required';
  } else if (account.username.length < 6) {
    errors.username = 'Username must be at least 6 characters';
  }
  
  if (!account.password) {
    errors.password = 'Password is required';
  } else if (account.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  } else if (!/(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(account.password)) {
    errors.password = 'Password must contain uppercase, number, and special character';
  }
  
  if (!account.confirmPassword) {
    errors.confirmPassword = 'Confirm password is required';
  } else if (account.password !== account.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  
  if (!account.secretQuestion) errors.secretQuestion = 'Secret question is required';
  if (!account.answer.trim()) errors.answer = 'Answer is required';
  
  return errors;
};

const validateAddress = (address) => {
  const errors = {};
  if (!address.street.trim()) errors.street = 'Street is required';
  if (!address.city.trim()) errors.city = 'City is required';
  if (!address.state.trim()) errors.state = 'State is required';
  if (!address.zipCode.trim()) errors.zipCode = 'Zip code is required';
  if (!address.country) errors.country = 'Country is required';
  return errors;
};

const ProfileForm = ({ show, onHide }) => {
  const [formData, dispatch] = useReducer(formReducer, initialState);
  const [currentStep, setCurrentStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [errors, setErrors] = useState({});

  const steps = ['About', 'Account', 'Address'];

  // Calculate progress percentage
  const progressPercentage = useMemo(() => {
    return ((currentStep + 1) / steps.length) * 100;
  }, [currentStep, steps.length]);

  // Check if current step is valid
  const currentStepErrors = useMemo(() => {
    const currentStepData = Object.values(formData)[currentStep];
    const currentStepName = steps[currentStep].toLowerCase();
    
    let stepErrors = {};
    switch (currentStepName) {
      case 'about':
        stepErrors = validateAbout(currentStepData);
        break;
      case 'account':
        stepErrors = validateAccount(currentStepData);
        break;
      case 'address':
        stepErrors = validateAddress(currentStepData);
        break;
      default:
        break;
    }
    
    return stepErrors;
  }, [formData, currentStep, steps]);

  // Update errors when current step errors change
  useEffect(() => {
    setErrors(currentStepErrors);
  }, [currentStepErrors]);

  // Check if current step is valid
  const isStepValid = useMemo(() => {
    return Object.keys(currentStepErrors).length === 0;
  }, [currentStepErrors]);

  // Handle field changes
  const onFieldChange = useCallback((section, field, value) => {
    dispatch({ type: 'UPDATE_FIELD', section, field, value });
  }, []);

  // Handle file change for avatar
  const onFileChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      onFieldChange('about', 'avatar', file);
    }
  }, [onFieldChange]);

  // Navigation handlers
  const nextStep = useCallback(() => {
    if (isStepValid && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  }, [isStepValid, currentStep, steps.length]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const handleFinish = useCallback(() => {
    if (isStepValid) {
      // Create new student profile from form data
      const newStudent = {
        id: Date.now(), // Use timestamp as unique ID
        name: `${formData.about.firstName} ${formData.about.lastName}`,
        email: formData.about.email,
        age: parseInt(formData.about.age),
        avatar: formData.about.avatar ? URL.createObjectURL(formData.about.avatar) : null,
        phone: formData.about.phone,
        username: formData.account.username,
        address: {
          street: formData.address.street,
          city: formData.address.city,
          state: formData.address.state,
          zipCode: formData.address.zipCode,
          country: formData.address.country
        },
        isNewProfile: true, // Flag to identify new profiles
        createdAt: new Date().toISOString()
      };

      // Get existing profiles from localStorage
      const existingProfiles = JSON.parse(localStorage.getItem('studentProfiles') || '[]');
      
      // Add new profile to the list
      const updatedProfiles = [...existingProfiles, newStudent];
      
      // Save to localStorage
      localStorage.setItem('studentProfiles', JSON.stringify(updatedProfiles));
      
      // Trigger a custom event to notify other components
      window.dispatchEvent(new CustomEvent('profileAdded', { detail: newStudent }));
      
      setShowSuccessModal(true);
      setShowToast(true);
    }
  }, [isStepValid, formData]);

  const handleClose = useCallback(() => {
    dispatch({ type: 'RESET_FORM' });
    setCurrentStep(0);
    setErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
    setShowSuccessModal(false);
    onHide();
  }, [onHide]);

  // Render About tab
  const renderAboutTab = () => (
    <div>
      <h4 className="mb-4">
        <FaUser className="me-2 text-primary" />
        About Information
      </h4>
      <Form.Group className="mb-3">
        <Form.Label>
          <FaUser className="me-2" />
          First Name *
        </Form.Label>
        <Form.Control
          type="text"
          value={formData.about.firstName}
          onChange={(e) => onFieldChange('about', 'firstName', e.target.value)}
          isInvalid={!!errors.firstName}
          placeholder="Enter your first name"
        />
        <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>
          <FaUser className="me-2" />
          Last Name *
        </Form.Label>
        <Form.Control
          type="text"
          value={formData.about.lastName}
          onChange={(e) => onFieldChange('about', 'lastName', e.target.value)}
          isInvalid={!!errors.lastName}
          placeholder="Enter your last name"
        />
        <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>
          <FaEnvelope className="me-2" />
          Email *
        </Form.Label>
        <Form.Control
          type="email"
          value={formData.about.email}
          onChange={(e) => onFieldChange('about', 'email', e.target.value)}
          isInvalid={!!errors.email}
          placeholder="Enter your email address"
        />
        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>
          <FaPhone className="me-2" />
          Phone *
        </Form.Label>
        <Form.Control
          type="tel"
          value={formData.about.phone}
          onChange={(e) => onFieldChange('about', 'phone', e.target.value)}
          isInvalid={!!errors.phone}
          placeholder="Enter your phone number"
        />
        <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>
          <FaUser className="me-2" />
          Age *
        </Form.Label>
        <Form.Control
          type="number"
          value={formData.about.age}
          onChange={(e) => onFieldChange('about', 'age', parseInt(e.target.value) || '')}
          isInvalid={!!errors.age}
          placeholder="Enter your age"
          min="1"
          max="120"
        />
        <Form.Control.Feedback type="invalid">{errors.age}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>
          <FaUserCircle className="me-2" />
          Avatar
        </Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          onChange={onFileChange}
        />
      </Form.Group>
    </div>
  );

  // Render Account tab
  const renderAccountTab = () => (
    <div>
      <h4 className="mb-4">
        <FaLock className="me-2 text-primary" />
        Account Information
      </h4>
      <Form.Group className="mb-3">
        <Form.Label>
          <FaUserTag className="me-2" />
          Username *
        </Form.Label>
        <Form.Control
          type="text"
          value={formData.account.username}
          onChange={(e) => onFieldChange('account', 'username', e.target.value)}
          isInvalid={!!errors.username}
          placeholder="Enter your username"
        />
        <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>
          <FaLock className="me-2" />
          Password *
        </Form.Label>
        <div className="position-relative">
          <Form.Control
            type={showPassword ? 'text' : 'password'}
            value={formData.account.password}
            onChange={(e) => onFieldChange('account', 'password', e.target.value)}
            isInvalid={!!errors.password}
            className="password-input"
            placeholder="Enter your password"
          />
          <Button
            variant="outline-secondary"
            size="sm"
            className="position-absolute end-0 top-0 h-100 password-toggle-btn"
            onClick={() => setShowPassword(!showPassword)}
            style={{ zIndex: 10 }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </Button>
        </div>
        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>
          <FaLock className="me-2" />
          Confirm Password *
        </Form.Label>
        <div className="position-relative">
          <Form.Control
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.account.confirmPassword}
            onChange={(e) => onFieldChange('account', 'confirmPassword', e.target.value)}
            isInvalid={!!errors.confirmPassword}
            className="password-input"
            placeholder="Confirm your password"
          />
          <Button
            variant="outline-secondary"
            size="sm"
            className="position-absolute end-0 top-0 h-100 password-toggle-btn"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            style={{ zIndex: 10 }}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </Button>
        </div>
        <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>
          <FaQuestionCircle className="me-2" />
          Secret Question *
        </Form.Label>
        <Form.Select
          value={formData.account.secretQuestion}
          onChange={(e) => onFieldChange('account', 'secretQuestion', e.target.value)}
          isInvalid={!!errors.secretQuestion}
        >
          <option value="">Select a secret question</option>
          <option value="What is your first pet's name?">What is your first pet's name?</option>
          <option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
          <option value="In which city were you born?">In which city were you born?</option>
          <option value="Who was your favorite teacher?">Who was your favorite teacher?</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">{errors.secretQuestion}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>
          <FaKey className="me-2" />
          Answer *
        </Form.Label>
        <Form.Control
          type="text"
          value={formData.account.answer}
          onChange={(e) => onFieldChange('account', 'answer', e.target.value)}
          isInvalid={!!errors.answer}
          placeholder="Enter your answer"
        />
        <Form.Control.Feedback type="invalid">{errors.answer}</Form.Control.Feedback>
      </Form.Group>
    </div>
  );

  // Render Address tab
  const renderAddressTab = () => (
    <div>
      <h4 className="mb-4">
        <FaMapMarkerAlt className="me-2 text-primary" />
        Address Information
      </h4>
      <Form.Group className="mb-3">
        <Form.Label>
          <FaMapMarkerAlt className="me-2" />
          Street *
        </Form.Label>
        <Form.Control
          type="text"
          value={formData.address.street}
          onChange={(e) => onFieldChange('address', 'street', e.target.value)}
          isInvalid={!!errors.street}
          placeholder="Enter your street address"
        />
        <Form.Control.Feedback type="invalid">{errors.street}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>
          <FaCity className="me-2" />
          City *
        </Form.Label>
        <Form.Control
          type="text"
          value={formData.address.city}
          onChange={(e) => onFieldChange('address', 'city', e.target.value)}
          isInvalid={!!errors.city}
          placeholder="Enter your city"
        />
        <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>
          <FaMapMarkerAlt className="me-2" />
          State *
        </Form.Label>
        <Form.Control
          type="text"
          value={formData.address.state}
          onChange={(e) => onFieldChange('address', 'state', e.target.value)}
          isInvalid={!!errors.state}
          placeholder="Enter your state/province"
        />
        <Form.Control.Feedback type="invalid">{errors.state}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>
          <FaMailBulk className="me-2" />
          Zip Code *
        </Form.Label>
        <Form.Control
          type="text"
          value={formData.address.zipCode}
          onChange={(e) => onFieldChange('address', 'zipCode', e.target.value)}
          isInvalid={!!errors.zipCode}
          placeholder="Enter your zip/postal code"
        />
        <Form.Control.Feedback type="invalid">{errors.zipCode}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>
          <FaFlag className="me-2" />
          Country *
        </Form.Label>
        <Form.Select
          value={formData.address.country}
          onChange={(e) => onFieldChange('address', 'country', e.target.value)}
          isInvalid={!!errors.country}
        >
          <option value="">Select a country</option>
          <option value="Viet Nam">Viet Nam</option>
          <option value="Korea">Korea</option>
          <option value="Italy">Italy</option>
          <option value="United States">United States</option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="Canada">Canada</option>
          <option value="Australia">Australia</option>
          <option value="Germany">Germany</option>
          <option value="France">France</option>
          <option value="Japan">Japan</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">{errors.country}</Form.Control.Feedback>
      </Form.Group>
    </div>
  );

  // Render current tab content
  const renderCurrentTab = () => {
    switch (currentStep) {
      case 0:
        return renderAboutTab();
      case 1:
        return renderAccountTab();
      case 2:
        return renderAddressTab();
      default:
        return null;
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <FaUserCircle className="me-2 text-primary" />
            Build Your Profile
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProgressBar 
            now={progressPercentage} 
            className="mb-4 progress-bar-custom"
            label={`${Math.round(progressPercentage)}%`}
          />
          
          <Nav variant="tabs" className="mb-4 nav-tabs">
            {steps.map((step, index) => (
              <Nav.Item key={step}>
                <Nav.Link 
                  active={index === currentStep}
                  disabled={index > currentStep}
                >
                  {step}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>

          {renderCurrentTab()}
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          {currentStep < steps.length - 1 ? (
            <Button 
              variant="primary" 
              onClick={nextStep}
              disabled={!isStepValid}
            >
              Next
            </Button>
          ) : (
            <Button 
              variant="success" 
              onClick={handleFinish}
              disabled={!isStepValid}
            >
              Finish
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <FaCheckCircle className="me-2 text-success" />
            Your Profile
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="profile-card">
            <Card.Body>
              <div className="row">
                <div className="col-md-3 text-center">
                  <div className="mb-3">
                    <h6>
                      <FaUserCircle className="me-2" />
                      Avatar
                    </h6>
                    {formData.about.avatar ? (
                      <img 
                        src={URL.createObjectURL(formData.about.avatar)} 
                        alt="Avatar" 
                        className="img-fluid rounded"
                        style={{ maxWidth: '150px', maxHeight: '150px' }}
                      />
                    ) : (
                      <div className="avatar-placeholder" 
                           style={{ width: '150px', height: '150px' }}>
                        <span>No image</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-9">
                  <div className="mb-4">
                    <h6>
                      <FaUser className="me-2 text-primary" />
                      About
                    </h6>
                    <p><strong>Name:</strong> {formData.about.firstName} {formData.about.lastName}</p>
                    <p><strong>Email:</strong> {formData.about.email}</p>
                    <p><strong>Phone:</strong> {formData.about.phone}</p>
                    <p><strong>Age:</strong> {formData.about.age} years old</p>
                  </div>
                  
                  <div className="mb-4">
                    <h6>
                      <FaLock className="me-2 text-primary" />
                      Account
                    </h6>
                    <p><strong>Username:</strong> {formData.account.username}</p>
                    <p><strong>Secret Question:</strong> {formData.account.secretQuestion}</p>
                    <p><strong>Answer:</strong> {formData.account.answer}</p>
                  </div>
                  
                  <div>
                    <h6>
                      <FaMapMarkerAlt className="me-2 text-primary" />
                      Address
                    </h6>
                    <p><strong>Street:</strong> {formData.address.street}</p>
                    <p><strong>City:</strong> {formData.address.city}</p>
                    <p><strong>State:</strong> {formData.address.state}</p>
                    <p><strong>Zip Code:</strong> {formData.address.zipCode}</p>
                    <p><strong>Country:</strong> {formData.address.country}</p>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast Notification */}
      <ToastContainer position="top-end" className="p-3">
        <Toast 
          show={showToast} 
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
          bg="success"
        >
          <Toast.Header>
            <FaCheckCircle className="me-2 text-success" />
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            <FaCheckCircle className="me-2" />
            Submitted successfully!
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

ProfileForm.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired
};

export default ProfileForm;
