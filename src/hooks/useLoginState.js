// hooks/useLoginState.js
import { useState, useEffect, useCallback } from 'react';

const useLoginState = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [userData, setUserData] = useState(null); // сохраняем имя пользователя

	useEffect(() => {
		const savedAuth = localStorage.getItem("isAuthenticated");
		const savedUser = localStorage.getItem("userData");

		if (savedAuth === "true" && savedUser) {
			setIsAuthenticated(true);
			setUserData(JSON.parse(savedUser));
		}
	}, []);

	const login = useCallback((data) => {
		setIsAuthenticated(true);
		setUserData(data);
		localStorage.setItem("isAuthenticated", "true");
		localStorage.setItem("userData", JSON.stringify(data));
	}, []);

	const logout = useCallback(() => {
		setIsAuthenticated(false);
		setUserData(null);
		localStorage.removeItem("isAuthenticated");
		localStorage.removeItem("userData");
	}, []);

	return { isAuthenticated, userData, login, logout };
};

export default useLoginState;
