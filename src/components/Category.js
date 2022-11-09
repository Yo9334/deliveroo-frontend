import Meal from "./Meal";

const Category = ({ category, handleAddToCart }) => {
  return (
    <div className="MenuItems">
      <h2>{category.name}</h2>

      <div className="MenuItems--items">
        {category.meals.map((meal, index) => {
          // console.log("pict : ", meal.picture);
          return (
            <Meal key={meal.id} meal={meal} handleAddToCart={handleAddToCart} />
          );
        })}
      </div>
    </div>
  );
};

export default Category;
