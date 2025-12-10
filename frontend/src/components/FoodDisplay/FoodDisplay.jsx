import React, {useContext} from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({category }) => {
    const {food_list} = useContext(StoreContext);
    return(
        <div className="food-display" id="food-display">
            <h2>Top Dishes near you</h2>
            <div className="food-display-list">
                {food_list.map((food_item, index) => {
                    return <FoodItem key={index} id={food_item._id} name={food_item.name} description={food_item.description} price={food_item.price} image={food_item.image}/>
                })}
            </div>
        </div>
    )

}

export default FoodDisplay;