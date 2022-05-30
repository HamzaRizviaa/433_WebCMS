/* eslint-disable no-dupe-keys */
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
	backdrop: {
		zIndex: 5,
		color: 'rgba(0,0,0,0.98)'
	},

	paper: {
		backgroundColor: `#000000 !important`,
		zIndex: 4,
		//  position: relative,
		position: 'fixed',
		right: -2,
		color: '#ffffff',
		top: 0,
		flexGrow: 1,
		minWidth: '50%',
		height: '100vh',
		transform: 'translateZ(0)',
		// The position fixed scoping doesnt work in IE 11.
		// Disable this demo to preserve the others.
		// @media all and (-ms-high-contrast: none) {
		//     display: none;
		// },
		overflowY: 'auto',
		border: '1px solid yellow'
	}
}));
