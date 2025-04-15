// components/LoginForm.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button } from '@mui/material';

const LoginForm = ({ onSubmit }) => {
	const { register, handleSubmit, formState: { errors } } = useForm();

	const onFormSubmit = (data) => {
		onSubmit(data);
	};

	return (
		<form onSubmit={handleSubmit(onFormSubmit)}>
			<TextField
				label="Username"
				variant="outlined"
				fullWidth
				{...register("username", { required: "Username is required" })}
				error={!!errors.username}
				helperText={errors.username?.message}
			/>
			<TextField
				label="Password"
				variant="outlined"
				fullWidth
				type="password"
				{...register("password", { required: "Password is required" })}
				error={!!errors.password}
				helperText={errors.password?.message}
			/>
			<Button type="submit" variant="contained" fullWidth>
				Login
			</Button>
		</form>
	);
};

export default LoginForm;
