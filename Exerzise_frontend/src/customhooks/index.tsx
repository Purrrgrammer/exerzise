import { useState } from "react";

export const useAuth = () => {
  const isCoach = () => {
    if (JSON.parse(localStorage.getItem("user")!)) {
      return true;
    } else {
      return false;
    }
  };

  const getToken = () => {
    if (JSON.parse(localStorage.getItem("token")!)) {
      const currentToken = localStorage.getItem("token");
      return currentToken;
    } else {
      return "coach";
    }
  };

  const [roleCoach, _setRoleCoach] = useState(isCoach());
  const [token, _setToken] = useState(getToken());
  return { roleCoach, token };
};
