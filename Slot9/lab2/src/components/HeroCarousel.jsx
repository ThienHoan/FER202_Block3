import { Carousel } from 'react-bootstrap'; // Carousel của Bootstrap
import { carouselSlides } from '../movie.js'; // Dữ liệu slide mẫu

const HeroCarousel = () => { // Carousel phần đầu trang
  return (
    <Carousel className="mb-4" interval={4000}> {/* Tự động chuyển slide mỗi 4s */}
      {carouselSlides.map((slide) => (
        <Carousel.Item key={slide.id}> {/* Mỗi item là 1 slide */}
          <img
            className="d-block w-100"
            src={slide.image}
            alt={slide.title}
            style={{ height: '400px', objectFit: 'cover' }} // Căn ảnh cover chiều cao cố định
          />
          <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-3"> {/* Chú thích trên ảnh */}
            <h3>{slide.title}</h3>
            <p>{slide.caption}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default HeroCarousel; // Xuất mặc định Carousel
