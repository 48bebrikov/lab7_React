import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "../redux/counterSlice";
import { Box, Button, Typography } from "@mui/material";

const Counter = () => {
	const count = useSelector((state) => state.counter.value);
	const dispatch = useDispatch();

	return (
		<Box textAlign="center" p={2}>
			<Typography variant="h5">Счетчик: {count}</Typography>
			<Button variant="contained" onClick={() => dispatch(increment())} sx={{ m: 1 }}>
				+1
			</Button>
			<Button variant="contained" onClick={() => dispatch(decrement())} sx={{ m: 1 }}>
				-1
			</Button>
		</Box>
	);
};

export default Counter;
