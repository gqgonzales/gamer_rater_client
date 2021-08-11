import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { GameContext } from "./GameProvider";
import "./game.css";

export const GameDetail = () => {
  const { getGameById } = useContext(GameContext);
  const [game, setGame] = useState({});
  const [categories, setCategories] = useState([]);
  const { game_id } = useParams();
  const history = useHistory();

  useEffect(() => {
    getGameById(game_id).then((game) => setGame(game));
  }, [game_id]);

  useEffect(() => {
    setCategories(game.categories);
  }, [game]);

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
        <button className="btn" onClick={() => history.push("/games")}>
          Return to List
        </button>
      </div>
    </>
  );
};
