import { useState } from 'react';
import NavbarComponent from './components/Navbar';
import Hero from './components/Hero';
import Filters from './components/Filters';
import RecipeGrid from './components/RecipeGrid';
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

  // Filter recipes based on search criteria
  const filteredRecipes = recipesData.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPrepTime = !maxPrepTime || recipe.prep <= parseInt(maxPrepTime);
    const matchesCookTime = !maxCookTime || recipe.cook <= parseInt(maxCookTime);
    
    return matchesSearch && matchesPrepTime && matchesCookTime;
  });

  return (
    <div className="App">
      {/* Navigation */}
      <NavbarComponent />
      
      {/* Hero Section */}
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

      {/* Recipe Grid */}
      <RecipeGrid recipes={filteredRecipes} />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
