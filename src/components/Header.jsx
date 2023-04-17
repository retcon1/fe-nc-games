import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="main_header">
      <Link to={"/"}>
        <Typography variant="h2">Ben's Boardgame Bazaar</Typography>
      </Link>
    </div>
  );
}
