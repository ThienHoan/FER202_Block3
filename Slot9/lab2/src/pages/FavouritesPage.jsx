import { Container, Row, Col, Alert, Button } from 'react-bootstrap'; // UI từ Bootstrap
import { useState } from 'react'; // Hook state React
import MovieCard from '../components/MovieCard'; // Thẻ phim tái sử dụng
import NotificationToast from '../components/NotificationToast'; // Toast thông báo
import { useFavourites } from '../contexts/FavouritesContext'; // Hook context favourites
import { movies } from '../movie.js'; // Dữ liệu phim mẫu

const FavouritesPage = () => { // Trang hiển thị các phim yêu thích
  const [showToast, setShowToast] = useState(false); // Trạng thái toast
  const [toastMessage, setToastMessage] = useState(''); // Nội dung toast
  const [toastVariant, setToastVariant] = useState('success'); // Loại toast

  const { favourites, addToFavourites, isFavourite, clearFavourites } = useFavourites(); // Lấy dữ liệu và hành động từ context

  const favouriteMovies = movies.filter(movie => favourites.includes(movie.id)); // Lọc ra các phim thuộc danh sách yêu thích

  const handleAddToFavourites = (movieId) => { // Toggle yêu thích từ trang favourites
    const movie = movies.find(m => m.id === movieId); // Lấy thông tin phim
    const wasFavourite = isFavourite(movieId); // Trạng thái trước khi toggle
    
    addToFavourites(movieId); // Thực hiện toggle
    
    handleShowToast( // Hiển thị thông báo phù hợp
      wasFavourite 
        ? `${movie.title} removed from favourites!`
        : `${movie.title} added to favourites!`,
      wasFavourite ? 'warning' : 'success'
    );
  };

  const handleClearAll = () => { // Xóa toàn bộ danh sách yêu thích
    clearFavourites(); // Gọi context để xóa
    handleShowToast('All favourites cleared!', 'info'); // Thông báo
  };

  const handleShowToast = (message, variant = 'success') => { // Helper hiển thị toast
    setToastMessage(message);
    setToastVariant(variant);
    setShowToast(true);
  };

  return (
    <div className="page-content"> {/* Nội dung trang favourites */}
      <Container>
        <h2 className="mb-4">My Favourite Movies</h2>
        
        {favouriteMovies.length === 0 ? (
          <Alert variant="info"> {/* Khi chưa có phim yêu thích */}
            <Alert.Heading>No favourites yet.</Alert.Heading>
            <p>Start adding movies to your favourites from the Free Movies page!</p>
          </Alert>
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-center mb-3"> {/* Header nhỏ */}
              <small className="text-muted">
                You have {favouriteMovies.length} favourite movie{favouriteMovies.length !== 1 ? 's' : ''}
              </small>
              <Button variant="outline-danger" size="sm" onClick={handleClearAll}>
                Clear All Favourites
              </Button>
            </div>
            <Row> {/* Lưới thẻ phim yêu thích */}
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

export default FavouritesPage; // Xuất mặc định trang Favourites
