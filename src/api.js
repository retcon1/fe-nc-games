import axios from "axios";

const gameAPI = axios.create({
  baseURL: "https://nc-games-783o.onrender.com/api",
});

export const fetchReviews = async (pageNum) => {
  const response = await gameAPI.get("/reviews", {params: {p: pageNum}});
  console.log(response.data);
  return response.data.reviews;
};
