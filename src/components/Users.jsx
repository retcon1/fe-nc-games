import { useEffect, useState } from "react";
import { fetchUsers } from "../utils/api";
import { Typography } from "@mui/material";
import Loading from "./Loading";
import UserCard from "./UserCard";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // const testUsers = [
  //   {
  //     username: "tickle122",
  //     name: "Tom Tickle",
  //     avatar_url:
  //       "https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953",
  //   },
  //   {
  //     username: "grumpy19",
  //     name: "Paul Grump",
  //     avatar_url:
  //       "https://vignette.wikia.nocookie.net/mrmen/images/7/78/Mr-Grumpy-3A.PNG/revision/latest?cb=20170707233013",
  //   },
  //   {
  //     username: "happyamy2016",
  //     name: "Amy Happy",
  //     avatar_url:
  //       "https://vignette1.wikia.nocookie.net/mrmen/images/7/7f/Mr_Happy.jpg/revision/latest?cb=20140102171729",
  //   },
  //   {
  //     username: "tickle122",
  //     name: "Tom Tickle",
  //     avatar_url:
  //       "https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953",
  //   },
  //   {
  //     username: "grumpy19",
  //     name: "Paul Grump",
  //     avatar_url:
  //       "https://vignette.wikia.nocookie.net/mrmen/images/7/78/Mr-Grumpy-3A.PNG/revision/latest?cb=20170707233013",
  //   },
  //   {
  //     username: "happyamy2016",
  //     name: "Amy Happy",
  //     avatar_url:
  //       "https://vignette1.wikia.nocookie.net/mrmen/images/7/7f/Mr_Happy.jpg/revision/latest?cb=20140102171729",
  //   },
  //   {
  //     username: "tickle122",
  //     name: "Tom Tickle",
  //     avatar_url:
  //       "https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953",
  //   },
  //   {
  //     username: "grumpy19",
  //     name: "Paul Grump",
  //     avatar_url:
  //       "https://vignette.wikia.nocookie.net/mrmen/images/7/78/Mr-Grumpy-3A.PNG/revision/latest?cb=20170707233013",
  //   },
  //   {
  //     username: "happyamy2016",
  //     name: "Amy Happy",
  //     avatar_url:
  //       "https://vignette1.wikia.nocookie.net/mrmen/images/7/7f/Mr_Happy.jpg/revision/latest?cb=20140102171729",
  //   },
  // ];

  useEffect(() => {
    fetchUsers().then((data) => {
      console.log(data.users);
      setUsers(data.users);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="flex-row">
        <Typography className="font-bold flex justify-center">
          Getting Those Users...
          <br /> (this may take some time...)
        </Typography>
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-row flex-wrap justify-center">
      {users.map((user) => (
        <UserCard
          username={user.username}
          name={user.name}
          avatar_url={user.avatar_url}
          key={user.username}
        />
      ))}
    </div>
  );
};

export default Users;
