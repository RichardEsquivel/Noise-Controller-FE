import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, Link } from "react-router-dom";
import { Modal } from "react-router-modal";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListIcon from "@material-ui/icons/List";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";

/*
TODO: Better Styling, maybe react-icons, Font family,
      colors.""
*/
const StyledTabs = withStyles({
	indicator: {
		display: "flex",
		justifyContent: "center",
		backgroundColor: "transparent",
		"& > div": {
			width: "100%",
			backgroundColor: "#3E51B4"
		}
	}
})(props => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);

const StyledTab = withStyles(theme => ({
	root: {
		textTransform: "none",
		color: "#fff",
		fontWeight: theme.typography.fontWeightRegular,
		fontSize: "1.5rem",
		marginRight: theme.spacing(1),
		"&:focus": {
			opacity: 1
		}
	}
}))(props => <Tab disableRipple {...props} />);

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		justifyContent: "space-between",
		backgroundColor: "rgba(101,157,189,1)",
		padding: "10px 0"
	},
	tabs: {
		display: "flex",
		justifyContent: "flex-end"
	},
	header: {
		marginLeft: theme.spacing(3),
		fontFamily: "'Bubblegum Sans', cursive;",
		fontSize: "2.2rem",
		color: "#fff",
		lineHeight: ".2rem"
	}
}));

function Header(props) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [show, setShow] = useState(false);
	const [value, setValue] = useState(0);
	const [prevValue, setPrevValue] = useState(0);
	const [scores, setScores] = useState([]);

	const classes = useStyles();

	useEffect(() => {
		if (localStorage.getItem("token")) {
			setIsLoggedIn(true);
			setValue(0);
		}
	}, [props]);

	useEffect(() => {
		if (show) {
			//Axios get scores
			//then setScores
			//error console.error
		}
	}, [show]);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const signOut = () => {
		localStorage.removeItem("token");
		props.setLoggedIn(false);
		setIsLoggedIn(false);
		setValue(1);
	};

	const showModal = () => {
		setPrevValue(value);
		setShow(true);
	};

	const hideModal = () => {
		setShow(false);
		setValue(prevValue);
	};

	const renderModal = () => {
		return (
			<Modal onBackdropClick={() => hideModal()}>
				Your scores are:
        {scores.length > 0 ? (
					scores.map(score => <p>{score}</p>)
				) : (
						<p>No scores to display</p>
					)}
			</Modal>
		);
	};

	return (
		<div className={classes.root}>
			{show && renderModal()}
			<h2 className={classes.header}>
				<Link to="/" style={{ textDecoration: "none", color: "white" }}>
					Noise Controller
        </Link>
			</h2>
			<StyledTabs
				value={value}
				onChange={handleChange}
				aria-label="styled tabs"
				className={classes.tabs}
			>
				<StyledTab
					label={
						<div style={{ display: "flex" }}>
							<PlayCircleOutlineIcon
								style={{
									fontSize: "inherit",
									marginRight: "10px",
									marginTop: "9px"
								}}
							/>{" "}
							Play
            </div>
					}
					component={NavLink}
					to="/creatures"
				/>
				{isLoggedIn ? (
					<StyledTab
						label={
							<div style={{ display: "flex" }}>
								<ListIcon
									style={{
										fontSize: "inherit",
										marginRight: "10px",
										marginTop: "8px"
									}}
								/>
								Scoreboard
              </div>
						}
						component={NavLink}
						onClick={() => showModal()}
					/>
				) : null}
				{isLoggedIn ? (
					<StyledTab
						label={
							<div style={{ display: "flex" }}>
								<SettingsIcon
									style={{
										fontSize: "inherit",
										marginRight: "10px",
										marginTop: "8px"
									}}
								/>
								Settings
              </div>
						}
						component={NavLink}
						to="/settings"
					/>
				) : null}
				{isLoggedIn ? (
					<StyledTab
						label={
							<div style={{ display: "flex" }}>
								<ExitToAppIcon
									style={{
										fontSize: "inherit",
										marginRight: "10px",
										marginTop: "8px"
									}}
								/>
								Sign Out
              </div>
						}
						component={NavLink}
						to="/login"
						onClick={signOut}
					/>
				) : null}
				{!isLoggedIn ? (
					<StyledTab
						label={
							<div style={{ display: "flex" }}>
								<PersonAddIcon
									style={{
										fontSize: "inherit",
										marginRight: "10px",
										marginTop: "8px"
									}}
								/>
								Log In
              </div>
						}
						component={NavLink}
						to="/login"
					/>
				) : null}
			</StyledTabs>
		</div>
	);
}

export default Header;
