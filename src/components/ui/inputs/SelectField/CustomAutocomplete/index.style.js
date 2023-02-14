import { makeStyles } from '@material-ui/core';

const sizeMapper = {
	small: {
		height: '1.1rem',
		borderRadius: 22
	},
	medium: {
		height: '1.5rem',
		borderRadius: 22
	},
	large: {
		height: '2.24rem',
		borderRadius: 30
	}
};

export const useAutocompleteStyles = makeStyles((theme) => ({
	paper: {
		maxHeight: 170,
		background: theme.palette.black,
		border: `1px solid ${theme.palette.normalGrey}`,
		boxShadow: '0px 16px 40px rgba(255, 255, 255, 0.16)',
		borderRadius: '8px',
		color: '#ffffff',
		fontSize: '14px',
		fontFamily: 'Poppins !important',
		marginTop: 10,
		borderColor: (props) =>
			props.isError ? theme.palette.red : theme.palette.normalGrey,

		'& ul': {
			padding: 0,

			'& .Mui-selected': {
				color: theme.palette.neonYellow
			},
			'& [data-focus="true"]': {
				color: `${theme.palette.neonYellow} !important`,
				backgroundColor: `${theme.palette.normalGrey} !important`
			}
		},
		'& li': {
			backgroundColor: theme.palette.black,
			color: theme.palette.white,
			fontSize: 14,
			'&:hover': {
				color: `${theme.palette.neonYellow} !important`,
				backgroundColor: `${theme.palette.normalGrey} !important`,
				cursor: 'pointer'
			}
		}
	},

	input: {
		color: theme.palette.white,
		border: `1px solid ${theme.palette.normalGrey}`,
		padding: '0.7rem 1rem 0.7rem 1.5rem !important',
		fontSize: '1.4rem !important',
		fontFamily: 'Poppins !important',
		lineHeight: '1.6 !important',
		borderRadius: ({ size }) => sizeMapper[size]?.borderRadius || '22px',
		backgroundColor: theme.palette.black,
		borderColor: ({ isError }) =>
			isError ? theme.palette.red : theme.palette.normalGrey,

		'& > input': {
			height: ({ size }) => sizeMapper[size]?.height || 'auto',
			padding: 0
		},

		'& > input::placeholder': {
			color: ({ isDisabled }) =>
				isDisabled ? theme.palette.lightGrey : 'unset'
		},

		'&:hover': {
			boxShadow: ({ isDisabled }) =>
				isDisabled ? 'none' : '0px 16px 40px rgba(255, 255, 255, 0.16)'
		},

		'&.Mui-disabled': {
			// 		color: #c4c4c4;
			// background-color: #404040;

			backgroundColor: theme.palette.normalGrey,
			color: theme.palette.lightGrey
		},

		'& .MuiIconButton-label > svg': {
			position: 'absolute',
			color: `${theme.palette.neonYellow} !important`,
			right: '12px !important',
			top: '-7px !important',
			fontSize: '2.6rem'
		}
	},

	noResultText: {
		color: theme.palette.disabled,
		fontSize: 14
	},

	tagYellow: {
		backgroundColor: '#ffff00 !important',
		fontFamily: 'Poppins !important',
		fontStyle: 'normal !important',
		fontWeight: 'bold !important',
		fontSize: '12px !important',
		lineHeight: '24px !important',
		padding: '4px 6px !important',
		marginRight: '3px !important',
		marginLeft: '3px !important',
		marginTop: '2px !important',
		marginBottom: '2px !important',
		'& svg': {
			backgroundColor: '#ffff00 !important', // news library issue
			color: 'black !important',
			fontSize: '20px !important'
		}
	},

	labelsLoader: {
		textAlign: 'center',

		'& > img': {
			height: '50px',
			width: '50px'
		}
	}
}));
