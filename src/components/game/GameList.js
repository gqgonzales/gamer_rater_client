import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { GameContext } from "./GameProvider.js";
import { Link } from "react-router-dom";
import "./game.css";

export const GameList = (props) => {
  const { games, getGames } = useContext(GameContext);
  const history = useHistory();

  useEffect(() => {
    getGames();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <button
        className="btn btn-2 btn-sep icon-create"
        onClick={() => {
          history.push({ pathname: "/games/new" });
        }}
      >
        Register New Game
      </button>
      <br></br>
      <article className="games">
        {games.map((game) => {
          return (
            <div key={`game--${game.id}`} className="game">
              <div className="game__title">
                <Link className="game__link" to={`/games/${game.id}/detail`}>
                  {game.title}
                </Link>{" "}
                by {game.designer}
              </div>
              <div className="game__players">
                {game.number_of_players} players needed
              </div>
              <div className="game__duration">
                Estimated game time: {game.duration}
              </div>
              <div className="game__edit">
                <button
                  className="btn btn-3"
                  onClick={() => history.push(`/games/${game.id}/edit`)}
                >
                  Edit Game
                </button>
              </div>
              {/* -------------- REVIEW BUTTON --------------*/}
              <button
                className="btn"
                onClick={() => history.push(`/games/${game.id}/review`)}
              >
                Write a Review
              </button>
            </div>
          );
        })}
      </article>
    </>
  );
};
