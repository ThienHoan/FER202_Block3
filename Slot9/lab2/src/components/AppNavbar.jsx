import { Navbar, Nav, Container, Badge } from 'react-bootstrap'; // Import các component Bootstrap
import { Link } from 'react-router-dom'; // Link để điều hướng client-side
import PropTypes from 'prop-types'; // Kiểm tra kiểu props
import { useFavourites } from '../contexts/FavouritesContext'; // Hook context để lấy số favourites

const AppNavbar = ({ currentPath }) => { // Navbar đầu trang
  const { favouritesCount } = useFavourites(); // Lấy số lượng phim yêu thích

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="shadow"> {/* Thanh điều hướng cố định trên */}
      <Container> {/* Bọc nội dung theo grid Bootstrap */}
        <Navbar.Brand as={Link} to="/" className="fw-bold"> {/* Logo/Brand trỏ về trang chủ */}
          🎬 Movie Explorer
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" /> {/* Nút toggle cho mobile */}
        <Navbar.Collapse id="basic-navbar-nav"> {/* Phần menu có thể thu gọn */}
          <Nav className="ms-auto"> {/* Nhóm link căn phải */}
            <Nav.Link 
              as={Link} 
              to="/" 
              className={currentPath === '/' ? 'active' : ''} // Active khi ở trang chủ
            >
              Free Movies
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/favourites" 
              className={currentPath === '/favourites' ? 'active' : ''} // Active khi ở trang favourites
            >
              My Favourite Movies 
              {favouritesCount > 0 && ( // Hiển thị badge khi có ít nhất 1 favourite
                <Badge bg="success" className="ms-1">
                  {favouritesCount}
                </Badge>
              )}
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/request" 
              className={currentPath === '/request' ? 'active' : ''} // Active khi ở form request
            >
              Movie Request Form
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

AppNavbar.propTypes = { // Định nghĩa kiểu cho props
  currentPath: PropTypes.string.isRequired // Đường dẫn hiện tại để set active
};

export default AppNavbar; // Xuất component mặc định
