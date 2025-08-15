import { Card, Button, Badge, Modal } from 'react-bootstrap';
import { useState } from 'react';
import PropTypes from 'prop-types';

const MovieCard = ({ movie, onAddToFavourites, isFavourite, onShowToast }) => {
  const [showModal, setShowModal] = useState(false);

  const handleAddToFavourites = () => {
    onAddToFavourites(movie.id);
  };

  const truncateDescription = (text, maxLength = 100) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <>
      <Card className="h-100 shadow-sm movie-card">
        <Card.Img 
          variant="top" 
          src={movie.poster} 
          alt={`${movie.title} poster`}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="mb-2">{movie.title}</Card.Title>
          <Card.Text className="flex-grow-1">
            {truncateDescription(movie.description)}
          </Card.Text>
          
          <div className="mb-2">
            <Badge bg="primary" className="me-2">{movie.genre}</Badge>
            <small className="text-muted">
              {movie.year} • {movie.country} • {movie.duration} min
            </small>
          </div>

          <div className="d-grid gap-2">
            <Button 
              variant={isFavourite ? "outline-warning" : "outline-success"}
              onClick={handleAddToFavourites}
            >
              {isFavourite ? "Remove from Favourites" : "Add to Favourites"}
            </Button>
            <Button variant="primary" onClick={() => setShowModal(true)}>
              Details
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Modal for movie details */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{movie.title} ({movie.year})</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-4">
              <img 
                src={movie.poster} 
                alt={`${movie.title} poster`}
                className="img-fluid rounded"
              />
            </div>
            <div className="col-md-8">
              <h5>Description</h5>
              <p>{movie.description}</p>
              
              <h6>Movie Information</h6>
              <ul className="list-unstyled">
                <li><strong>Genre:</strong> <Badge bg="primary">{movie.genre}</Badge></li>
                <li><strong>Year:</strong> {movie.year}</li>
                <li><strong>Country:</strong> {movie.country}</li>
                <li><strong>Duration:</strong> {movie.duration} minutes</li>
              </ul>

              <h6>Showtimes</h6>
              <div className="d-flex gap-2 flex-wrap">
                <Badge bg="secondary">10:00 AM</Badge>
                <Badge bg="secondary">2:30 PM</Badge>
                <Badge bg="secondary">6:00 PM</Badge>
                <Badge bg="secondary">9:30 PM</Badge>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired
  }).isRequired,
  onAddToFavourites: PropTypes.func.isRequired,
  isFavourite: PropTypes.bool.isRequired,
  onShowToast: PropTypes.func.isRequired
};

export default MovieCard;
