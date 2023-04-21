import axios from "axios";

const gameAPI = axios.create({
  baseURL: "https://nc-games-783o.onrender.com/api",
});

export const fetchReviews = async (pageQuery, catQuery) => {
  const response = await gameAPI.get("/reviews", {
    params: { p: pageQuery, category: catQuery },
  });
  return response.data.reviews;
};

export const fetchReviewById = async (id) => {
  const response = await gameAPI.get(`/reviews/${id}`);
  return response.data.review;
};

export const updateReviewVotes = async (id, voteNum) => {
  const vote = { inc_votes: voteNum };
  const response = await gameAPI.patch(`/reviews/${id}`, vote);
  return response.data.updatedReview;
};

export const fetchComments = async (id) => {
  const response = await gameAPI.get(`/reviews/${id}/comments`);
  return response.data.comments;
};

export const postComment = async (id, newComment) => {
  const response = await gameAPI.post(`/reviews/${id}/comments`, newComment);
  return response.data.postedComment;
};

export const fetchCategories = async () => {
  const response = await gameAPI.get("/categories");
  return response.data;
};
