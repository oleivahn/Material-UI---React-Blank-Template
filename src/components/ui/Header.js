import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";

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
  },
  logo: {
    height: "8em", // Increases the size of the ToolBar too
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
}));

const Header = (props) => {
  const classes = useStyles();

  const [value, setValue] = useState(0);

  const handleTabChange = (e, newValue) => {
    setValue(newValue);
  };

  // Maintains the routes on url bar in case of a window refresh. Reloads on old url, not directly to /home
  useEffect(() => {
    if (window.location.pathname === "/" && value !== 0) {
      setValue(0);
    } else if (window.location.pathname === "/services" && value !== 1) {
      setValue(1);
    } else if (window.location.pathname === "/revolution" && value !== 2) {
      setValue(2);
    } else if (window.location.pathname === "/about" && value !== 3) {
      setValue(3);
    } else if (window.location.pathname === "/contact" && value !== 4) {
      setValue(4);
    } else if (window.location.pathname === "/estimates" && value !== 5) {
      setValue(5);
    }
  }, [value]);

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar position="fixed" color="primary">
          <Toolbar disableGutters={true}>
            <Button
              component={NavLink}
              to="/"
              className={classes.logoContainer}
              onClick={() => setValue(0)}
              disableRipple
            >
              <img alt="company logo" src={logo} className={classes.logo} />
            </Button>
            <Tabs
              value={value}
              onChange={handleTabChange}
              className={classes.tabContainer}
              indicatorColor="primary" // Removes the bottom indicator on the tabs. Default color is secondary
            >
              <Tab
                className={classes.tab}
                label="Home"
                component={NavLink}
                to="/"
                disableRipple
              />
              <Tab
                className={classes.tab}
                label="Services"
                component={NavLink}
                to="/services"
                disableRipple
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
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
            >
              Free Estimate
            </Button>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
};

export default Header;
