import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Category from "./components/Category";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faPlusCircle,
  faMinusCircle,
} from "@fortawesome/free-solid-svg-icons";
import Header from "./components/Header";
import Hero from "./components/Hero";

library.add(faStar, faPlusCircle, faMinusCircle);

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [carts, setCarts] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [shipping, setShipping] = useState(2.5);

  const url = "https://site--backend-deliveroo--t9jv7l54vjwq.code.run/";

  const fetchData = async () => {
    const response = await axios.get(url);
    // console.log(response.data);
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddToCart = (item) => {
    const newCarts = [...carts];
    let myItem = newCarts.find((el) => el.id === item.id);

    if (myItem) {
      myItem.count += 1;
    } else {
      myItem = item;
      newCarts.push(myItem);
    }
    setCarts(newCarts);

    /* Calcul */
    setSubTotal(subTotal + myItem.price);
    setTotal(total + myItem.price);
    setShipping(shipping);
  };

  const handleMinusToCart = (item) => {
    const newCarts = [...carts];
    const myItem = newCarts.find((el) => el.id === item.id);

    if (myItem) {
      myItem.count -= 1;

      /* Calcul */
      setSubTotal(subTotal - myItem.price);
      setTotal(total - myItem.price);

      if (myItem.count < 1) {
        const index = newCarts.findIndex((el) => el.id === item.id);
        newCarts.splice(index, 1);
        setCarts(newCarts);
      }
    }

    setCarts(newCarts);
  };

  /*
  const totalItem = () => {
    return ((1 * 100) / 100).toFixed(2);
  };
  */

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <>
      <Header />
      <Hero
        name={data.restaurant.name}
        description={data.restaurant.description}
        picture={data.restaurant.picture}
      />

      <main className="RestaurantInfos">
        <div className="Content">
          <div className="Content--center">
            <div className="Menu">
              {data.categories.slice(0, 2).map((category, index) => {
                // console.log("cat : ", category);
                if (category.meals.length < 1) return null;
                return (
                  <Category
                    key={index}
                    category={category}
                    handleAddToCart={handleAddToCart}
                  />
                );
              })}
            </div>

            {/* cart */}
            <div className="cart">
              {/* Cart--card */}
              <div className="Cart--card">
                <button
                  className={
                    carts.length > 0
                      ? "Cart--validate"
                      : "Cart--validate Cart--disabled"
                  }
                >
                  Valider mon panier
                </button>

                <div className="Cart-container">
                  <div className="Cart--items">
                    {carts.map((el, index) => {
                      //return si count === 0
                      if (el.count < 1) return null;

                      return (
                        <div className="Cart--line" key={index}>
                          <div className="Cart--counter">
                            <span
                              onClick={() => {
                                handleMinusToCart(el);
                              }}
                            >
                              <FontAwesomeIcon
                                icon="minus-circle"
                                className="Cart--circle"
                              />
                            </span>
                            <span>{el.count}</span>
                            <span
                              onClick={() => {
                                handleAddToCart(el);
                              }}
                            >
                              <FontAwesomeIcon
                                icon="plus-circle"
                                className="Cart--circle"
                              />
                            </span>
                          </div>
                          <span>{el.title}</span>
                          <span>{(el.count * el.price).toFixed(2)} €</span>
                        </div>
                      );
                    })}
                  </div>

                  {carts.length !== 0 ? (
                    <div className="Cart-minus-cart-container">
                      <div className="Cart--results">
                        <div className="Cart--result-line">
                          <span className="Cart--result-name">Sous-total</span>
                          <span>{subTotal.toFixed(2)} €</span>
                        </div>

                        <div className="Cart--result-line">
                          <span className="Cart--result-name">
                            Frais de livraison
                          </span>
                          <span>{shipping.toFixed(2)} €</span>
                        </div>
                      </div>

                      <div className="Cart--total">
                        <span className="Cart--result-name">Total</span>
                        <span>{(total + shipping).toFixed(2)} €</span>
                      </div>
                    </div>
                  ) : (
                    <div className="Cart--empty">Votre panier est vide</div>
                  )}
                </div>
                {/* Cart--card */}
              </div>
            </div>
            {/* card */}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
