import { makeStyles } from '@material-ui/core';

export const useSettingsLayoutStyles = makeStyles((theme) => ({
	settingsLayoutWrapper: {
		// display: 'flex',
		// alignItems: 'flex-start',
		// flexDirection: 'column',
		backgroundColor: theme.palette.primary.main,
		border: `1px solid ${theme.palette.black80}`,
		borderRadius: '8px',
		padding: '24px',
		margin: '20px 0px',
		gap: '16px'
	},
	title: {
		fontSize: '16px',
		lineHeight: '24px',
		fontWeight: '700',
		marginBottom: '4px'
	}
}));
