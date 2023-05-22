import { useEffect, useState } from "react";
import { fetchUsers } from "../utils/api";
import { Typography } from "@mui/material";
import Loading from "./Loading";
import UserCard from "./UserCard";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUsers().then((data) => {
      console.log(data.users);
      setUsers(data.users);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Typography className="font-bold flex justify-center">
          Getting Those Users...
          <br /> (this may take some time...)
        </Typography>
        <Loading />
      </div>
    );
  }

  return (
    <div>
      {users.map((user) => (
        <UserCard
          username={user.username}
          name={user.name}
          avatar_url={user.avatar_url}
        />
      ))}
    </div>
  );
};

export default Users;
