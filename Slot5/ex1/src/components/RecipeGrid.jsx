import { Container, Row, Col } from 'react-bootstrap';
import RecipeCard from './RecipeCard';

const RecipeGrid = ({ recipes }) => {
  return (
    <Container className="py-5">
      <Row>
        {recipes.map((recipe, index) => (
          <Col key={index} xl={4} lg={4} md={6} sm={12} className="mb-4">
            <RecipeCard recipe={recipe} />
          </Col>
        ))}
      </Row>
      
      {recipes.length === 0 && (
        <div className="text-center py-5">
          <h3 className="text-muted">No recipes found</h3>
          <p className="text-muted">Try adjusting your search criteria</p>
        </div>
      )}
    </Container>
  );
};

export default RecipeGrid;
