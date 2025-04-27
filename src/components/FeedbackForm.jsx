import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";

const FeedbackForm = ({ onSubmit }) => {
	const { register, handleSubmit, formState: { errors }, reset } = useForm();

	const onFormSubmit = useCallback((data) => {
		onSubmit(data);
		reset();
	}, [onSubmit, reset]);

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

export default FeedbackForm;
