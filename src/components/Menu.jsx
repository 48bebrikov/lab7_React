import { Drawer, List, ListItemButton, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import labData from "../data/labData";

const Menu = ({ open, onClose }) => (
	<Drawer anchor="left" open={open} onClose={onClose}>
		<List sx={{ width: 250 }}>
			{labData.map((lab) => (
				<ListItemButton
					key={lab.id}
					component={Link}
					to={`/lab/${lab.id}`}
					onClick={onClose}
				>
					<ListItemText primary={lab.title} />
				</ListItemButton>
			))}
			<ListItemButton component={Link} to="/counter" onClick={onClose}>
				<ListItemText primary="Счётчик" />
			</ListItemButton>
		</List>
	</Drawer>
);

export default Menu;
