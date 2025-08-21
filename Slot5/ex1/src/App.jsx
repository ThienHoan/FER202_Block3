import { useState, useMemo } from 'react';
import { Container } from 'react-bootstrap';
import NavbarComponent from './components/Navbar';
import Hero from './components/Hero';
import FeaturedCarousel from './components/FeaturedCarousel';
import Filters from './components/Filters';
import SortControls from './components/SortControls';
import RecipeGrid from './components/RecipeGrid';
import PaginationControls from './components/PaginationControls';
import Footer from './components/Footer';
import './App.css';

const recipesData = [
  {
    title: "Mediterranean Chickpea Salad",
    description: "A refreshing, protein-packed salad tossed in a lemon-olive oil dressing.",
    servings: 2,
    prep: 10,
    cook: 0,
    image: "/images/photo-1512621776951-a57141f2eefd.jpg"
  },
  {
    title: "Avocado & Tomato Wholegrain Toast",
    description: "Creamy avocado spread over toasted wholegrain bread, topped with juicy tomatoes.",
    servings: 1,
    prep: 5,
    cook: 5,
    image: "/images/photo-1541519227354-08fa5d50c44d.jpg"
  },
  {
    title: "One-Pan Lemon Garlic Salmon",
    description: "A 15-minute weeknight dinner of flaky salmon and tender asparagus.",
    servings: 2,
    prep: 5,
    cook: 12,
    image: "/images/photo-1467003909585-2f8a72700288.jpg"
  },
  {
    title: "Quinoa Veggie Power Bowl",
    description: "A balanced bowl of fluffy quinoa, roasted veggies and healthy fats.",
    servings: 2,
    prep: 10,
    cook: 15,
    image: "/images/photo-1512621776951-a57141f2eefd.jpg"
  },
  {
    title: "Sweet Potato Black Bean Tacos",
    description: "Smoky roasted sweet potatoes and black beans tucked into warm tortillas.",
    servings: 3,
    prep: 10,
    cook: 15,
    image: "/images/photo-1551504734-5ee1c4a1479b.jpg"
  },
  {
    title: "Greek Yogurt Berry Parfait",
    description: "Layers of creamy yogurt, fresh berries and crunchy oats for a high-protein snack.",
    servings: 1,
    prep: 5,
    cook: 0,
    image: "/images/photo-1488477181946-6428a0291777.jpg"
  },
  {
    title: "Lentil & Spinach Soup",
    description: "A hearty 30-minute soup rich in plant protein and iron.",
    servings: 4,
    prep: 10,
    cook: 20,
    image: "/images/photo-1547592180-85f173990554.jpg"
  },
  {
    title: "Banana Oat Pancakes",
    description: "Flour-free pancakes sweetened naturally with ripe bananas.",
    servings: 2,
    prep: 5,
    cook: 10,
    image: "/images/photo-1567620905732-2d1ec7ab7445.jpg"
  }
];

function App() {
  // State management for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [maxPrepTime, setMaxPrepTime] = useState('');
  const [maxCookTime, setMaxCookTime] = useState('');
  const [sortBy, setSortBy] = useState('');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // Sort function
  const sortRecipes = (recipes, sortType) => {
    if (!sortType) return recipes;
    
    const sorted = [...recipes];
    
    switch (sortType) {
      case 'name-asc':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case 'name-desc':
        return sorted.sort((a, b) => b.title.localeCompare(a.title));
      case 'prep-asc':
        return sorted.sort((a, b) => a.prep - b.prep);
      case 'prep-desc':
        return sorted.sort((a, b) => b.prep - a.prep);
      case 'cook-asc':
        return sorted.sort((a, b) => a.cook - b.cook);
      case 'cook-desc':
        return sorted.sort((a, b) => b.cook - a.cook);
      default:
        return sorted;
    }
  };

  // Filter and sort recipes
  const processedRecipes = useMemo(() => {
    let filtered = recipesData.filter(recipe => {
      const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesPrepTime = !maxPrepTime || recipe.prep <= parseInt(maxPrepTime);
      const matchesCookTime = !maxCookTime || recipe.cook <= parseInt(maxCookTime);
      
      return matchesSearch && matchesPrepTime && matchesCookTime;
    });

    return sortRecipes(filtered, sortBy);
  }, [searchTerm, maxPrepTime, maxCookTime, sortBy]);

  // Pagination calculations
  const totalPages = Math.ceil(processedRecipes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRecipes = processedRecipes.slice(startIndex, startIndex + itemsPerPage);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page
  };

  return (
    <div className="App">
      <NavbarComponent />
      
      <FeaturedCarousel />
      
      <Hero />
      
      {/* Filters Section */}
      <Filters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        maxPrepTime={maxPrepTime}
        setMaxPrepTime={setMaxPrepTime}
        maxCookTime={maxCookTime}
        setMaxCookTime={setMaxCookTime}
      />

      {/* Sort Controls and Recipe Grid */}
      <Container className="py-4">
        <SortControls sortBy={sortBy} setSortBy={setSortBy} />
        
        <RecipeGrid recipes={currentRecipes} />
        
        {processedRecipes.length === 0 && (
          <div className="text-center py-5">
            <h3 className="text-muted">No recipes found</h3>
            <p className="text-muted">Try adjusting your search criteria</p>
          </div>
        )}

        {processedRecipes.length > 0 && (
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        )}
      </Container>

      <Footer />
    </div>
  );
}

export default App;
