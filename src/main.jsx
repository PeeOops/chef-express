import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/index.css'
import Home from './pages/Home.jsx'
import Favourites from './pages/Favourites.jsx';
import PageNotFound from './components/404.jsx';
import FoodDetails from './pages/FoodDetails.jsx';
import Categories from './pages/Categories.jsx';



createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="*" element={<PageNotFound />} />
      <Route path="/" element={<Home/>} />
      <Route path="/favourite" element={<Favourites/>} />
      <Route path="/meals" element={<FoodDetails />} />
      <Route path="/categories" element={<Categories />} />
    </Routes>
  </BrowserRouter>
)
