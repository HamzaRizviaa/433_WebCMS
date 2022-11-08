import { makeStyles } from '@material-ui/core';

export const useToggleSwitchStyles = makeStyles(() => ({
	toggleSwitchWrapper: {
		width: '100%',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center'
	},

	toggleSwitch: {
		position: 'relative',
		width: ({ isSmall }) => (isSmall ? '40px' : '65px'),
		display: 'inline-block',
		verticalAlign: 'middle',
		'-webkit-user-select': 'none',
		'-moz-user-select': 'none',
		'-ms-user-select': 'none',
		transform: 'scale(0.75)'
	},

	toggleSwitchCheckbox: {
		display: 'none'
	},

	toggleSwitchLabel: {
		display: 'block',
		overflow: 'hidden',
		border: '0 solid #bbb',
		borderRadius: '20px',
		margin: '0',
		backgroundColor: ({ isDisabled }) => (isDisabled ? '#ddd' : '#bbb'),
		cursor: ({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer'),

		'&:focus': {
			outline: 'none'
		},

		'& > span': {
			'&:focus': {
				outline: 'none'
			}
		}
	},

	toggleSwitchInner: {
		display: 'block',
		width: '200%',
		transition: 'margin 0.3s ease-in 0s',
		marginLeft: ({ isChecked }) => (isChecked ? '0' : '-100%'),

		'&::before': {
			display: 'block',
			float: 'left',
			width: '50%',
			height: ({ isSmall }) => (isSmall ? '20px' : '34px'),
			padding: '0',
			lineHeight: ({ isSmall }) => (isSmall ? '20px' : '34px'),
			fontSize: '14px',
			fontWeight: 'bold',
			boxSizing: 'borderBox',
			content: '""',
			backgroundColor: ({ isDisabled }) => (isDisabled ? '#ddd' : '#ffff00'),
			color: '#fff'
		}
	},

	toggleSwitchCircle: ({ isSmall, isChecked }) => ({
		display: 'block',
		width: isSmall ? '16px' : '24px',
		margin: isSmall ? '2px' : '5px',
		background: isChecked ? '#000' : '#fff',
		position: 'absolute',
		top: '0',
		bottom: '0',
		right: isChecked ? '0px' : isSmall ? '20px' : '30px',
		border: '0 solid #ddd',
		borderRadius: '20px',
		transition: 'all 0.3s ease-in 0s'
	})
}));
