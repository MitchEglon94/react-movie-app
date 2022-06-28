import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./../features/users/userSlice";
import { toggle } from "../features/ui/uiSlice";

export default function ButtonAppBar() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => dispatch(toggle())}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="div" sx={{ flexGrow: 1 }}>
            <Link to="/">
              <h1 className="app-title">WHATS ON?</h1>
            </Link>
          </Typography>

          {!user.user && (
            <Button color="secondary" component={Link} to="/login">
              Login
            </Button>
          )}

          {user.user && (
            <Button
              color="secondary"
              component={Link}
              to="/login"
              onClick={() => dispatch(logout())}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
