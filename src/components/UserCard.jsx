import { Avatar, Button, Card, CardContent, Typography } from "@mui/material";
import React, { useContext } from "react";
import UserContext from "./UserContext";

const UserCard = ({ username, avatar_url }) => {
  const { setCurrentUser } = useContext(UserContext);

  const changeUser = (event, username, avatar_url) => {
    event.preventDefault();
    const newUser = { username, avatar_url };
    setCurrentUser(newUser);
  };

  return (
    <Card
      sx={{
        width: 250,
        margin: "10px",
      }}
      className="review_card bg-light"
      elevation={4}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Avatar alt={username} src={avatar_url} />
        <Typography key={username} className="font-bold my-2">
          {username}
        </Typography>
        <Button
          variant="contained"
          className="color bg-light-accent"
          onClick={(event) => changeUser(event, username, avatar_url)}
        >
          Sign In As {username}
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserCard;
