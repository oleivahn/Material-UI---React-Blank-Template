import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";

import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

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
  drawerIconContainer: {
    marginLeft: "auto",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  drawerIcon: {
    // fontSize: "2.2rem", // Size option 1
    height: "50px", // Size option 2 (width and height)
    width: "50px",

    color: "white",
  },
  drawer: {
    backgroundColor: theme.palette.common.blue,
  },
  drawerItem: {
    ...theme.typography.tab,
    color: "#fff",
    opacity: 0.7,
    "&:hover": {
      opacity: 1,
    },
  },
  drawerItemEstimate: {
    backgroundColor: theme.palette.common.orange,
    // "&:hover": {
    //   backgroundColor: "red",
    // },
  },
  drawerItemSelected: {
    opacity: 1,
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  // Setting the media queries for responsiveness
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  // Figure out if you're using an IOS device. Outcome = true | false
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const [openDrawer, setOpenDrawer] = useState(false);
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null); // Dealing with the submenu on the services tab
  const [openMenu, setOpenMenu] = useState(false); // Services tab
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleTabChange = (e, newValue) => {
    setValue(newValue);
  };

  // e.currentTarget is the element we click on
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const handleMenuItemClick = (e, i) => {
    setAnchorEl(null); // to close the menu
    setOpenMenu(false); // actual close of the menu
    setSelectedIndex(i); // set active tab to remain on services
  };

  const menuOptions = [
    { name: "Services", link: "/services" },
    { name: "Custom Software Development", link: "/custom" },
    { name: "Mobile App Development", link: "/mobile" },
    { name: "Websites Development", link: "/websites" },
  ];

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

      {/* Services Menu */}
      <Menu
        id="simple-menu" // needs to match "aria-owns" on parent element <Tab />
        anchorEl={anchorEl} // what element the menu will latch on to. Set on handleClick()
        open={openMenu} // true or false
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }} // handle close menu when mouse leaves. Passing props down to the <MenuList> that lies under our component. (Component composition)
        classes={{ paper: classes.menu, root: classes.MenuItem }}
        elevation={0}
      >
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

  const drawer = ( // Parenthesis: Multiline statement
    <React.Fragment>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }} // to overwrite the base MUI component styles
      >
        {/* disablePadding: to remove that top padding added by MUI */}
        <List disablePadding>
          {/* <ListItem divider>
            <ListItemText className={classes.drawerItem} disableTypography>
              Header Option
            </ListItemText>
          </ListItem> */}
          <ListItem
            divider
            button
            component={NavLink}
            to="/"
            onClick={() => {
              setOpenDrawer(false);
              setValue(0);
            }}
            selected={value === 0}
          >
            <ListItemText
              className={
                // Add multiple classes if route matches to keep opacity correct
                value === 0
                  ? [classes.drawerItem, classes.drawerItemSelected]
                  : classes.drawerItem
              }
              disableTypography
            >
              Home
            </ListItemText>
          </ListItem>
          <ListItem
            divider // Add the little divider at the bottom
            button // turn it into a button with button stylings too
            component={NavLink}
            to="/services"
            onClick={() => {
              setOpenDrawer(false);
              setValue(1);
            }}
            selected={value === 1}
          >
            <ListItemText
              className={
                value === 1
                  ? [classes.drawerItem, classes.drawerItemSelected]
                  : classes.drawerItem
              }
              disableTypography
            >
              Services
            </ListItemText>
          </ListItem>
          <ListItem
            divider
            button
            component={NavLink}
            to="/revolution"
            onClick={() => {
              setOpenDrawer(false);
              setValue(2);
            }}
            selected={value === 2}
          >
            <ListItemText
              className={
                value === 2
                  ? [classes.drawerItem, classes.drawerItemSelected]
                  : classes.drawerItem
              }
              disableTypography
            >
              The Revolution
            </ListItemText>
          </ListItem>
          <ListItem
            divider
            button
            component={NavLink}
            to="/about"
            onClick={() => {
              setOpenDrawer(false);
              setValue(3);
            }}
            selected={value === 3}
          >
            <ListItemText
              className={
                value === 3
                  ? [classes.drawerItem, classes.drawerItemSelected]
                  : classes.drawerItem
              }
              disableTypography
            >
              About Us
            </ListItemText>
          </ListItem>
          <ListItem
            divider
            button
            component={NavLink}
            to="/contact"
            onClick={() => {
              setOpenDrawer(false);
              setValue(4);
            }}
            selected={value === 4}
          >
            <ListItemText
              className={
                value === 4
                  ? [classes.drawerItem, classes.drawerItemSelected]
                  : classes.drawerItem
              }
              disableTypography
            >
              Contact Us
            </ListItemText>
          </ListItem>
          <ListItem
            divider
            button
            component={NavLink}
            to="/estimate"
            onClick={() => {
              setOpenDrawer(false);
              setValue(5);
            }}
            selected={value === 5}
            className={classes.drawerItemEstimate}
          >
            <ListItemText
              className={
                value === 5
                  ? [classes.drawerItem, classes.drawerItemSelected]
                  : classes.drawerItem
              }
              disableTypography
            >
              Free Estimate
            </ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>

      {/* Menu Icon is independent from the drawer. It's just a trigger point */}
      <IconButton
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
        className={classes.drawerIconContainer}
      >
        <MenuIcon
          className={classes.drawerIcon}
          // color="secondary"
        />
      </IconButton>
    </React.Fragment>
  );

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
            {matches ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
};

export default Header;
