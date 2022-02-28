import axios from "axios";

export const useRequest = (url) => {
  const performRequest = (method, body) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios[method](url, body);
        resolve(data);
      } catch (err) {
        reject(err.response && err.response.data);
      }
    });
  };

  return performRequest;
};
