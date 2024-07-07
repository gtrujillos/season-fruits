import React from 'react';
import ProductList from './components/ProductList';
import './App.scss';

const App = () => {
  return (
    <div className="App">
      <div className="top">
        <h1>Season Fruits</h1>
        <h2>The Most Wonderful Fruits</h2>
      </div>
      <div className="content">
        <ProductList />
      </div>
    </div>
  );
};

export default App;
