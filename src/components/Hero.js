const Hero = ({ name, description, picture }) => {
  return (
    <div className="Hero">
      <div className="RestaurantInfos--center">
        <div className="restaurant-info">
          <h1>{name}</h1>
          <p>{description}</p>
        </div>
        <img src={picture} alt={name} />
      </div>
    </div>
  );
};

export default Hero;
