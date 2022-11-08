import { makeStyles } from '@material-ui/core';

export const useDraggableBannerLayoutStyles = makeStyles(() => ({
	bannerContent: {
		border: ({ isError }) => (isError ? '1px dashed red' : '1px solid #404040'),
		boxSizing: 'border-box',
		borderRadius: '16px',
		width: '100%',
		padding: '20px 22px 20px 22px',
		margin: ({ isError }) => (isError ? '1% 0% 0% 0%' : '2% 0%'),

		errorMsg: {
			textTransform: 'uppercase',
			fontWeight: 'bold',
			color: 'red',
			marginTop: '1%'
		}
	},
	bannerLayout: {
		display: 'flex'
	},

	dragIconWrapper: {
		paddingTop: '1.2rem'
	},
	dragIcon: {
		cursor: 'grab'
	},
	bannerTrashIcon: {
		paddingTop: '0.8rem',
		paddingLeft: '20px',
		width: '3%'
	}
}));
