import axios from "axios";

export const api = () => {
  return axios.create({
    headers: {
      "Content-Type": "application/json",
    },
  });
};
