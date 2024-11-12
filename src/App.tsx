import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Home from './components/home/Home';
import HomeMain from './components/home/main/HomeMain';
import HomeWishlist from './components/home/wishlist/HomeWishlist';
import HomePopular from './components/home/popular/HomePopular';
import HomeSearch from './components/home/search/HomeSearch';
import SignIn from './components/sign-in/SignIn';

const App = () => {
    return (
      <Router>
        <Routes>
          {/* 부모 경로 */}
          <Route path="/" element={<Home />}>
            {/* 자식 경로 */}
            <Route path="/" element={<HomeMain />} />
            <Route path="popular" element={<HomePopular />} />
            <Route path="wishlist" element={<HomeWishlist />} />
            {/* <Route path="popular" element={<HomePopular />} /> */}
          </Route>
        </Routes>
      </Router>
    );
  };

export default App;
