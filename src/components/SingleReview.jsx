import { useEffect, useState } from "react";
import { fetchComments, fetchReviewById } from "../api";
import { useParams } from "react-router-dom";
import { Button, IconButton, Paper, Typography } from "@mui/material";
import { ThumbUp, Comment, ThumbDown } from "@mui/icons-material";
import CommentCard from "./CommentCard";

const SingleReview = () => {
  const [singleReview, setSingleReview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    fetchReviewById(id).then((data) => {
      setSingleReview(data);
      setIsLoading(false);
    });
  }, []);

  const handleCommentClick = () => {
    fetchComments(id).then((data) => {
      setComments(data);
    });
  };

  if (isLoading) {
    return <Typography>Getting That Review...</Typography>;
  }
  return (
    <div className="flex justify-center">
      <Paper
        className="flex flex-wrap max-w-screen-xl justify-center"
        elevation={0}
      >
        <Typography className="mt-5 flex justify-center" variant="h4">
          {singleReview.title}
        </Typography>
        <div className="flex justify-between items-center">
          <Typography className="text-gray-500" variant="body3">
            {singleReview.designer}
          </Typography>
          <Typography className="text-gray-500 ml-5" variant="body1">
            {new Date(singleReview.created_at).toLocaleString()}
          </Typography>
        </div>
        <img
          src={singleReview.review_img_url}
          alt={`Review for ${singleReview.title}`}
          className="w-auto h-auto"
        />
        <Typography className="my-5 max-w-1024px" variant="p">
          {singleReview.review_body}
        </Typography>
        <div className="flex justify-between w-full">
          <div className="flex items-center">
            <IconButton>
              <ThumbUp className="text-green-500 mr-2" />
            </IconButton>
            <IconButton>
              <ThumbDown className="text-red-500 mr-2" />
            </IconButton>
            <Typography className="text-gray-700" variant="p">
              {singleReview.votes} Votes
            </Typography>
          </div>
        </div>
        <div className="">
          <Button
            onClick={handleCommentClick}
            variant="text"
            className="inset-x-0 bottom-0 text-red-700"
          >
            <Comment className="text-red-500 mr-1" /> View Comments (
            {singleReview.comment_count})
          </Button>
        </div>
        <div>
          {comments.length === 0
            ? null
            : comments.map((comment) => (
                <CommentCard
                  key={comment.comment_id}
                  body={comment.body}
                  votes={comment.votes}
                  author={comment.author}
                  created_at={new Date(comment.created_at).toLocaleString()}
                />
              ))}
        </div>
      </Paper>
    </div>
  );
};

export default SingleReview;
