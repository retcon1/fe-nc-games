import { useContext, useEffect, useState } from "react";
import {
  fetchComments,
  fetchReviewById,
  postComment,
  updateReviewVotes,
} from "../utils/api";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { ThumbUp, Comment, ThumbDown } from "@mui/icons-material";
import CommentCard from "./CommentCard";
import Loading from "./Loading";
import UserContext from "./UserContext";

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
  const { currentUser } = useContext(UserContext);

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
      const newComment = { username: currentUser.username, body: userComment };
      //needed to not break the map function whilst still giving the user instant feedback
      const currentTime = new Date();
      const instantComment = {
        comment_id: 0,
        author: currentUser.username,
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
      <div className="flex justify-center dark:text-white">
        <Typography>Getting That Review... </Typography>
        <Loading />
      </div>
    );
  }
  return (
    <div className=" bg-light dark:bg-dark">
    <Container className="flex flex-wrap justify-center">
      <Box>
        <Typography
          className="mt-5 flex justify-center dark:text-white"
          variant="h4"
        >
          {singleReview.title}
        </Typography>
        <div className="flex flex-row items-center justify-center my-3">
          <Typography
            className="text-body-color-light font-bold dark:text-white"
            variant="body3"
          >
            {singleReview.designer}
          </Typography>
          <Typography
            className="text-light-accent dark:text-dark-accent ml-4"
            variant="body1"
          >
            {new Date(singleReview.created_at).toLocaleString()}
          </Typography>
        </div>
        <img
          src={singleReview.review_img_url}
          alt={`Review for ${singleReview.title}`}
          className="max-w-screen max-h-lg mx-auto"
        />
        <Typography className="my-5 max-w-1024px text-body-color-light dark:text-white font-serif text-lg">
          {singleReview.review_body}
        </Typography>
      </Box>
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
          <Typography
            className="text-gray-700 dark:text-light-accent"
            variant="p"
          >
            {singleReview.votes + addedVotes} Votes
          </Typography>
          {voteErr ? (
            <Typography className="ml-3 font-bold">{voteErr}</Typography>
          ) : null}
        </div>
      </div>
      <Container className="flex flex-col text-center">
        {singleReview.comment_count === 0 ? (
          <Container className="flex flex-col max-w-lg">
            <Typography className="text-body-color-light font-bold my-2 dark:text-white">
              No Comments... Yet!
            </Typography>
            <TextField
              className="mb-1 dark:bg-light-accent rounded-lg"
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
          </Container>
        ) : (
          <Button
            onClick={handleCommentClick}
            variant="text"
            className="inset-x-0 bottom-0 text-dark-accent"
          >
            <Comment className="text-primary dark:text-dark-accent my-2" /> View
            Comments ({singleReview.comment_count})
          </Button>
        )}
      </Container>
      <Container>
        {commentLoading === "Not Clicked" ? null : commentLoading === true ? (
          <Typography className="dark:text-white">
            Loading Comments...
          </Typography>
        ) : (
          <Container className="flex flex-col max-w-lg">
            <TextField
              className="mb-1 dark:bg-light-accent rounded-lg"
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
              className="bg-light-accent disabled:text-gray-300 m-2 h-12 my-3"
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
          </Container>
        )}
        <Container className="overflow-y-auto max-h-96">
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
        </Container>
      </Container>
    </Container>
    </div>
  );
};

export default SingleReview;
