import React from "react";
import { Route } from "react-router-dom";
import { GameList } from "./game/GameList";
import { GameProvider } from "./game/GameProvider";
import { GameForm } from "./game/GameForm.js";
import { GameDetail } from "./game/GameDetail";
import { CategoryProvider } from "./category/CategoryProvider";
import { ReviewProvider } from "./review/ReviewProvider";
import { ReviewForm } from "./review/ReviewForm";
import { RatingProvider } from "./rating/RatingProvider";

export const ApplicationViews = () => {
  return (
    <>
      <main
        style={{
          margin: "5rem 2rem",
          lineHeight: "1.75rem",
        }}
      >
        <GameProvider>
          <CategoryProvider>
            <ReviewProvider>
              <RatingProvider>
                <Route exact path="/">
                  <GameList />
                </Route>

                <Route exact path="/games">
                  <GameList />
                </Route>

                <Route exact path="/games/new">
                  <GameForm />
                </Route>

                <Route exact path="/games/:game_id(\d+)/edit">
                  <GameForm />
                </Route>

                <Route exact path="/games/:game_id(\d+)/detail">
                  <GameDetail />
                </Route>

                <Route exact path="/games/:game_id(\d+)/review">
                  <ReviewForm />
                </Route>
              </RatingProvider>
            </ReviewProvider>
          </CategoryProvider>
        </GameProvider>
      </main>
    </>
  );
};
