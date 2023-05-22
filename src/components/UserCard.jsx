import { Avatar, Card, CardContent, Typography } from "@mui/material";

const UserCard = ({ username, name, avatar_url }) => {
  return (
    <Card
      sx={{ maxWidth: 150, margin: "10px", alignItems: "center" }}
      className="review_card bg-light"
      elevation={4}
    >
      <CardContent>
        <Avatar alt={username} src={avatar_url} />
        <Typography key={username} className="font-bold">
          {username}
        </Typography>
        <Typography className="font-bold">{name}</Typography>
      </CardContent>
    </Card>
  );
};

export default UserCard;
