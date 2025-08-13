import { Carousel, Container } from 'react-bootstrap';

const FeaturedCarousel = () => {
  const featuredRecipes = [
    {
      id: 1,
      image: "/images/photo-1467003909585-2f8a72700288.jpg",
      title: "One-Pan Lemon Garlic Salmon",
      description: "A 15-minute weeknight dinner of flaky salmon and tender asparagus."
    },
    {
      id: 2,
      image: "/images/photo-1512621776951-a57141f2eefd.jpg",
      title: "Mediterranean Chickpea Salad",
      description: "A refreshing, protein-packed salad tossed in a lemon-olive oil dressing."
    },
    {
      id: 3,
      image: "/images/photo-1551504734-5ee1c4a1479b.jpg",
      title: "Sweet Potato Black Bean Tacos",
      description: "Smoky roasted sweet potatoes and black beans tucked into warm tortillas."
    }
  ];

  return (
    <Container fluid className="p-0 mb-4">
      <Carousel fade interval={4000}>
        {featuredRecipes.map((recipe) => (
          <Carousel.Item key={recipe.id}>
            <div 
              className="carousel-image"
              style={{
                height: '400px',
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${recipe.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Carousel.Caption>
                <h3 className="fw-bold text-white">{recipe.title}</h3>
                <p className="text-white-50">{recipe.description}</p>
              </Carousel.Caption>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default FeaturedCarousel;
