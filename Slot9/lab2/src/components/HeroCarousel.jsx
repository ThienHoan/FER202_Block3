import { Carousel } from 'react-bootstrap';
import { carouselSlides } from '../movie.js';

const HeroCarousel = () => {
  return (
    <Carousel className="mb-4" interval={4000}>
      {carouselSlides.map((slide) => (
        <Carousel.Item key={slide.id}>
          <img
            className="d-block w-100"
            src={slide.image}
            alt={slide.title}
            style={{ height: '400px', objectFit: 'cover' }}
          />
          <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-3">
            <h3>{slide.title}</h3>
            <p>{slide.caption}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default HeroCarousel;
