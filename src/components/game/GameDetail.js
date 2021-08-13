import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { GameContext } from "./GameProvider";
import { ReviewContext } from "../review/ReviewProvider";
import { RatingContext } from "../rating/RatingProvider";
import "./game.css";

export const GameDetail = () => {
  const { getGameById } = useContext(GameContext);
  const { getReviewsByGameId } = useContext(ReviewContext);
  const { createRating, getRatingsByGameId } = useContext(RatingContext);

  const { game_id } = useParams();
  const history = useHistory();

  const [game, setGame] = useState({});
  const [categories, setCategories] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState({
    rating: 0,
    game: game_id,
  });

  useEffect(() => {
    getGameById(game_id).then((game) => setGame(game));
  }, [game_id]);

  useEffect(() => {
    setCategories(game.categories);
  }, [game]);

  useEffect(() => {
    getReviewsByGameId(game_id).then((game) => {
      setReviews(game);
    });
  }, [game_id]);

  useEffect(() => {
    getRatingsByGameId(game_id);
  }, [game_id]);

  // useEffect(() => {
  //   getGameById(game_id).then((game) => setGame(game));
  // }, [averageRating]);

  const handleControlledInputChange = (event) => {
    const ratingState = { ...rating };
    ratingState[event.target.name] = event.target.value;
    setRating(ratingState);
  };

  return (
    <>
      <div className="detail--container">
        <h2>{game.title}</h2>
        <div>
          Created by <b>{game.designer}</b> in <b>{game.year_released}</b>
        </div>
        <div>{game.description}</div>
        <br></br>
        <div>
          Max amount of players: <b>{game.number_of_players}</b>
        </div>
        <div>
          Estimated play time: <b>{game.duration}</b>
        </div>
        <div>
          Age Recommendation: <b>{game.age_rec}+</b>
        </div>
        <div className="game_ratings">
          Average Rating: <b>{Math.round(game.average_rating)}/10 Joysticks</b>
        </div>
        <div className="game_rating">
          Rate This Game:
          <input
            type="range"
            name="rating"
            min="1"
            max="10"
            value={rating.rating}
            onChange={handleControlledInputChange}
          />
          <div>{game.rating}</div>
          <button
            className="btn"
            onClick={(event) => {
              event.preventDefault();
              createRating(rating);
              // .then(() => {
              //   history.push(`/games/${game_id}/detail`);
              // });
              window.location.reload();
            }}
          >
            Save Rating
          </button>
        </div>
        <br></br>
        <div>
          Categories:{" "}
          {categories?.map((category) => (
            <div key={`category-id-${category.id}`}>– {category.label}</div>
          ))}
        </div>
        <br></br>
        <div>Reviews: </div>
        <div className="reviews-ternary">
          {reviews.length > 0 ? (
            reviews?.map((review) => (
              <div key={`category-id-${review.id}`}>– {review.title}</div>
            ))
          ) : (
            <div className="reviews-none">
              No reviews yet! Why don't you write one?
            </div>
          )}
        </div>
        <button
          className="btn"
          onClick={() => history.push(`/games/${game_id}/review`)}
        >
          Review Game
        </button>
        <button className="btn" onClick={() => history.push("/games")}>
          Return to List
        </button>
      </div>
    </>
  );
};
