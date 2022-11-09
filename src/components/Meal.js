import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Meal = ({ meal, handleAddToCart }) => {
  //   console.log(meal);
  return (
    <div
      className="MenuItem"
      onClick={() => {
        const item = {
          id: meal.id,
          title: meal.title,
          price: Number(meal.price),
          count: 1,
        };
        handleAddToCart(item);
      }}
    >
      <div className="MenuItem--card">
        <div className="MenuItem--texts">
          <h3>{meal.title}</h3>
          <p>{meal.description}</p>
          <div className="MenuItem--infos">
            <span className="MenuItem--price">{meal.price} €</span>

            {meal.popular && (
              <span className="MenuItem--popular">
                <FontAwesomeIcon icon="star" /> Polulaire
              </span>
            )}
          </div>
        </div>
        {meal.picture && (
          <div className="MenuItem--picture">
            <img src={meal.picture} alt="menu" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Meal;
