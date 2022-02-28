import axios from "axios";

export const buildClient = ({ req }) => {
  if (typeof window === "undefined") {
    // server
    return axios.create({
      headers: req.headers,
    });
  } else {
    return axios.create();
  }
};
