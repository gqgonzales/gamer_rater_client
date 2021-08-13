import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { GameContext } from "./GameProvider";
import { ReviewContext } from "../review/ReviewProvider";
import "./game.css";

export const GameDetail = () => {
  const { getGameById } = useContext(GameContext);
  const { getReviewsByGameId } = useContext(ReviewContext);

  const [game, setGame] = useState({});
  const [categories, setCategories] = useState([]);
  const [reviews, setReviews] = useState([]);

  const { game_id } = useParams();
  const history = useHistory();

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

  return (
    <>
      <div className="detail--container">
        <h2>{game.title}</h2>
        <h4>Created by {game.designer}</h4>
        <div>{game.description}</div>
        <br></br>
        <div>
          Year realeased: <b>{game.year_released}</b>
        </div>
        <div>
          Max ammount of players: <b>{game.number_of_players}</b>
        </div>
        <div>
          Estimated time of play: <b>{game.duration}</b>
        </div>
        <div>
          Age Recommendation: <b>{game.age_rec}</b>
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
          {reviews.length > 0
            ? reviews?.map((review) => (
                <div key={`category-id-${review.id}`}>– {review.title}</div>
              ))
            : "– No reviews yet! Why don't you write one?"}
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
