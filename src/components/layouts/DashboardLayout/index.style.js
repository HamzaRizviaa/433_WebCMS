import { makeStyles } from '@material-ui/core';

export const useLayoutStyles = makeStyles({
	root: {
		display: 'flex'
	},

	contentWrapper: {
		padding: '2.5rem 2rem 0rem 2rem',
		width: '100%'
	},

	libraryLoader: {
		width: '20%',
		height: 'auto'
	}
});
