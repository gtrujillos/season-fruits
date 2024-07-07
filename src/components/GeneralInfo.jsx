import React from 'react';

const GeneralInfo = ({ totalProducts, nutritionTotals }) => {
  return (
    <div className="general-info">
      <h2>General information</h2>
      <div className="label-value">
        <label>No. Of Found Products:</label> 
        <span>{totalProducts}</span>
      </div>
      <p className="nutrition-title">Nutritional properties of found products</p>
      <div className="label-value">
        <label>Total calories:</label> 
        <span>{nutritionTotals.calories.toFixed(2)}</span>
      </div>
      <div className="label-value">
        <label>Total fats:</label> 
        <span>{nutritionTotals.fat.toFixed(2)}</span>
      </div>
      <div className="label-value">
        <label>Total sugar:</label> 
        <span>{nutritionTotals.sugar.toFixed(2)}</span>
      </div>
      <div className="label-value">
        <label>Total carbohydrates:</label> 
        <span>{nutritionTotals.carbohydrates.toFixed(2)}</span>
      </div>
      <div className="label-value">
        <label>Total proteins:</label> 
        <span>{nutritionTotals.protein.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default GeneralInfo;
