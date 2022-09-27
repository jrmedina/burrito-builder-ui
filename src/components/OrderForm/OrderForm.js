import React, { useState } from "react";

const OrderForm = () => {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    let missingInput = !name ? 'name' : 'ingredient';
    e.preventDefault();
    name && ingredients.length ? postIt() : setError((`Looks like you are missing a ${missingInput}`))
    clearInputs();
  };

  const postIt = () => {
    return fetch("http://localhost:3001/api/v1/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, ingredients: ingredients }),
    }).then((res) => res.json());
  };

  const clearInputs = () => {
    setName("");
    setIngredients([]);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setIngredients([...ingredients, e.target.value]);
  };

  const possibleIngredients = [
    "beans",
    "steak",
    "carnitas",
    "sofritas",
    "lettuce",
    "queso fresco",
    "pico de gallo",
    "hot sauce",
    "guacamole",
    "jalapenos",
    "cilantro",
    "sour cream",
  ];

  const ingredientButtons = possibleIngredients.map((ingredient) => {
    return (
      <button
        key={ingredient}
        name={ingredient}
        value={ingredient}
        onClick={(e) => handleClick(e)}
      >
        {ingredient}
      </button>
    );
  });

  return (
    <form>
      {ingredientButtons}
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {ingredientButtons}

      <p>Order: {ingredients.join(", ") || "Nothing selected"}</p>

      <button className="submit" onClick={(e) => handleSubmit(e)}>
        Submit Order
      </button>
      <p className="error">{error}</p>
    </form>
  );
};

export default OrderForm;
