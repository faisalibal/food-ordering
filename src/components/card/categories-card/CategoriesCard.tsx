import { useState } from "react";
import { CategoriesDTO } from "../../../DTO/CategoriesDTO";
import "./CategoriesCard.css";

type CategoryType = {
  CategoryItem: CategoriesDTO;
};

export const CategoriesCard = ({ CategoryItem }: CategoryType) => {
  const [onChoice, setChoice] = useState(false);

  return (
    <div className="category-card">
      <div className="category-image">
        <img src={CategoryItem.image} alt="category-image" />
      </div>
      <p className="category-name">{CategoryItem.categoryName}</p>
    </div>
  );
};
