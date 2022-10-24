import { makeStyles } from '@material-ui/core';

export const useToggleSwitchStyles = makeStyles((theme) => ({
	toggleSwitch: {
		'& .toggle-switch': {
			position: 'relative',
			width: '65px',
			display: 'inline-block',
			verticalAlign: 'middle',
			webkitUserSelect: 'none',
			mozUserSelect: 'none',
			msUserSelect: 'none',
			textAlign: 'left'
		}
	},
	toggleSwitchCheckbox: {
		'& .checkbox': {
			display: 'none'
		}
	},
	toggleSwitchLabel: {
		'& .label': {
			display: 'block',
			overflow: 'hidden',
			cursor: 'pointer',
			border: '0 solid #bbb',
			borderRadius: '20px',
			margin: '0',
			'&:focus': {
				outline: 'none',
				'& > span': {
					'&:focus': {
						outline: 'none'
					}
				}
			}
		}
	},
	toggleSwitchInner: {
		'& .inner': {
			display: 'block',
			width: '200%',
			marginLeft: '-100%',
			transition: 'margin 0.3s ease-in 0s',
			'&:before,&:after': {
				display: 'block',
				float: 'left',
				width: '50%',
				height: '34px',
				padding: '0',
				lineHeight: '34px',
				fontSize: '14px',
				color: 'white',
				fontWeight: 'bold',
				boxSizing: 'borderBox'
			},
			'&:after': {
				content: 'attr(data-no)',
				textTransform: 'uppercase',
				paddingRight: '10px',
				backgroundColor: '#bbb',
				color: '#fff',
				textAlign: 'right'
			},
			'&:before': {
				content: 'attr(data-yes)',
				textTransform: 'uppercase',
				paddingLeft: '10px',
				backgroundColor: '#ffff00',
				color: '#fff'
			}
		}
	},
	toggleSwitchDisabled: {
		'& .disabled': {
			backgroundColor: '#ddd',
			cursor: 'not-allowed',
			'&:before': {
				backgroundColor: '#ddd',
				cursor: 'not-allowed'
			}
		}
	},
	toggleSwitch2: {
		'& .switch': {
			display: 'block',
			width: '24px',
			margin: '5px',
			background: '#fff',
			position: 'absolute',
			top: '0',
			bottom: '0',
			right: '30px',
			border: '0 solid #ddd',
			borderRadius: '20px',
			transition: 'all 0.3s ease-in 0s'
		}
	},
	toggleSmallSwitch: {
		'& .small-switch': {
			width: '40px',
			'& .toggle-switch-inner': {
				'& :after :before': {
					content: '',
					height: '20px',
					lineHeight: '20px'
				}
			},
			'& .toggle-switch-switch': {
				width: '16px',
				right: '20px',
				margin: '2px'
			}
		}
	}
}));
