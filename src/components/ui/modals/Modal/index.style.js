import { makeStyles } from '@material-ui/core';

const sizeMapper = {
	xsmall: 420,
	small: 500,
	medium: 742,
	large: 990,
	xlarge: 1200
};

export const useModalStyles = makeStyles((theme) => ({
	root: {
		padding: '18px 24px !important'
	},

	dialogContentRoot: {
		padding: '4px 24px !important'
	},

	dialogBox: {
		backgroundColor: ({ color }) =>
			color === 'primary'
				? `${theme.palette.normalGrey} !important`
				: `${theme.palette.darkGrey} !important`,
		borderRadius: '8px !important',
		maxWidth: ({ size }) => sizeMapper[size],
		boxShadow: '0px 16px 40px rgba(255, 255, 0, 0.17) !important'
	},

	dialogTitle: {
		fontFamily: `${theme.typography.fontFamily} !important`,
		fontStyle: 'normal !important',
		fontWeight: '700 !important',
		fontSize: ({ size }) =>
			size === 'xsmall' ? '16px !important' : '24px !important',
		lineHeight: ({ size }) => (size === 'xsmall' ? 'unset' : '36px !important'),
		color: theme.palette.white,
		display: 'flex !important',
		justifyContent: 'space-between !important'
	},

	dialogContentText: {
		fontFamily: `${theme.typography.fontFamily} !important`,
		fontStyle: 'normal !important',
		fontWeight: '400 !important',
		fontSize: '16px !important',
		lineHeight: '24px !important',
		color: `${theme.palette.white} !important`
	},

	dialogActions: {
		display: 'flex !important',
		justifyContent: 'space-between !important',
		padding: '0px 24px 20px 24px !important'
	},

	closeIcon: {
		fontSize: ({ size }) =>
			size === 'xsmall' ? '24px !important' : '30px !important',
		color: theme.palette.white,
		marginRight: -6
	},

	closeIconRoot: {
		padding: '0px !important'
	},

	modalBtns: {
		textTransform: 'uppercase'
	}
}));
