import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Typography, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { useDispatch } from "react-redux";
import UserProfile from "./components/UserProfile";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Container from "./components/Container";
import Menu from "./components/Menu";
import Content from "./components/Content";
import Counter from "./components/Counter";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Feedback from "./components/Feedback";
import Home from "./pages/Home";
import About from "./pages/About";
import { createUser } from "./redux/userSlice";
import useLoginState from "./hooks/useLoginState";
import axios from "axios";
import bcrypt from "bcryptjs";

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


	const dispatch = useDispatch();

	const handleLogin = async (data) => {
		try {
			const username = data.username.trim().toLowerCase();
			const res = await axios.get(`http://localhost:3001/users?username=${username}`);
			const users = res.data;

			if (users.length === 0) {
				alert("Пользователь не найден.");
				return;
			}

			const user = users[0];

			// Сверяем хеш пароля
			const passwordMatches = bcrypt.compareSync(data.password, user.password);
			if (!passwordMatches) {
				alert("Неверный пароль.");
				return;
			}

			login(user);
			closeAuth();
		} catch (err) {
			console.error("Ошибка входа:", err);
			alert("Ошибка при попытке входа");
		}
	};


	const handleRegister = async (data) => {
		try {
			// Проверим, есть ли уже пользователь с таким username
			const existing = await axios.get(`http://localhost:3001/users?username=${data.username}`);
			if (existing.data.length > 0) {
				alert("Пользователь с таким именем уже существует.");
				return;
			}

			// Хешируем пароль
			const salt = bcrypt.genSaltSync(10);
			const hashedPassword = bcrypt.hashSync(data.password, salt);

			// Создаём нового пользователя
			const newUser = {
				username: data.username,
				email: data.email,
				password: hashedPassword
			};

			const res = await dispatch(createUser(newUser));
			if (res.meta.requestStatus === "fulfilled") {
				login(res.payload); // сохраняем в localStorage и Redux
				closeAuth();
			}
		} catch (err) {
			console.error("Ошибка при регистрации:", err);
			alert("Ошибка при регистрации");
		}
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

			<Dialog open={feedbackOpen} onClose={closeFeedback} fullWidth maxWidth="sm">
				<DialogTitle>Обратная связь</DialogTitle>
				<DialogContent>
					<Feedback />
				</DialogContent>
			</Dialog>
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
