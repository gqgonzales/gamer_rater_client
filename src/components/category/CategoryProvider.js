import React, { useState } from "react";

export const CategoryContext = React.createContext();

export const CategoryProvider = (props) => {
  const [games, setGames] = useState([]);
  const [gameCategories, setGameCategories] = useState([]);
  const [categories, setCategories] = useState([]);

  const getCategories = () => {
    return fetch("http://localhost:8000/categories", {
      headers: {
        Authorization: `Token ${localStorage.getItem("gr_token")}`,
      },
    })
      .then((res) => res.json())
      .then(setCategories);
  };

  const getCategoryById = (category_id) => {
    return fetch(`http://localhost:8000/categories/${category_id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("gr_token")}`,
      },
    }).then((response) => response.json());
  };

  return (
    <CategoryContext.Provider
      value={{
        games,
        gameCategories,
        categories,
        getCategories,
        getCategoryById,
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};
