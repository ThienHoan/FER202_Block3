import { Container, Row, Col, Alert } from 'react-bootstrap';
import { useState, useMemo } from 'react';
import HeroCarousel from '../components/HeroCarousel';
import SearchFilterBar from '../components/SearchFilterBar';
import MovieCard from '../components/MovieCard';
import NotificationToast from '../components/NotificationToast';
import { useFavourites } from '../hooks/useFavourites';
import { movies } from '../movie.js';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState('none');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('success');

  const { addToFavourites, isFavourite } = useFavourites();

  // Filter and sort movies using useMemo for performance
  const filteredAndSortedMovies = useMemo(() => {
    let filtered = movies;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by genre
    if (selectedGenre !== 'All') {
      filtered = filtered.filter(movie => movie.genre === selectedGenre);
    }

    // Sort by duration
    if (sortBy === 'duration-asc') {
      filtered = [...filtered].sort((a, b) => a.duration - b.duration);
    } else if (sortBy === 'duration-desc') {
      filtered = [...filtered].sort((a, b) => b.duration - a.duration);
    }

    return filtered;
  }, [searchTerm, selectedGenre, sortBy]);

  const handleAddToFavourites = (movieId) => {
    const movie = movies.find(m => m.id === movieId);
    const wasFavourite = isFavourite(movieId);
    
    addToFavourites(movieId);
    
    handleShowToast(
      wasFavourite 
        ? `${movie.title} removed from favourites!`
        : `${movie.title} added to favourites!`,
      wasFavourite ? 'warning' : 'success'
    );
  };

  const handleShowToast = (message, variant = 'success') => {
    setToastMessage(message);
    setToastVariant(variant);
    setShowToast(true);
  };

  return (
    <div className="page-content">
      <HeroCarousel />
      
      <Container>
        <h2 className="mb-4">Free Movies Collection</h2>
        
        <SearchFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <div className="mb-3">
          <small className="text-muted">
            Showing {filteredAndSortedMovies.length} of {movies.length} movies
          </small>
        </div>

        {filteredAndSortedMovies.length === 0 ? (
          <Alert variant="info">
            <Alert.Heading>No movies found</Alert.Heading>
            <p>Try adjusting your search criteria or browse all genres.</p>
          </Alert>
        ) : (
          <Row>
            {filteredAndSortedMovies.map(movie => (
              <Col key={movie.id} xs={12} sm={6} lg={4} className="mb-4">
                <MovieCard
                  movie={movie}
                  onAddToFavourites={handleAddToFavourites}
                  isFavourite={isFavourite(movie.id)}
                  onShowToast={handleShowToast}
                />
              </Col>
            ))}
          </Row>
        )}
      </Container>

      <NotificationToast
        show={showToast}
        onClose={() => setShowToast(false)}
        message={toastMessage}
        variant={toastVariant}
      />
    </div>
  );
};

export default HomePage;
