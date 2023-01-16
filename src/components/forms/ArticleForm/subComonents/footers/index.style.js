import { makeStyles } from '@material-ui/core';

export const useArticleFooterStyles = makeStyles((theme) => ({
	footer: {
		marginTop: '20px',
		padding: '20px 40px',
		borderTop: `1px solid ${theme.palette.normalGrey}`,
		width: '95%',
		display: 'flex',
		justifyContent: ({ isEdit }) => (isEdit ? 'space-between' : 'flex-end'),
		borderBottom: '1px solid #000',
		position: 'sticky',
		bottom: -2,
		background: '#000',
		zIndex: 1
	},
	container: {
		display: 'flex',
		marginRight: '20px',

		'& button': {
			marginRight: 10
		}
	},
	draftButton: {
		margin: '0 1rem 0 0',
		pointerEvents: ({ loading }) => (loading ? 'none' : 'auto')
	},
	btn: {
		pointerEvents: ({ loading }) => (loading ? 'none' : 'auto')
	},
	borderColor: {
		border: '1px solid #FF355A'
	}
}));
