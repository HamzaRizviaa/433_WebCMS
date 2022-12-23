import { makeStyles } from '@material-ui/core';

export const useSettingsLayoutStyles = makeStyles((theme) => ({
	settingsLayoutWrapper: {
		backgroundColor: theme.palette.primary.main,
		border: `1px solid ${theme.palette.black80}`,
		borderRadius: '8px',
		padding: '24px',
		marginBottom: '20px',
		gap: '16px'
	},
	title: {
		fontSize: '16px',
		lineHeight: '24px',
		fontWeight: '700',
		marginBottom: '4px'
	}
}));
