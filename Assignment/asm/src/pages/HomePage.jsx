import React from 'react';
import { Container } from 'react-bootstrap';
import HeroSlider from '../components/HeroSlider';
import ProductGrid from '../components/ProductGrid';
import PropTypes from 'prop-types';

const HomePage = () => {
  return (
    <>
      <HeroSlider />
      <ProductGrid />
    </>
  );
};

// HomePage không cần PropTypes vì không nhận props

export default HomePage;
