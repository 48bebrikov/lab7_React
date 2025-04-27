import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	fetchFeedbacks,
	addFeedback,
	deleteFeedback
} from "../redux/feedbackSlice";
import FeedbackForm from "./FeedbackForm";
import useLoginState from "../hooks/useLoginState";

import {
	Typography,
	Box,
	IconButton,
	Paper,
	CircularProgress,
	Button
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Feedback = () => {
	const dispatch = useDispatch();
	const { items, loading, error } = useSelector((state) => state.feedback);
	const { isAuthenticated, userData } = useLoginState();

	const [sortOrder, setSortOrder] = useState("newest"); // newest | oldest

	useEffect(() => {
		dispatch(fetchFeedbacks());
	}, [dispatch]);

	const handleSubmit = (data) => {
		const username = isAuthenticated ? userData.username : "Аноним";
		dispatch(addFeedback({ text: data.feedback, author: username }));
	};

	const handleDelete = (id) => {
		dispatch(deleteFeedback(id));
	};

	const sortedItems = [...items].sort((a, b) => {
		const dateA = new Date(a.date);
		const dateB = new Date(b.date);
		return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
	});

	return (
		<Box sx={{ p: 2 }}>
			<Box sx={{ mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
				<Typography variant="h6">Обратная связь</Typography>
				<Button
					variant="outlined"
					size="small"
					onClick={() => setSortOrder(prev => prev === "newest" ? "oldest" : "newest")}
				>
					{sortOrder === "newest" ? "Сначала старые" : "Сначала новые"}
				</Button>
			</Box>

			<FeedbackForm onSubmit={handleSubmit} />

			{loading && <CircularProgress />}
			{error && <Typography color="error">{error}</Typography>}

			{sortedItems.map((item) => (
				<Paper key={item.id} sx={{ p: 2, mt: 2 }}>
					<Typography sx={{ fontWeight: "bold" }}>
						{item.author || "Аноним"}
					</Typography>
					<Typography variant="body2" color="textSecondary">
						{new Date(item.date).toLocaleString()}
					</Typography>
					<Typography sx={{ mt: 1 }}>{item.text}</Typography>
					<IconButton onClick={() => handleDelete(item.id)} color="error" sx={{ mt: 1 }}>
						<DeleteIcon />
					</IconButton>
				</Paper>
			))}
		</Box>
	);
};

export default Feedback;
