import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Button, Typography, Dialog, DialogTitle, DialogContent } from "@mui/material";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Container from "./components/Container";
import Menu from "./components/Menu";
import Content from "./components/Content";
import Counter from "./components/Counter";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Feedback from "./components/FeedbackForm";
import Home from "./pages/Home";
import About from "./pages/About";

import useLoginState from "./hooks/useLoginState";

const App = () => {
	const { isAuthenticated, userData, login, logout } = useLoginState();

	const [menuOpen, setMenuOpen] = useState(false);
	const [feedbackOpen, setFeedbackOpen] = useState(false);
	const [authOpen, setAuthOpen] = useState(false);

	const toggleMenu = () => setMenuOpen(!menuOpen);
	const closeMenu = () => setMenuOpen(false);
	const openFeedback = () => setFeedbackOpen(true);
	const closeFeedback = () => setFeedbackOpen(false);
	const openAuth = () => setAuthOpen(true);
	const closeAuth = () => setAuthOpen(false);

	const handleLogin = (data) => {
		console.log("User logged in:", data);
		login(data);
		closeAuth();
	};

	const handleRegister = (data) => {
		console.log("User registered:", data);
		login(data);
		closeAuth();
	};

	return (
		<>
			<Header
				onMenuClick={toggleMenu}
				isAuthenticated={isAuthenticated}
				userData={userData}
				onLoginClick={openAuth}
				onLogout={logout}
			/>

			<Menu open={menuOpen} onClose={closeMenu} />

			<Container>
				<div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap" }}>
					{/* Контент по центру */}
					<div style={{ flex: 1, padding: "0 20px", minWidth: "300px" }}>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/about" element={<About />} />
							<Route path="/counter" element={<Counter />} />
							<Route path="/lab/:labId" element={<Content />} />
						</Routes>
					</div>
				</div>
			</Container>

			<Footer onFeedbackClick={openFeedback} />

			{/* Диалог обратной связи */}
			<Dialog open={feedbackOpen} onClose={closeFeedback} fullWidth maxWidth="sm">
				<DialogTitle>Обратная связь</DialogTitle>
				<DialogContent>
					<Feedback />
				</DialogContent>
			</Dialog>

			{/* Диалог авторизации/регистрации */}
			<Dialog open={authOpen} onClose={closeAuth} fullWidth maxWidth="xs">
				<DialogTitle>Вход / Регистрация</DialogTitle>
				<DialogContent>
					<Typography variant="subtitle1" sx={{ mt: 1 }}>Авторизация</Typography>
					<LoginForm onSubmit={handleLogin} />
					<Typography variant="subtitle1" sx={{ mt: 3 }}>Регистрация</Typography>
					<RegisterForm onSubmit={handleRegister} />
				</DialogContent>
			</Dialog>
		</>
	);
};

export default App;
