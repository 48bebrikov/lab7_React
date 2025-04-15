// components/RegisterForm.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button } from '@mui/material';

const RegisterForm = ({ onSubmit }) => {
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
				label="Email"
				variant="outlined"
				fullWidth
				{...register("email", {
					required: "Email is required",
					pattern: {
						value: /^\S+@\S+$/i,
						message: "Invalid email address"
					}
				})}
				error={!!errors.email}
				helperText={errors.email?.message}
			/>
			<TextField
				label="Password"
				variant="outlined"
				fullWidth
				type="password"
				{...register("password", { required: "Password is required", minLength: 6 })}
				error={!!errors.password}
				helperText={errors.password?.message}
			/>
			<Button type="submit" variant="contained" fullWidth>
				Register
			</Button>
		</form>
	);
};

export default RegisterForm;
