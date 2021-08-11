import React, { useState } from "react";

export const GameContext = React.createContext();

export const GameProvider = (props) => {
  const [games, setGames] = useState([]);
  const [gameCategories, setGameCategories] = useState([]);
  const [categories, setCategories] = useState([]);

  const getGames = () => {
    return fetch("http://localhost:8000/games", {
      headers: {
        Authorization: `Token ${localStorage.getItem("gr_token")}`,
      },
    })
      .then((response) => response.json())
      .then(setGames);
  };

  const getGameById = (game_id) => {
    return fetch(`http://localhost:8000/games/${game_id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("gr_token")}`,
      },
    }).then((response) => response.json());
  };

  const createGame = (game) => {
    return fetch("http://localhost:8000/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("gr_token")}`,
      },
      body: JSON.stringify(game),
    }).then(getGames);
    // .then();
  };

  const editGame = (game) => {
    return fetch(`http://localhost:8000/games/${game.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("gr_token")}`,
      },
      body: JSON.stringify(game),
    }).then(getGames);
  };

  const getGameCategories = () => {
    return fetch("http://localhost:8000/gamecategories", {
      headers: {
        Authorization: `Token ${localStorage.getItem("gr_token")}`,
      },
    })
      .then((res) => res.json())
      .then(setGameCategories);
  };

  const getCategories = () => {
    return fetch("http://localhost:8000/categories", {
      headers: {
        Authorization: `Token ${localStorage.getItem("gr_token")}`,
      },
    })
      .then((res) => res.json())
      .then(setCategories);
  };

  return (
    <GameContext.Provider
      value={{
        games,
        gameCategories,
        getGames,
        createGame,
        getGameCategories,
        getGameById,
        editGame,
        categories,
        getCategories,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};
