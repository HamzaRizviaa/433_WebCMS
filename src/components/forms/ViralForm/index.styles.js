import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
	captionContainer: {
		'& h6': {
			marginBottom: '0.5rem',
			marginLeft: '1rem'
		}
	},

	postMediaHeader: {
		width: '100%',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center'
	},

	postMediaContainer: {
		marginTop: '2.5rem'
	},

	mediaContainer: {
		marginTop: '2.5rem',
		'& h6': {
			marginBottom: '0.5rem',
			marginLeft: '1rem'
		}
	},

	buttonDiv: {
		width: '100%',
		marginTop: '3rem',
		display: 'flex',
		justifyContent: 'flex-end'
	},

	publishDraftDiv: {
		display: 'flex'
	},

	addMediaBtn: {
		marginTop: '0.5rem'
	},

	addMediaBtnEdit: {
		marginTop: '0.5rem',
		display: 'inline-block'
	},

	draftBtn: {
		marginTop: '0.5rem'
	},

	draftBtnEdit: {
		marginTop: '0.5rem',
		display: 'inline-block'
	},

	deleteBtnWrapper: {
		width: '100%',
		display: 'flex',
		justifySelf: 'flex-start'
	},

	postBtn: {
		width: '100%'
	},

	postBtnEdit: {
		width: '70%',
		display: 'inline-block'
	},

	fieldWrapper: {
		marginBottom: '1.5rem'
	}
}));
