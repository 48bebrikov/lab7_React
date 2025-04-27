import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:3001/feedbacks";

export const fetchFeedbacks = createAsyncThunk("feedback/fetchAll", async () => {
	const res = await axios.get(BASE_URL);
	return res.data;
});

export const addFeedback = createAsyncThunk("feedback/add", async ({ text, author }) => {
	const res = await axios.post(BASE_URL, {
		text,
		author,
		date: new Date().toISOString()
	});
	return res.data;
});

export const deleteFeedback = createAsyncThunk("feedback/delete", async (id) => {
	await axios.delete(`${BASE_URL}/${id}`);
	return id;
});

const feedbackSlice = createSlice({
	name: "feedback",
	initialState: {
		items: [],
		loading: false,
		error: null,
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchFeedbacks.pending, (state) => { state.loading = true; })
			.addCase(fetchFeedbacks.fulfilled, (state, action) => {
				state.loading = false;
				state.items = action.payload;
			})
			.addCase(fetchFeedbacks.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(addFeedback.fulfilled, (state, action) => {
				state.items.push(action.payload);
			})
			.addCase(deleteFeedback.fulfilled, (state, action) => {
				state.items = state.items.filter(f => f.id !== action.payload);
			});
	}
});

export default feedbackSlice.reducer;
