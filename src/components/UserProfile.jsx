// components/UserProfile.jsx
import { Avatar, Card, CardContent, Typography, Button } from '@mui/material';

const UserProfile = ({ user, onLogout }) => (
	<Card variant="outlined" sx={{ mt: 2 }}>
		<CardContent>
			<Avatar sx={{ width: 64, height: 64, mb: 1 }}>
				{user?.username?.[0]?.toUpperCase() || "U"}
			</Avatar>
			<Typography variant="h6">{user?.username}</Typography>
			<Typography variant="body2">{user?.email}</Typography>
			<Button variant="outlined" onClick={onLogout} sx={{ mt: 2 }}>
				Выйти
			</Button>
		</CardContent>
	</Card>
);

export default UserProfile;
