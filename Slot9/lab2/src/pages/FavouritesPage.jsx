import { Container, Row, Col, Alert, Button } from 'react-bootstrap';
import { useState } from 'react';
import MovieCard from '../components/MovieCard';
import NotificationToast from '../components/NotificationToast';
import { useFavourites } from '../hooks/useFavourites';
import { movies } from '../movie.js';

const FavouritesPage = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('success');

  const { favourites, addToFavourites, isFavourite, clearFavourites } = useFavourites();

  const favouriteMovies = movies.filter(movie => favourites.includes(movie.id));

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

  const handleClearAll = () => {
    clearFavourites();
    handleShowToast('All favourites cleared!', 'info');
  };

  const handleShowToast = (message, variant = 'success') => {
    setToastMessage(message);
    setToastVariant(variant);
    setShowToast(true);
  };

  return (
    <div className="page-content">
      <Container>
        <h2 className="mb-4">My Favourite Movies</h2>
        
        {favouriteMovies.length === 0 ? (
          <Alert variant="info">
            <Alert.Heading>No favourites yet.</Alert.Heading>
            <p>Start adding movies to your favourites from the Free Movies page!</p>
          </Alert>
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <small className="text-muted">
                You have {favouriteMovies.length} favourite movie{favouriteMovies.length !== 1 ? 's' : ''}
              </small>
              <Button variant="outline-danger" size="sm" onClick={handleClearAll}>
                Clear All Favourites
              </Button>
            </div>
            <Row>
              {favouriteMovies.map(movie => (
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
          </>
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

export default FavouritesPage;
