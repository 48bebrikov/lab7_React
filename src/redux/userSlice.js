import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:3001/users";

// 1. Загрузка пользователя (например, при входе)
export const fetchUser = createAsyncThunk("user/fetch", async (id) => {
	const res = await axios.get(`${BASE_URL}/${id}`);
	return res.data;
});

// 2. Создание нового пользователя (при регистрации)
export const createUser = createAsyncThunk("user/create", async (userData) => {
	const res = await axios.post(BASE_URL, userData);
	return res.data;
});

// 3. Обновление профиля
export const updateUser = createAsyncThunk("user/update", async (user) => {
	const res = await axios.put(`${BASE_URL}/${user.id}`, user);
	return res.data;
});

const userSlice = createSlice({
	name: "user",
	initialState: {
		data: null,
		loading: false,
		error: null
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUser.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchUser.fulfilled, (state, action) => {
				state.loading = false;
				state.data = action.payload;
			})
			// createUser добавляет нового пользователя
			.addCase(createUser.fulfilled, (state, action) => {
				state.data = action.payload;
			})

			.addCase(updateUser.fulfilled, (state, action) => {
				state.data = action.payload;
				localStorage.setItem("userData", JSON.stringify(action.payload));
			})

	}
});

export default userSlice.reducer;
