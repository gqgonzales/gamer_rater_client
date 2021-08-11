import React, { useContext, useState, useEffect } from "react";
import { GameContext } from "./GameProvider.js";
import { useHistory, useParams } from "react-router-dom";
import "./game.css";

export const GameForm = () => {
  const history = useHistory();
  const { game_id } = useParams();
  const { createGame, getCategories, categories, getGameById, editGame } =
    useContext(GameContext);

  /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
  const [currentGame, setCurrentGame] = useState({
    title: "",
    designer: "",
    description: "",
    number_of_players: 0,
    year_released: 0,
    duration: "",
    age_rec: 0,
    categories: [],
  });

  /*
        Get game types on initialization so that the <select>
        element presents game type choices to the user.
    */
  useEffect(() => {
    getCategories();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (game_id) {
      getGameById(game_id).then((game) => {
        setCurrentGame({
          title: game.title,
          designer: game.designer,
          description: game.description,
          number_of_players: game.number_of_players,
          year_released: game.year_released,
          duration: game.duration,
          age_rec: game.age_rec,
          categories: game.categories,
        });
      });
    }
  }, [game_id]);

  const handleControlledInputChange = (event) => {
    //When changing a state object or array,
    //always create a copy make changes, and then set state.
    const newGameState = { ...currentGame };
    newGameState[event.target.name] = event.target.value;
    setCurrentGame(newGameState);
  };

  return (
    <form className="gameForm">
      {/* -------------- TITLE --------------*/}
      <h2 className="gameForm__name">
        {game_id ? "Edit This Game" : "Register New Game"}
      </h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            required
            autoFocus
            className="form-control"
            value={currentGame.title}
            onChange={handleControlledInputChange}
            // onChange={changeGamenameState}
          />
        </div>
      </fieldset>
      {/* You create the rest of the input fields for each game property */}
      {/* -------------- DESIGNER --------------*/}
      <fieldset>
        <div className="form-group">
          <label htmlFor="designer">Designer: </label>
          <input
            type="text"
            name="designer"
            required
            // autoFocus
            className="form-control"
            value={currentGame.designer}
            onChange={handleControlledInputChange}
            // onChange={changeGameMakerState}
          />
        </div>
      </fieldset>
      {/* -------------- DESCRIPTION --------------*/}
      <fieldset>
        <div className="form-group">
          <label htmlFor="description">Description: </label>
          <input
            type="text"
            name="description"
            required
            // autoFocus
            className="form-control"
            value={currentGame.description}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      {/* -------------- NUMBER OF PLAYERS --------------*/}
      <fieldset>
        <div className="form-group">
          <label htmlFor="number_of_players">Number Of Players: </label>
          <input
            type="number"
            name="number_of_players"
            required
            className="form-control"
            value={currentGame.number_of_players}
            onChange={handleControlledInputChange}
            // onChange={changeGamePlayersState}
          />
        </div>
      </fieldset>
      {/* -------------- RELEASE YEAR --------------*/}
      <fieldset>
        <div className="form-group">
          <label htmlFor="year_released">Release Year: </label>
          <input
            type="number"
            name="year_released"
            required
            // autoFocus
            className="form-control"
            value={currentGame.year_released}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      {/* -------------- DURATION --------------*/}
      <fieldset>
        <div className="form-group">
          <label htmlFor="duration">Estimated Duration (in minutes): </label>
          <input
            type="text"
            name="duration"
            required
            // autoFocus
            className="form-control"
            value={currentGame.duration}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      {/* -------------- AGE REC --------------*/}
      <fieldset>
        <div className="form-group">
          <label htmlFor="age_rec">Age Recommendation: </label>
          <input
            type="number"
            name="age_rec"
            required
            // autoFocus
            className="form-control"
            value={currentGame.age_rec}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      {/* -------------- CATEGORY --------------*/}
      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Game Category: </label>
          <select
            name="categories"
            required
            autoFocus
            className="form-control"
            value={currentGame.categories}
            onChange={handleControlledInputChange}
          >
            <option value="0">Select a Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      {/* -------------- BUTTONS -------------- */}
      {game_id ? (
        <button
          type="submit"
          onClick={(evt) => {
            // Prevent form from being submitted
            evt.preventDefault();

            const game = {
              id: parseInt(game_id),
              title: currentGame.title,
              designer: currentGame.designer,
              description: currentGame.description,
              number_of_players: parseInt(currentGame.number_of_players),
              year_released: parseInt(currentGame.year_released),
              duration: currentGame.duration,
              age_rec: parseInt(currentGame.age_rec),
              categories: currentGame.categories,
            };

            // Send POST request to your API
            editGame(game).then(() => history.push("/games"));
          }}
          className="btn btn-primary btn-2"
        >
          Save Edit
        </button>
      ) : (
        <button
          type="submit"
          onClick={(evt) => {
            // Prevent form from being submitted
            evt.preventDefault();

            const game = {
              title: currentGame.title,
              designer: currentGame.designer,
              description: currentGame.description,
              number_of_players: parseInt(currentGame.number_of_players),
              year_released: parseInt(currentGame.year_released),
              duration: currentGame.duration,
              age_rec: parseInt(currentGame.age_rec),
              categories: currentGame.categories,
            };

            // Send POST request to your API
            createGame(game).then(() => history.push("/games"));
          }}
          className="btn btn-primary btn-2"
        >
          Create Game
        </button>
      )}
      {/* -------------- END TERNARY -------------- */}
    </form>
  );
};
