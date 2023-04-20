import axios from "axios";

const gameAPI = axios.create({
  baseURL: "https://nc-games-783o.onrender.com/api",
});

export const fetchReviews = async (pageNum) => {
  const response = await gameAPI.get("/reviews", { params: { p: pageNum } });
  return response.data.reviews;
};

export const fetchReviewById = async (id) => {
  const response = await gameAPI.get(`/reviews/${id}`);
  return response.data.review;
};

export const fetchComments = async (id) => {
  const response = await gameAPI.get(`/reviews/${id}/comments`);
  return response.data.comments;
};

export const updateReviewVotes = async (id, voteNum) => {
  const vote = { inc_votes: voteNum };
  const response = await gameAPI.patch(`/reviews/${id}`, vote);
  return response.data.updatedReview;
};
