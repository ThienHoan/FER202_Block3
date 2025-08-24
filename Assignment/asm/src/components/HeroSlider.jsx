import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';

const HeroSlider = () => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      id: 1,
      image: '/images/banner1.jpg',
      title: 'iPhone 15 Pro Max',
      subtitle: 'Titanium. So strong. So light. So Pro.',
      alt: 'iPhone 15 Pro Max Banner'
    },
    {
      id: 2,
      image: '/images/banner2.jpg',
      title: 'Samsung Galaxy S23 Ultra',
      subtitle: 'Share the Epic',
      alt: 'Samsung Galaxy S23 Ultra Banner'
    },
    {
      id: 3,
      image: '/images/banner3.jpg',
      title: 'Khuyến mãi đặc biệt',
      subtitle: 'Giảm giá lên đến 30% cho tất cả sản phẩm',
      alt: 'Special Promotion Banner'
    }
  ];

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % slides.length);
      }, 5000); // Auto-advance every 5 seconds

      return () => clearInterval(interval);
    }
  }, [isPaused, slides.length]);

  return (
    <div className="mb-4">
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="rounded"
        interval={null}
      >
        {slides.map((slide) => (
          <Carousel.Item key={slide.id}>
            <div 
              className="hero-slide d-flex align-items-center justify-content-center position-relative rounded"
              style={{
                background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="text-center text-white px-3">
                <h1 className="display-4 fw-bold mb-3">{slide.title}</h1>
                <p className="lead">{slide.subtitle}</p>
              </div>
            </div>
            <span className="visually-hidden">{slide.alt}</span>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroSlider;
