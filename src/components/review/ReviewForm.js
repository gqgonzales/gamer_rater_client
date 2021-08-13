import React, { useContext, useState, useEffect } from "react";
import { GameContext } from "../game/GameProvider.js";
import { useHistory, useParams } from "react-router-dom";
// import { CategoryContext } from "../category/CategoryProvider.js";
import { ReviewContext } from "./ReviewProvider.js";

export const ReviewForm = () => {
  const history = useHistory();
  const { game_id } = useParams();
  const { getGameById } = useContext(GameContext);
  // const { getCategories, categories } = useContext(CategoryContext);
  const { createReview } = useContext(ReviewContext);

  useEffect(() => {
    getGameById(game_id).then((game) => {
      setGame(game);
    });
  }, [game_id]);

  const [currentReview, setCurrentReview] = useState({
    title: "",
    review: "",
    game: parseInt(game_id),
    player: localStorage.getItem("gr_token"),
  });
  const [game, setGame] = useState([]);

  const handleControlledInputChange = (event) => {
    const newReviewState = { ...currentReview };
    newReviewState[event.target.name] = event.target.value;
    setCurrentReview(newReviewState);
  };

  return (
    <form className="review-form">
      {/* -------------- TITLE --------------*/}
      <h2 className="review-form__name">Write a review for {game.title}</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            required
            autoFocus
            className="form-control"
            value={currentReview.title}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      {/* -------------- REVIEW --------------*/}
      <fieldset>
        <div className="form-group">
          <label htmlFor="review">Write your review: </label>
          <textarea
            type="textarea"
            name="review"
            required
            // autoFocus
            className="form-control"
            value={currentReview.review}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <button
        type="submit"
        onClick={(evt) => {
          // Prevent form from being submitted
          evt.preventDefault();

          const review = {
            title: currentReview.title,
            review: currentReview.review,
            game: parseInt(game_id),
            player: localStorage.getItem("gr_token"),
          };

          createReview(review).then(() => history.push("/games"));
        }}
        className="btn btn-primary btn-2"
      >
        Save review!
      </button>
    </form>
  );
};
