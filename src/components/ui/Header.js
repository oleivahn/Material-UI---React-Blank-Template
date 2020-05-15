import React, { useState, useEffect } from "react";
import { NavLink, Redirect, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import logo from "../../assets/logo.svg";

// This will make the app bar elevated and give it the sticky look to it
function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar, // Adding to a pre-existing MUI class
    // Native height is 4em. Need to add up to the logo height
    marginBottom: "3em",
    [theme.breakpoints.down("md")]: {
      marginBottom: "2em",
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "1.25em",
    },
  },
  logo: {
    height: "8em", // Increases the size of the ToolBar too
    [theme.breakpoints.down("md")]: {
      height: "7em",
    },
    [theme.breakpoints.down("xs")]: {
      height: "5.5em",
    },
  },
  logoContainer: {
    padding: 0, // Overwriting default padding on a button
    "&:hover": {
      // backgroundColor: "rgba(0,0,0,0)",
      backgroundColor: "transparent",
    },
  },
  tabContainer: {
    marginLeft: "auto", // Pushes the container to the right
  },
  tab: {
    ...theme.typography.tab, // Custom reusable classes
    minWidth: 10, // Reduce spacing between the tabs
    marginLeft: "25px", // Our own spacing between tabs
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: "50px",
    margin: "0 25px 0 50px",
  },
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: "white",
    borderRadius: 0,
  },
  MenuItem: {
    ...theme.typography.tab,
    "&:hover": {
      opacity: 1,
    },
    opacity: 0.7,
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  // Setting the media queries for responsiveness
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const [value, setValue] = useState(0);
  // Dealing with the submenu on the services tab
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleTabChange = (e, newValue) => {
    setValue(newValue);
  };

  // e.currentTarget is the element we click on
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleMenuItemClick = (e, i) => {
    setAnchorEl(null); // to close the menu
    setOpen(false); // actual close of the menu
    setSelectedIndex(i); // set active tab to remain on services
  };

  const menuOptions = [
    { name: "Services", link: "/services" },
    { name: "Custom Software Development", link: "/custom" },
    { name: "Mobile App Development", link: "/mobile" },
    { name: "Websites Development", link: "/websites" },
  ];

  // Tabs are created separately to allow responsiveness. (If true = display || don't)
  const tabs = (
    <React.Fragment>
      <Tabs
        value={value}
        onChange={handleTabChange}
        className={classes.tabContainer}
        indicatorColor="primary" // Removes the bottom indicator on the tabs. Default color is secondary
      >
        <Tab
          className={classes.tab}
          label="Home"
          component={NavLink} // turns this Tab component into a NavLink comp
          to="/" // since this is a NavLink now, you can use NavLink's normal props
          disableRipple
        />
        <Tab
          className={classes.tab}
          label="Services"
          component={NavLink}
          to="/services"
          onMouseOver={(e) => handleClick(e)} // Menu is created at the bottom
          disableRipple
          aria-owns={anchorEl ? "simple-menu" : undefined} // Matches id on the Menu component
          aria-haspopup={anchorEl ? "true" : undefined} // Mainly for ally purposes
        />
        <Tab
          className={classes.tab}
          label="The Revolution"
          component={NavLink}
          to="/revolution"
          disableRipple
        />
        <Tab
          className={classes.tab}
          label="About Us"
          component={NavLink}
          to="/about"
          disableRipple
        />
        <Tab
          className={classes.tab}
          label="Contact Us"
          component={NavLink}
          to="/contact"
          disableRipple
        />
      </Tabs>
      <Button variant="contained" color="secondary" className={classes.button}>
        Free Estimate
      </Button>
      <Menu
        id="simple-menu" // needs to match "aria-owns" on parent element <Tab />
        anchorEl={anchorEl} // what element the menu will latch on to. Set on handleClick()
        open={open} // true or false
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }} // handle close menu when mouse leaves. Passing props down to the <MenuList> that lies under our component. (Component composition)
        classes={{ paper: classes.menu, root: classes.MenuItem }}
        elevation={0}
      >
        {/* <MenuItem
                onClick={() => {
                  handleClose();
                  setValue(1);
                }}
                component={NavLink}
                to="/services"
                classes={{ root: classes.MenuItem }}
              >
                Services
              </MenuItem> */}

        {menuOptions.map((option, i) => (
          <MenuItem
            key={option}
            onClick={(e) => {
              handleMenuItemClick(e, i); // Add the selected index
              setValue(1); // route /services no matter what
              handleClose(); // close the menu on click
            }}
            selected={i === selectedIndex && value === 1} // only add the selected class if selected, and if the route is /services (1)
            classes={{ root: classes.MenuItem }}
            component={NavLink}
            to={option.link}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );

  // Maintains the routes on url bar in case of a window refresh. Reloads on old url, not directly to /home
  useEffect(() => {
    switch (window.location.pathname) {
      case "/":
        if (value !== 0) {
          setValue(0);
        }
        break;
      case "/services":
        if (value !== 1) {
          setValue(1);
          setSelectedIndex(0);
        }
        break;
      case "/custom":
        if (value !== 1) {
          setValue(1);
          setSelectedIndex(1);
        }
        break;
      case "/mobile":
        if (value !== 1) {
          setValue(1);
          setSelectedIndex(2);
        }
        break;
      case "/websites":
        if (value !== 1) {
          setValue(1);
          setSelectedIndex(3);
        }
        break;
      case "/revolution":
        if (value !== 2) {
          setValue(2);
        }
        break;
      case "/about":
        if (value !== 3) {
          setValue(3);
        }
        break;
      case "/contact":
        if (value !== 4) {
          setValue(4);
        }
        break;
      case "/estimate":
        if (value !== 5) {
          setValue(5);
        }
        break;
      default:
        break;
    }
  }, [value]);

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar position="fixed" color="primary">
          <Toolbar disableGutters={true}>
            <Button
              component={NavLink}
              exact
              to="/"
              className={classes.logoContainer}
              onClick={() => setValue(0)}
              disableRipple // disables the click animation on a button
            >
              <img alt="company logo" src={logo} className={classes.logo} />
            </Button>
            {/* Media query, display tabs or drawer depending on screen size */}
            {matches ? null : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
};

export default Header;
