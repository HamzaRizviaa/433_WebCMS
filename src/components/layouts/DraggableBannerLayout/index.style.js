import { makeStyles } from '@material-ui/core';

export const useDraggableBannerLayoutStyles = makeStyles(() => ({
	bannerContent: {
		border: ({ isError }) =>
			isError ? '1px dashed #FF355A' : '1px solid #404040',
		boxSizing: 'border-box',
		borderRadius: '16px',
		width: '100%',
		padding: '20px 22px 0px 22px',
		margin: ({ isError }) => (isError ? '1% 0% 0% 0%' : '2% 0%')
	},
	errorMsg: {
		textTransform: 'uppercase',
		fontWeight: 'bold',
		color: '#FF355A',
		marginBottom: '1rem'
	},
	bannerLayout: {
		display: 'flex',
		alignItems: 'center'
	},

	dragIconWrapper: {
		marginBottom: '1.8rem'
	},
	dragIcon: {
		cursor: 'grab'
	},
	bannerTrashIcon: {
		cursor: 'pointer',
		marginBottom: '2rem',
		marginLeft: '1rem'
	}
}));
