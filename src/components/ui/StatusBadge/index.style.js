import { makeStyles } from '@material-ui/core';

export const useStatusBadgeStyles = makeStyles((theme) => {
	const statusToColorMapper = {
		draft: theme.palette.neonYellow,
		published: theme.palette.green,
		active: theme.palette.green,
		closed: theme.palette.red
	};

	return {
		badgeWrapper: {
			display: 'flex',
			alignItems: 'center',
			marginBottom: '1.2rem'
		},

		badge: {
			display: 'inline-block',
			color: (props) =>
				props.status?.toLowerCase() === 'draft'
					? theme.palette.black
					: theme.palette.white,
			textAlign: 'center',
			backgroundColor: (props) =>
				statusToColorMapper[props.status?.toLowerCase()],
			fontSize: '1.2rem',
			fontWeight: 800,
			letterSpacing: '0.03rem',
			height: 'fit-content',
			borderRadius: '24px',
			padding: '0.6rem 2.5rem',
			cursor: 'pointer',
			whiteSpace: 'nowrap'
		}
	};
});
