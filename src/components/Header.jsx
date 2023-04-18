import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="flex justify-center">
      <Link to={"/"}>
        <Typography variant="h2" className="font-bold">Ben's Boardgame Bazaar</Typography>
      </Link>
    </div>
  );
}
