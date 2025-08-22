import React, { useState, useEffect } from 'react';
import { Carousel as BootstrapCarousel, Button, Badge } from 'react-bootstrap';
import { FaPlay, FaPause } from 'react-icons/fa';
import './Carousel.css';

const Carousel = ({ images, autoPlay = true, interval = 3000 }) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  const toggleAutoPlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="carousel-wrapper position-relative">
      <BootstrapCarousel
        interval={isPlaying ? interval : null}
        controls={true}
        indicators={true}
        fade={false}
        className="custom-carousel"
      >
        {images.map((image, index) => (
          <BootstrapCarousel.Item key={index}>
            <img
              className="d-block w-100"
              src={image.src}
              alt={image.alt || `Slide ${index + 1}`}
              style={{ height: '400px', objectFit: 'cover' }}
            />
            {image.title && (
              <BootstrapCarousel.Caption>
                <h3>{image.title}</h3>
                {image.description && <p>{image.description}</p>}
              </BootstrapCarousel.Caption>
            )}
          </BootstrapCarousel.Item>
        ))}
      </BootstrapCarousel>

      {/* Auto-play Toggle Button */}
      <Button
        variant="outline-light"
        size="sm"
        className="position-absolute top-0 end-0 m-3"
        onClick={toggleAutoPlay}
        style={{ zIndex: 10 }}
      >
        {isPlaying ? <FaPause /> : <FaPlay />}
      </Button>

      {/* Auto-play Status Badge */}
      <Badge
        bg={isPlaying ? "success" : "secondary"}
        className="position-absolute top-0 start-0 m-3"
        style={{ zIndex: 10 }}
      >
        {isPlaying ? "Auto" : "Manual"}
      </Badge>
    </div>
  );
};

export default Carousel;
