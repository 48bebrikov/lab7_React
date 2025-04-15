// components/FeedbackForm.jsx
import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Typography } from '@mui/material';

const FeedbackForm = ({ onSubmit }) => {
	const { register, handleSubmit, formState: { errors } } = useForm();

	const onFormSubmit = useCallback((data) => {
		onSubmit(data);
	}, [onSubmit]);

	return (
		<form onSubmit={handleSubmit(onFormSubmit)}>
			<TextField
				label="Ваш отзыв"
				variant="outlined"
				fullWidth
				{...register("feedback", { required: "Введите отзыв" })}
				error={!!errors.feedback}
				helperText={errors.feedback?.message}
				sx={{ mb: 2 }}
			/>
			<Button type="submit" variant="contained" fullWidth>
				Отправить
			</Button>
		</form>
	);
};

const FeedbackList = ({ feedbacks }) => (
	<>
		{feedbacks.length === 0 && (
			<Typography variant="body2" sx={{ mt: 2 }}>
				Нет отзывов
			</Typography>
		)}
		{feedbacks.map((text, index) => (
			<Typography key={index} variant="body1" sx={{ mt: 1 }}>
				{text}
			</Typography>
		))}
	</>
);

const Feedback = () => {
	const [feedbacks, setFeedbacks] = useState(() => {
		const stored = localStorage.getItem("feedbacks");
		return stored ? JSON.parse(stored) : [];
	});

	const handleFeedbackSubmit = useCallback((data) => {
		setFeedbacks((prev) => {
			const updated = [...prev, data.feedback];
			localStorage.setItem("feedbacks", JSON.stringify(updated));
			return updated;
		});
	}, []);

	return (
		<div>
			<FeedbackForm onSubmit={handleFeedbackSubmit} />
			<FeedbackList feedbacks={feedbacks} />
		</div>
	);
};

export default Feedback;
