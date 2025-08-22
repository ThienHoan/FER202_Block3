import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap'; // Import các component Bootstrap
import { useState } from 'react'; // Hook state React
import { allGenres } from '../movie.js'; // Danh sách thể loại để render select

const RequestFormPage = () => { // Trang form yêu cầu thêm phim
  const [formData, setFormData] = useState({ // State lưu dữ liệu form
    title: '', // Tên phim
    genre: '', // Thể loại
    year: '', // Năm phát hành
    duration: '', // Thời lượng (phút)
    description: '' // Mô tả
  });

  const [errors, setErrors] = useState({}); // Lỗi validate từng field
  const [isSubmitting, setIsSubmitting] = useState(false); // Trạng thái đang gửi
  const [showSuccess, setShowSuccess] = useState(false); // Hiện alert thành công

  const validateForm = () => { // Hàm kiểm tra hợp lệ của form
    const newErrors = {}; // Gom lỗi theo field

    // Title validation
    if (!formData.title.trim()) { // Không để trống
      newErrors.title = 'Movie title is required';
    }

    // Genre validation
    if (!formData.genre || formData.genre === 'All') { // Phải chọn 1 thể loại hợp lệ
      newErrors.genre = 'Please select a genre';
    }

    // Year validation
    const currentYear = new Date().getFullYear(); // Năm hiện tại
    const year = parseInt(formData.year); // Parse số năm
    if (!formData.year) { // Không được trống
      newErrors.year = 'Release year is required';
    } else if (isNaN(year) || year < 1900 || year > currentYear + 5) { // Khoảng hợp lệ
      newErrors.year = `Year must be between 1900 and ${currentYear + 5}`;
    }

    // Duration validation
    const duration = parseInt(formData.duration); // Parse số phút
    if (!formData.duration) { // Không được trống
      newErrors.duration = 'Duration is required';
    } else if (isNaN(duration) || duration <= 0) { // Phải là số dương
      newErrors.duration = 'Duration must be a positive number';
    } else if (duration > 600) { // Giới hạn tối đa 600 phút
      newErrors.duration = 'Duration seems too long (max 600 minutes)';
    }

    // Description validation
    if (!formData.description.trim()) { // Không để trống
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 30) { // Tối thiểu 30 ký tự
      newErrors.description = 'Description must be at least 30 characters long';
    } else if (formData.description.trim().length > 500) { // Tối đa 500 ký tự
      newErrors.description = 'Description must be less than 500 characters';
    }

    return newErrors; // Trả về object lỗi
  };

  const handleInputChange = (e) => { // Xử lý thay đổi từng input
    const { name, value } = e.target; // Tên field và giá trị mới
    setFormData(prev => ({ // Cập nhật state form
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) { // Nếu field này đang có lỗi
      setErrors(prev => ({ // Xóa lỗi tương ứng
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => { // Xử lý submit form
    e.preventDefault(); // Chặn reload trang
    
    const newErrors = validateForm(); // Kiểm tra hợp lệ
    setErrors(newErrors); // Gán lỗi để hiển thị

    if (Object.keys(newErrors).length === 0) { // Nếu không có lỗi
      setIsSubmitting(true); // Báo đang gửi
      
      // Simulate API call
      setTimeout(() => { // Giả lập gọi API 1s
        setIsSubmitting(false); // Tắt trạng thái gửi
        setShowSuccess(true); // Hiện thông báo thành công
        
        // Reset form
        setFormData({ // Đặt lại dữ liệu form rỗng
          title: '',
          genre: '',
          year: '',
          duration: '',
          description: ''
        });

        // Hide success message after 5 seconds
        setTimeout(() => { // Tự ẩn thông báo sau 5s
          setShowSuccess(false);
        }, 5000);
      }, 1000);
    }
  };

  const genreOptions = allGenres.filter(genre => genre !== 'All'); // Loại bỏ "All" khỏi dropdown

  return (
    <div className="page-content"> {/* Nội dung trang form */}
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}> {/* Bố cục form */}
            <h2 className="mb-4">Movie Request Form</h2>
            <p className="text-muted mb-4">
              Can't find the movie you're looking for? Submit a request and we'll consider adding it to our collection!
            </p>

            {showSuccess && (
              <Alert variant="success" className="mb-4"> {/* Thông báo thành công */}
                <Alert.Heading>Request submitted. Thank you!</Alert.Heading>
                <p>We've received your movie request and will review it soon.</p>
              </Alert>
            )}

            <Form onSubmit={handleSubmit}> {/* Form nhập liệu */}
              <Form.Group className="mb-3"> {/* Tên phim */}
                <Form.Label>Movie Title *</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  isInvalid={!!errors.title}
                  placeholder="Enter movie title"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3"> {/* Thể loại */}
                <Form.Label>Genre *</Form.Label>
                <Form.Select
                  name="genre"
                  value={formData.genre}
                  onChange={handleInputChange}
                  isInvalid={!!errors.genre}
                >
                  <option value="">Select a genre</option>
                  {genreOptions.map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.genre}
                </Form.Control.Feedback>
              </Form.Group>

              <Row>
                <Col md={6}> {/* Năm phát hành */}
                  <Form.Group className="mb-3">
                    <Form.Label>Release Year *</Form.Label>
                    <Form.Control
                      type="number"
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      isInvalid={!!errors.year}
                      placeholder="e.g. 2023"
                      min="1900"
                      max={new Date().getFullYear() + 5}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.year}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}> {/* Thời lượng */}
                  <Form.Group className="mb-3">
                    <Form.Label>Duration (minutes) *</Form.Label>
                    <Form.Control
                      type="number"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      isInvalid={!!errors.duration}
                      placeholder="e.g. 120"
                      min="1"
                      max="600"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.duration}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-4"> {/* Mô tả */}
                <Form.Label>Description *</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  isInvalid={!!errors.description}
                  placeholder="Provide a detailed description of the movie (minimum 30 characters)"
                />
                <Form.Text className="text-muted">
                  {formData.description.length}/500 characters
                  {formData.description.length < 30 && formData.description.length > 0 && 
                    ` (${30 - formData.description.length} more needed)`
                  }
                </Form.Text>
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="d-grid"> {/* Nút submit */}
                <Button 
                  variant="primary" 
                  type="submit" 
                  disabled={isSubmitting}
                  size="lg"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </Button>
              </div>
            </Form>

            <div className="mt-4"> {/* Chú thích field bắt buộc */}
              <small className="text-muted">* Required fields</small>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RequestFormPage;
