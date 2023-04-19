import { Paper, Typography } from "@mui/material";

const CommentCard = ({ author, body, created_at, votes }) => {
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
        <Typography variant="caption">{created_at}</Typography>
        <Typography variant="caption">{votes} votes</Typography>
      </div>
    </Paper>
  );
};


export default CommentCard;
