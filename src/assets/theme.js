import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
	overrides: {
		MuiStepper: {
			root: {
				fontFamily: '"Poppins", sans-serif',
				fontSize: 14,
				padding: 10,
				backgroundColor: '#000000'
			}
		},
		MuiStepConnector: {
			line: {
				borderColor: '#4d4d4d'
			}
		},
		MuiStepIcon: {
			root: {
				color: '#4d4d4d'
			},
			active: {
				color: '#ffff00 !important',

				'& > text': {
					fill: '#000 !important'
				}
			},
			completed: {
				color: '#ffff00 !important',

				'& > text': {
					fill: '#000 !important'
				}
			},
			text: {
				fontSize: 14,
				fontWeight: 700,
				paddingTop: 10,
				fill: '#b3b3b3'
			}
		},
		MuiStepLabel: {
			root: {
				'& .MuiSvgIcon-root': {
					fontSize: '2.5rem'
				}
			},
			label: {
				fontSize: 16,
				fontWeight: '700 !important',
				color: '#ffffff !important'
			}
		},
		MuiStepContent: {
			root: {
				fontSize: 14,
				color: '#ffffff',
				borderLeft: '1px solid #4d4d4d'
			}
		}
	},

	components: {
		textFieldInput: {
			color: '#ffffff',
			border: ' 0.01px solid #404040',
			padding: '1rem 1rem 1rem 1.5rem !important',
			fontSize: '1.4rem !important',
			fontFamily: 'Poppins !important',
			lineHeight: '1.6 !important',
			borderRadius: '22px',
			marginBottom: '1rem',
			backgroundColor: '#000000',
			'& svg': {
				position: 'absolute',
				color: '#ffff00',
				right: '2rem !important',
				top: '-9px !important',
				fontSize: '3rem'
			}
		},
		preventSelect: {
			userSelect: 'none !important'
		},
		textFieldInputStartAdornment: {
			color: 'white !important',
			border: '0.01px solid #404040',
			padding: ' 1rem 1rem 1rem 1.5rem !important',
			fontSize: '1.4rem !important',
			fontFamily: 'Poppins !important',
			lineHeight: '1.6 !important',
			borderRadius: '40px',
			marginBottom: '1rem',
			backgroundColor: '#000000'
		}
	},
	palette: {
		primary: {
			main: '#000000'
		},
		black: '#000000',
		white: '#ffffff',
		neonYellow: '#ffff00',
		normalGrey: '#404040',
		darkGrey: '#333333',
		lightGrey: '#c4c4c4',
		lightGreen: '#00d87d',
		disabled: '#808080',
		red: '#ff355a',
		orange: '#f68216',
		green: '#00D87D',
		pink: '#ffc0cb',
		black60: '#666666',
		black90: '#1A1A1A',
		black80: '#333333',
		purple: '#9581FF',
		darkOrange: '#D68910'
	},
	typography: {
		fontFamily: ['Poppins', 'sans-serif'].join(','),
		h1: {
			fontSize: 48
		}
	}
});

export default theme;
