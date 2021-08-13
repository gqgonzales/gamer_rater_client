import React, { useState } from "react";

export const RatingContext = React.createContext();

export const RatingProvider = (props) => {
  const [ratings, setRatings] = useState([]);

  const getRatings = () => {
    return fetch("http://localhost:8000/gameratings", {
      headers: {
        Authorization: `Token ${localStorage.getItem("gr_token")}`,
      },
    })
      .then((response) => response.json())
      .then(setRatings);
  };

  const createRating = (ratingObj) => {
    return fetch("http://localhost:8000/gameratings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("gr_token")}`,
      },
      body: JSON.stringify(ratingObj),
    }).then(getRatings);
    // .then();
  };

  const getRatingsByGameId = (game_id) => {
    return fetch(`http://localhost:8000/gameratings?game=${game_id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("gr_token")}`,
      },
    }).then((response) => response.json());
  };

  return (
    <RatingContext.Provider
      value={{
        ratings,
        getRatings,
        createRating,
        getRatingsByGameId,
      }}
    >
      {props.children}
    </RatingContext.Provider>
  );
};
