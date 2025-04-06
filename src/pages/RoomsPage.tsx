import React from "react";
import { checkAndCreateUser } from "../firebase/checkAndCreateUser";
import GameScoreChart from "../components/LineChart";
import { User } from "../TypeDefinition/User";

export const RoomsPage = (user: User): React.ReactElement => {
  checkAndCreateUser(user.id, {
    email: user.emailAddress,
    displayName: user.username ?? user.fullName ?? "",
  });

  return <GameScoreChart />;
};
