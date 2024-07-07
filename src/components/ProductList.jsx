import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import Filter from './Filter';
import GeneralInfo from './GeneralInfo';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [likedProducts, setLikedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterType, setFilterType] = useState('family');
  const [searchText, setSearchText] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [displayCount, setDisplayCount] = useState(8);

  const sortProductsByName = (productsList, order) => {
    return productsList.sort((a, b) => {
      if (order === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
  };

  const fetchProducts = (url) => {
    setIsLoading(true);
    axios.get(url)
      .then(response => {
        const sortedProducts = sortProductsByName(response.data, 'asc');
        setProducts(sortedProducts);
        setFilteredProducts(sortedProducts);
        setDisplayedProducts(sortedProducts.slice(0, 8));
        setDisplayCount(8);
      })
      .catch(error => console.error('Error fetching data:', error))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchProducts('/fruityvice/api/fruit/all');
  }, []);

  const handleFilterChange = (type, text) => {
    setFilterType(type);
    setSearchText(text);
    const url = text === '' ? '/fruityvice/api/fruit/all' : `/fruityvice/api/fruit/${type}/${text}`;
    fetchProducts(url);
  };

  const handleSortOrderChange = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    const sortedFilteredProducts = sortProductsByName([...filteredProducts], newSortOrder);
    setFilteredProducts(sortedFilteredProducts);
    setDisplayedProducts(sortedFilteredProducts.slice(0, displayCount));
  };

  const handleLike = (productName, liked) => {
    const updatedLikes = liked ? [...likedProducts, productName] : likedProducts.filter(name => name !== productName);
    setLikedProducts(updatedLikes);
    localStorage.setItem('likedProducts', JSON.stringify(updatedLikes));
  };

  const loadMoreProducts = () => {
    const newDisplayCount = displayCount + 8;
    setDisplayedProducts(filteredProducts.slice(0, newDisplayCount));
    setDisplayCount(newDisplayCount);
  };

  const nutritionTotals = filteredProducts.reduce((totals, product) => {
    return {
      calories: totals.calories + product.nutritions.calories,
      fat: totals.fat + product.nutritions.fat,
      sugar: totals.sugar + product.nutritions.sugar,
      carbohydrates: totals.carbohydrates + product.nutritions.carbohydrates,
      protein: totals.protein + product.nutritions.protein,
    };
  }, { calories: 0, fat: 0, sugar: 0, carbohydrates: 0, protein: 0 });

  return (
    <div className="product-list">
      {isLoading ? (
        <div className="loading-overlay">
        <div className="loading-indicator">Loading...</div>
      </div>
      ) : (
        <>
      <div className="main-content">
        <Filter 
          onFilterChange={handleFilterChange}
          filterType={filterType}
          searchText={searchText}
          sortOrder={sortOrder}
          onSortOrderChange={handleSortOrderChange}
        />
        <div className="products">
          {displayedProducts.map(product => (
            <ProductCard key={product.name} product={product} onLike={handleLike} />
          ))}
        </div>
        {displayCount < filteredProducts.length && (
          <button className="see-more" onClick={loadMoreProducts}>
            See More
          </button>
        )}
      </div>
      <GeneralInfo totalProducts={filteredProducts.length} nutritionTotals={nutritionTotals} />
      </>
      )}
    </div>
  );
};

export default ProductList;
