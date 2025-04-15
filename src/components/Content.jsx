import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import labData from "../data/labData";


const Content = () => {
	const { labId } = useParams();
	const lab = labData.find((lab) => lab.id === Number(labId));

	return (
		<Box p={2}>
			<Typography variant="h5">
				{lab ? lab.title : "Лабораторная работа не найдена"}
			</Typography>
			<Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
				{lab?.content}
			</Typography>
		</Box>
	);
};

export default Content;
