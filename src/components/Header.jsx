import React, { useEffect, useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { IconButton } from "@mui/material";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import CasinoIcon from "@mui/icons-material/Casino";
import { useNavigate } from "react-router-dom";
import UserContext from "./UserContext";
import ThemeButton from "../utils/ThemeSwitch";

function Header() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { currentUser } = useContext(UserContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.className = theme;
  }, [theme]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();
  const goToReviews = (event) => {
    event.preventDefault();
    navigate("/reviews");
  };

  const goToUsers = (event) => {
    handleCloseUserMenu();
    event.preventDefault();
    navigate("/users");
  };

  const goHome = (event) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <AppBar position="sticky" className="bg-primary mb-2 dark:bg-dark-accent">
      <Container maxWidth="xl">
        <Toolbar>
          <CasinoIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
            onClick={goHome}
          >
            Ben's Boardgame Bazaar
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="site navigation"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              fontSize="large"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem key={"allReviews"} onClick={handleCloseNavMenu}>
                <Typography textAlign="center" onClick={goToReviews}>
                  All Reviews
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
              textAlign: "center",
              maxWidth: "80%", // Limit the width to allow text wrapping
              whiteSpace: "normal", // Allow wrapping to multiple lines
              lineHeight: "1",
            }}
            onClick={goHome}
          >
            Ben's Boardgame Bazaar
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              key={"allReviews"}
              onClick={goToReviews}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              All Reviews
            </Button>
            <ThemeButton theme={theme} setTheme={setTheme} />
          </Box>
          <Typography variant="p" sx={{ mr: 1 }}>
            Signed in as {currentUser.username}
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0 }}
                fontSize="large"
              >
                <Avatar
                  alt={currentUser.username}
                  src={currentUser.avatar_url}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key={"changeUser"} onClick={goToUsers}>
                <Typography textAlign="center">Change User</Typography>
              </MenuItem>
              <MenuItem key={"toggleTheme"} onClick={handleCloseNavMenu}>
                <ThemeButton theme={theme} setTheme={setTheme} />
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
