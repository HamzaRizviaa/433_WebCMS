import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => {
	const notificationStatusToColorMapper = {
		draft: theme.palette.black60,
		scheduled: theme.palette.neonYellow,
		published: theme.palette.neonYellow
	};

	return {
		libraryToolTip: {
			backgroundColor: ' #000000 !important',
			fontFamily: 'Poppins !important',
			fontSize: '12px !important',
			lineHeight: '16px !important',
			borderRadius: '8px !important',
			maxWidth: 'none !important'
		},

		libraryToolTipArrow: {
			color: `#000000 !important`
		},

		editIcon: {
			width: '2.5rem',
			height: 'auto',
			cursor: 'pointer',
			marginBottom: '1rem'
		},

		tableCell: {
			marginBottom: '1.5rem',
			fontSize: '1.2rem',
			paddingRight: '30px',
			display: 'block',
			maxWidth: '80%',
			textOverflow: 'ellipsis',
			overflow: 'hidden',
			whiteSpace: 'nowrap',
			textTransform: 'capitalize'
		},

		textWithIconWrapper: {
			display: 'flex',
			alignItems: 'center',
			marginBottom: '1.5rem',
			fontSize: '1.2rem',
			paddingRight: 18
		},

		iconWrapper: { marginRight: '10px', minWidth: '20px' },

		optionsWrapper: {
			display: 'flex'
		},

		notificationIcon: {
			marginBottom: 10,
			marginLeft: ({ notificationStatus }) =>
				notificationStatus === '' ? '2px' : '0px',

			'& path': {
				fill: ({ notificationStatus }) =>
					notificationStatus === ''
						? 'gray'
						: notificationStatusToColorMapper[notificationStatus]
			}
		}
	};
});
