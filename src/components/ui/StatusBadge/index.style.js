import { makeStyles } from '@material-ui/core';

export const useStatusBadgeStyles = makeStyles((theme) => {
	const statusToColorMapper = {
		draft: theme.palette.neonYellow,
		published: theme.palette.green,
		active: theme.palette.green,
		closed: theme.palette.red,
		trivia: theme.palette.purple
	};

	return {
		badgeWrapper: {
			display: 'flex',
			alignItems: 'center',
			marginBottom: (props) =>
				!(props.status?.toLowerCase() in statusToColorMapper)
					? '0.8rem'
					: '1.2rem'
		},

		badge: {
			display: 'inline-block',
			color: (props) =>
				props.status?.toLowerCase() === 'draft' ||
				!(props.status?.toLowerCase() in statusToColorMapper)
					? theme.palette.black
					: theme.palette.white,
			textAlign: 'center',
			backgroundColor: (props) =>
				statusToColorMapper[props.status?.toLowerCase()] ||
				theme.palette.neonYellow,
			fontSize: (props) =>
				props.status?.toLowerCase() in statusToColorMapper ? '1.2rem' : '8px',
			fontWeight: 800,
			letterSpacing: '0.03rem',
			height: 'fit-content',
			borderRadius: '24px',
			padding: (props) =>
				props.status?.toLowerCase() in statusToColorMapper
					? '0.6rem 2.5rem'
					: '4px 8px',
			cursor: 'pointer',
			whiteSpace: 'nowrap'
		}
	};
});
