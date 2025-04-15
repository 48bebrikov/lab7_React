import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import FeedbackIcon from '@mui/icons-material/Feedback';

const Footer = ({ onFeedbackClick }) => (
	<Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
		<BottomNavigation showLabels>
			<BottomNavigationAction
				label="Обратная связь"
				icon={<FeedbackIcon />}
				onClick={onFeedbackClick} // будет вызывать openFeedback()
			/>
		</BottomNavigation>
	</Paper>
);

export default Footer;
