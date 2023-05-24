import { IconButton, Paper, Typography } from "@mui/material";
import { secondsToTimeString } from "../utils/secondsToTimeString";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteComment } from "../utils/api";
import { useContext, useState } from "react";
import UserContext from "./UserContext";

const CommentCard = ({ author, body, created_at, votes, id }) => {
  const [deletedComment, setDeletedComment] = useState(null);
  const { currentUser } = useContext(UserContext);

  const handleDelete = (event) => {
    event.preventDefault();
    // checks if the id is equal to one that has just been posted, always zero until the refresh updates the database for the user
    if (id === 0) {
      const response = (
        <Paper
          sx={{ maxWidth: 400, margin: "10px" }}
          className="comment_card text-body-color-light"
          elevation={1}
        >
          <Typography>Please Refresh Before Deleting!</Typography>
        </Paper>
      );
      setDeletedComment(response);
    }
    deleteComment(id).then(() => {
      const response = (
        <Paper
          sx={{ maxWidth: 400, margin: "10px" }}
          className="comment_card text-body-color-light ml-2"
          elevation={1}
        >
          <Typography>Comment Deleted!</Typography>
        </Paper>
      );
      setDeletedComment(response);
    });
  };

  //works out time difference between now and when comment was posted
  let formattedDiff = "";
  const currentDate = new Date();
  const pastDate = new Date(created_at);
  const timeDiff = Math.abs(currentDate.getTime() - pastDate.getTime());
  const diffSeconds = Math.ceil(timeDiff / 1000);
  //if the time difference is less than a minute, says Just Now
  if (timeDiff < 60000) {
    formattedDiff = "Just Now";
  } else {
    formattedDiff = secondsToTimeString(diffSeconds) + " ago";
  }

  if (deletedComment) {
    return deletedComment;
  }
  return (
    <Paper
      className="max-w-md my-5 mx-auto p-4 rounded-md shadow-md bg-white relative"
      elevation={1}
    >
      <Typography variant="body1" className="font-bold">
        {id}
      </Typography>
      <Typography variant="body1" className="font-bold">
        {author}
      </Typography>
      {author === currentUser.username && (
        <IconButton onClick={handleDelete} className="absolute top-2 right-2">
          <DeleteIcon />
        </IconButton>
      )}
      <Typography variant="body2" className="mt-2 text-gray-700 ">
        {body}
      </Typography>
      <div className="flex justify-between items-center mt-4">
        <Typography variant="caption" className="text-gray-500">
          {formattedDiff}
        </Typography>
        <Typography variant="caption" className="font-bold">
          {votes} votes
        </Typography>
      </div>
    </Paper>
  );
};
//TODO add upvote button to comments
//TODO IMPLEMENT DARK MODE ACROSS SITE dark:bg-gray-800 relative
export default CommentCard;
