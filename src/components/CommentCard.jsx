import { Paper, Typography } from "@mui/material";
import { secondsToTimeString } from "../utils/secondsToTimeString";

const CommentCard = ({ author, body, created_at, votes }) => {
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
  return (
    <Paper
      sx={{ maxWidth: 300, margin: "10px" }}
      className="comment_card"
      elevation={1}
    >
      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        {author}
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: "10px" }}>
        {body}
      </Typography>
      <div className="flex justify-between items-center">
        <Typography variant="caption">{formattedDiff}</Typography>
        <Typography variant="caption" className="font-bold ">
          {votes} votes
        </Typography>
      </div>
    </Paper>
  );
};

export default CommentCard;
