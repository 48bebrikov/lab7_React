import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/userSlice";
import { TextField, Button, Box } from "@mui/material";
import useLoginState from "../hooks/useLoginState";

const UserProfileEdit = ({ user, onClose }) => {
	const dispatch = useDispatch();
	const { login } = useLoginState(); // используем хук, чтобы обновить localStorage

	const { register, handleSubmit } = useForm({
		defaultValues: {
			username: user?.username || "",
			email: user?.email || ""
		}
	});

	const onSubmit = async (data) => {
		const res = await dispatch(updateUser({ ...user, ...data }));

		if (res.meta.requestStatus === "fulfilled") {
			login(res.payload); // обновим localStorage + локальное состояние
			onClose();
		}
	};

	return (
		<Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
			<TextField
				label="Имя пользователя"
				{...register("username")}
				fullWidth
				sx={{ mb: 2 }}
			/>
			<TextField
				label="Email"
				{...register("email")}
				fullWidth
				sx={{ mb: 2 }}
			/>
			<Button type="submit" variant="contained" fullWidth>
				Сохранить
			</Button>
		</Box>
	);
};

export default UserProfileEdit;
