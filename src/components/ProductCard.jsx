import React, { useState } from 'react';

const ProductCard = ({ product, onLike }) => {
  const [liked, setLiked] = useState(false);
  const [imageSrc, setImageSrc] = useState(`/images/${product.name}.webp`);

  const handleLike = () => {
    setLiked(!liked);
    onLike(product.name, !liked);
  };

  const handleImageError = () => {
    if (imageSrc.endsWith('.webp')) {
      setImageSrc(`/images/${product.name}.jpg`);
    } else {
      setImageSrc('/images/not-available.webp');
    }
  };

  return (
    <div className="card">
      <img 
        src={imageSrc} 
        alt={product.name} 
        className="card-img-top" 
        onError={handleImageError} 
      />
      <button className="like-button" onClick={handleLike}>
        {liked ? '❤️' : '🤍'}
      </button>
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <div className="family-order-genus">
          <div><strong>Family:</strong><br />{product.family}</div>
          <div><strong>Order:</strong><br />{product.order}</div>
          <div><strong>Genus:</strong><br />{product.genus}</div>
        </div>
        <h5 className="card-title">Nutritions</h5>
        <div className="card-text"><label>Calories:</label> <span>{product.nutritions.calories}</span></div>
        <div className="card-text"><label>Fat:</label> <span>{product.nutritions.fat}</span></div>
        <div className="card-text"><label>Sugar:</label> <span>{product.nutritions.sugar}</span></div>
        <div className="card-text"><label>Carbohydrates:</label> <span>{product.nutritions.carbohydrates}</span></div>
        <div className="card-text"><label>Protein:</label> <span>{product.nutritions.protein}</span></div>
      </div>
    </div>
  );
};

export default ProductCard;
