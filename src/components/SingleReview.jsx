import { useEffect, useState } from "react";
import {
  fetchComments,
  fetchReviewById,
  postComment,
  updateReviewVotes,
} from "../utils/api";
import { useParams } from "react-router-dom";
import {
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { ThumbUp, Comment, ThumbDown } from "@mui/icons-material";
import CommentCard from "./CommentCard";

const SingleReview = () => {
  const [singleReview, setSingleReview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState("Not Clicked");
  const [comments, setComments] = useState([]);
  const [userComment, setUserComment] = useState("");
  const [disableCommentButton, setDisableCommentButton] = useState(false);
  const [addedVotes, setAddedVotes] = useState(0);
  const [voteErr, setVoteErr] = useState(false);
  const [commentErr, setCommentErr] = useState(false);
  const { id } = useParams();

  const handleCommentClick = (event) => {
    event.preventDefault();
    setCommentLoading(true);
    fetchComments(id).then((data) => {
      setComments(data);
      setCommentLoading(false);
    });
  };

  const handleCommentSubmit = (event) => {
    setDisableCommentButton(true);
    event.preventDefault();
    if (userComment === "") {
      setDisableCommentButton(false);
    } else {
      const newComment = { username: "guest", body: userComment };
      //needed to not break the map function whilst still giving the user instant feedback
      const currentTime = new Date();
      const instantComment = {
        comment_id: 0,
        author: "guest",
        body: userComment,
        votes: 0,
        created_at: currentTime.toISOString(),
      };
      setUserComment("");
      setComments([instantComment, ...comments]);
      postComment(id, newComment).catch(() => {
        setComments([...comments]);
        setCommentErr("Sorry that wasn't posted, please try again later!");
      });
    }
  };

  const handleVote = (voteNum) => {
    //checks if user has downvoted and balances out by adding 2 instead
    if (Math.sign(addedVotes) === -1) {
      setAddedVotes(1);
      voteNum = 2;
    }
    //same as above, balances out by minusing 2 if user accidentally upvoted
    else if (addedVotes === 1) {
      setAddedVotes(-1);
      voteNum = -2;
    } else {
      setAddedVotes(voteNum);
    }
    updateReviewVotes(id, voteNum).catch(() => {
      setVoteErr("Sorry, that didn't go through!");
      setAddedVotes(0);
    });
  };

  useEffect(() => {
    setIsLoading(true);
    fetchReviewById(id).then((data) => {
      setSingleReview(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
    <Typography>Getting That Review...</Typography>
    );
  }
  return (
    <div className="flex justify-center">
      <Paper
        className="flex flex-wrap max-w-screen-xl justify-center  bg-light"
        elevation={0}
      >
        <Typography className="mt-5 flex justify-center" variant="h4">
          {singleReview.title}
        </Typography>
        <div className="flex justify-between items-center">
          <Typography className="text-body-color-light font-bold" variant="body3">
            {singleReview.designer}
          </Typography>
          <Typography className="text-light-accent ml-5" variant="body1">
            {new Date(singleReview.created_at).toLocaleString()}
          </Typography>
        </div>
        <img
          src={singleReview.review_img_url}
          alt={`Review for ${singleReview.title}`}
          className="w-auto h-auto"
        />
        <Typography className="my-5 max-w-1024px text-body-color-light font-serif text-lg" variant="p">
          {singleReview.review_body}
        </Typography>
        <div className="flex justify-between w-full">
          <div className="flex items-center">
            <IconButton
              onClick={(event) => {
                handleVote(1);
              }}
              disabled={addedVotes > 0}
              className="text-success mr-1 disabled:text-gray-300"
            >
              <ThumbUp />
            </IconButton>
            <IconButton
              onClick={(event) => {
                handleVote(-1);
              }}
              disabled={Math.sign(addedVotes) === -1}
              className="text-danger mr-2 disabled:text-gray-300"
            >
              <ThumbDown />
            </IconButton>
            <Typography className="text-gray-700" variant="p">
              {singleReview.votes + addedVotes} Votes
            </Typography>
            {voteErr ? (
              <Typography className="ml-3 font-bold">{voteErr}</Typography>
            ) : null}
          </div>
        </div>

        <div className="view_comments">
          {singleReview.comment_count === 0 ? (
            <div className="flex justify-center">
              <Typography className="text-body-color-light my-2">
                No Comments... Yet!
              </Typography>
              <TextField
                className="ml-1 mb-1"
                multiline
                rows={4}
                value={userComment}
                label="Add Comment"
                onChange={(event) => {
                  setUserComment(event.target.value);
                }}
              />
              <Button
                variant="contained"
                className="bg-light-accent disabled:text-gray-300 m-2 h-12"
                onClick={handleCommentSubmit}
                disabled={disableCommentButton}
              >
                Post Comment
              </Button>
            </div>
          ) : (
            <Button
              onClick={handleCommentClick}
              variant="text"
              className="inset-x-0 bottom-0 text-dark-accent"
            >
              <Comment className="text-primary mr-1" /> View Comments (
              {singleReview.comment_count})
            </Button>
          )}
        </div>
        <div>
          {commentLoading === "Not Clicked" ? null : commentLoading === true ? (
            <Typography>Loading Comments...</Typography>
          ) : (
            <div className="flex justify-center">
              <TextField
                className="ml-1"
                multiline
                rows={4}
                value={userComment}
                label="Add Comment"
                onChange={(event) => {
                  setUserComment(event.target.value);
                }}
              />
              <Button
                variant="contained"
                className="bg-light-accent disabled:text-gray-300 m-2 h-12"
                onClick={handleCommentSubmit}
                disabled={disableCommentButton}
              >
                Post Comment
              </Button>
              {commentErr ? (
                <Typography className="my-3 font-bold text-warning">
                  {commentErr}
                </Typography>
              ) : null}
            </div>
          )}
          {comments.map((comment) => (
            <CommentCard
              key={comment.comment_id}
              body={comment.body}
              votes={comment.votes}
              author={comment.author}
              created_at={comment.created_at}
              id={comment.comment_id}
            />
          ))}
        </div>
      </Paper>
    </div>
  );
};

export default SingleReview;
