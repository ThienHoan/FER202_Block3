import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <span>Made with ❤️ and 🥗</span>
          </div>
          <div className="d-flex gap-3">
            <span>📷</span>
            <span>🐦</span>
            <span>🎵</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
