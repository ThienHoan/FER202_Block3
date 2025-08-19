import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3 mt-5">
      <Container>
        <div className="text-center">
          <p className="mb-0">
            © {new Date().getFullYear()} Student Management System. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
