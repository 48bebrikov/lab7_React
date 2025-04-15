import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, Switch, IconButton, Box, Button, Avatar, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

const Header = ({ onMenuClick, userData, isAuthenticated, onLoginClick, onLogout }) => {
	const { darkMode, setDarkMode } = useContext(ThemeContext);
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
	const handleMenuClose = () => setAnchorEl(null);

	return (
		<AppBar position="static">
			<Toolbar>
				<IconButton edge="start" color="inherit" onClick={onMenuClick}>
					<MenuIcon />
				</IconButton>

				<Typography variant="h6" sx={{ flexGrow: 1 }}>
					<Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
						Lab App
					</Link>
				</Typography>

				<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
					<Button color="inherit" component={Link} to="/">Главная</Button>
					<Button color="inherit" component={Link} to="/about">О себе</Button>

					{isAuthenticated ? (
						<>
							<IconButton color="inherit" onClick={handleMenuOpen}>
								<Avatar>{userData?.username[0]?.toUpperCase()}</Avatar>
							</IconButton>
							<Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
								<MenuItem disabled>{userData?.username}</MenuItem>
								<MenuItem onClick={() => { onLogout(); handleMenuClose(); }}>Выйти</MenuItem>
							</Menu>
						</>
					) : (
						<IconButton color="inherit" onClick={onLoginClick}>
							<AccountCircle fontSize="large" />
						</IconButton>
					)}

					<Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
