import { Container, Row, Col, Alert } from 'react-bootstrap'; // Layout và UI từ Bootstrap
import { useState, useMemo } from 'react'; // Hook state và memo hóa
import HeroCarousel from '../components/HeroCarousel'; // Carousel phần đầu trang
import SearchFilterBar from '../components/SearchFilterBar'; // Thanh tìm kiếm/lọc/sắp xếp
import MovieCard from '../components/MovieCard'; // Thẻ hiển thị từng phim
import NotificationToast from '../components/NotificationToast'; // Toast thông báo
import { useFavourites } from '../contexts/FavouritesContext'; // Hook context favourites
import { movies } from '../movie.js'; // Dữ liệu phim mẫu

const HomePage = () => { // Trang danh sách phim miễn phí
  const [searchTerm, setSearchTerm] = useState(''); // Từ khóa tìm kiếm
  const [selectedGenre, setSelectedGenre] = useState('All'); // Thể loại được chọn
  const [sortBy, setSortBy] = useState('none'); // Tiêu chí sắp xếp
  const [showToast, setShowToast] = useState(false); // Trạng thái hiện toast
  const [toastMessage, setToastMessage] = useState(''); // Nội dung toast
  const [toastVariant, setToastVariant] = useState('success'); // Loại toast (màu)

  const { addToFavourites, isFavourite } = useFavourites(); // Lấy hàm toggle và check yêu thích

  // Filter and sort movies using useMemo for performance
  const filteredAndSortedMovies = useMemo(() => { // Tối ưu hiệu năng khi lọc/sắp xếp
    let filtered = movies; // Bắt đầu từ toàn bộ danh sách

    // Filter by search term
    if (searchTerm) { // Nếu có từ khóa
      filtered = filtered.filter(movie => // Lọc theo tiêu đề hoặc mô tả
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by genre
    if (selectedGenre !== 'All') { // Nếu chọn 1 thể loại cụ thể
      filtered = filtered.filter(movie => movie.genre === selectedGenre);
    }

    // Sort by duration
    if (sortBy === 'duration-asc') { // Thời lượng tăng dần
      filtered = [...filtered].sort((a, b) => a.duration - b.duration);
    } else if (sortBy === 'duration-desc') { // Thời lượng giảm dần
      filtered = [...filtered].sort((a, b) => b.duration - a.duration);
    }

    return filtered; // Trả về kết quả cuối cùng
  }, [searchTerm, selectedGenre, sortBy]); // Chỉ tính lại khi các deps thay đổi

  const handleAddToFavourites = (movieId) => { // Xử lý click favourite
    const movie = movies.find(m => m.id === movieId); // Tìm phim theo ID
    const wasFavourite = isFavourite(movieId); // Lưu trạng thái trước khi toggle
    
    addToFavourites(movieId); // Toggle trạng thái trong context/storage
    
    handleShowToast( // Hiển thị thông báo phù hợp
      wasFavourite 
        ? `${movie.title} removed from favourites!`
        : `${movie.title} added to favourites!`,
      wasFavourite ? 'warning' : 'success'
    );
  };

  const handleShowToast = (message, variant = 'success') => { // Helper hiển thị toast
    setToastMessage(message); // Nội dung
    setToastVariant(variant); // Màu sắc
    setShowToast(true); // Bật toast
  };

  return (
    <div className="page-content"> {/* Nội dung trang chính */}
      <HeroCarousel /> {/* Carousel phần đầu */}
      
      <Container> {/* Vùng container Bootstrap */}
        <h2 className="mb-4">Free Movies Collection</h2> {/* Tiêu đề */}
        
        <SearchFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <div className="mb-3"> {/* Thông tin số lượng phim hiển thị */}
          <small className="text-muted">
            Showing {filteredAndSortedMovies.length} of {movies.length} movies
          </small>
        </div>

        {filteredAndSortedMovies.length === 0 ? (
          <Alert variant="info"> {/* Hiển thị khi không có phim nào phù hợp */}
            <Alert.Heading>No movies found</Alert.Heading>
            <p>Try adjusting your search criteria or browse all genres.</p>
          </Alert>
        ) : (
          <Row> {/* Lưới các thẻ phim */}
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

export default HomePage; // Xuất mặc định trang Home
