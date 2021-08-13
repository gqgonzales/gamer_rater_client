import React, { useState } from "react";

export const ReviewContext = React.createContext();

export const ReviewProvider = (props) => {
  const [reviews, setReviews] = useState([]);

  const getReviews = () => {
    return fetch("http://localhost:8000/gamereviews", {
      headers: {
        Authorization: `Token ${localStorage.getItem("gr_token")}`,
      },
    })
      .then((response) => response.json())
      .then(setReviews);
  };

  const getReviewById = (review_id) => {
    return fetch(`http://localhost:8000/gamereviews/${review_id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("gr_token")}`,
      },
    }).then((response) => response.json());
  };

  const createReview = (reviewObj) => {
    return fetch("http://localhost:8000/gamereviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("gr_token")}`,
      },
      body: JSON.stringify(reviewObj),
    })
    // .then(getReviews);
    // .then();
  };

  const getReviewsByGameId = (game_id) => {
    return fetch(`http://localhost:8000/gamereviews?game=${game_id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("gr_token")}`,
      },
    }).then((response) => response.json());
  };

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        getReviews,
        createReview,
        getReviewById,
        getReviewsByGameId,
      }}
    >
      {props.children}
    </ReviewContext.Provider>
  );
};
