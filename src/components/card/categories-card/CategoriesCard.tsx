import { useState } from 'react';
import { CategoriesDTO } from '../../../DTO/CategoriesDTO';
import './CategoriesCard.css';
import { FoodCategoryDTO } from '../../../DTO/FoodDTO';
import { HelperStringUppercase } from '../../../helper/HelperStringUppercase';

type CategoryType = {
  CategoryItem: FoodCategoryDTO;
};

export const CategoriesCard = ({ CategoryItem }: CategoryType) => {
  const [onChoice, setChoice] = useState(false);

  return (
    <div className="category-card">
      <div className="category-image">
        <img src={CategoryItem.image} alt="category-image" />
      </div>
      <p className="category-name">
        {HelperStringUppercase(CategoryItem.category)}
      </p>
    </div>
  );
};
