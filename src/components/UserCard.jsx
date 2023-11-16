import { Avatar, Button, Card, CardContent, Typography } from "@mui/material";
import React, { useContext } from "react";
import UserContext from "./UserContext";

const UserCard = ({ username, avatar_url, name }) => {
  const { setCurrentUser } = useContext(UserContext);

  const changeUser = (event, username, avatar_url) => {
    event.preventDefault();
    const newUser = { username, avatar_url, name };
    setCurrentUser(newUser);
  };

  return (
    <Card
      sx={{
        width: 250,
        margin: "10px",
      }}
      className="review_card bg-light dark:bg-dark-accent"
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
        <Typography key={username} className="font-bold my-2 dark:text-white">
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
