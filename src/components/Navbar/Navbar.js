import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import FormGroup from "@material-ui/core/FormGroup";
import { appContext } from "../../context/AppContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const history = useHistory();
  const { token, setToken } = useContext(appContext);

//   const handleChange = (event) => {
//     setAuth(event.target.checked);
//   };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
    
  };
  // console.log(anchorEl);

  const handleProfileClick = () => {
    history.push("/profile");
    setAnchorEl(null);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMainPage = () => {
    history.push("/");
    setAnchorEl(null);
  }

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setToken(null);
    history.push("/");
    setAnchorEl(null);
  };


  return (
    <div className={classes.root}>
      <FormGroup></FormGroup>      
      <AppBar position="static">
        <Toolbar>
          <IconButton 
          edge="start" 
          className={classes.menuButton} 
          color="inherit" 
          aria-label="menu"
          onClick={handleMainPage}>
           <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title} alignContent="flex-start">
          Awesome Blog
          </Typography>
          
          {token ? (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                {/* {username} */}
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleLogOut}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <>
            <Button onClick={() => history.push("/login")} color="inherit">
                Login
              </Button>
              <Button onClick={() => history.push("/register")} color="inherit">
                Register
              </Button>
            </>
          )};
           
            {/* // <Menu onClick={() => {window.location.href = "/login"}}>Sign in</Menu>
            // <Menu onClick={() => {window.location.href = "/register"}}>Sign up</Menu>          */}
        </Toolbar>
      </AppBar>
    </div>
  );
}