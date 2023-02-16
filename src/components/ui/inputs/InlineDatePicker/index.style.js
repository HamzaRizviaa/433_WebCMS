import { makeStyles } from '@material-ui/core';

export const useInlineDatePickerStyles = makeStyles((theme) => ({
	datePickerContainer: {
		'& .react-datepicker': {
			fontFamily: "'Poppins' !important",
			overflow: 'visible !important',
			width: '385px !important',
			fontSize: '1.5rem !important',
			backgroundColor: 'transparent !important',
			border: 'none !important',
			zIndex: '1'
		},

		'& .react-datepicker__month-container': { width: '100% !important' },

		'& .react-datepicker__navigation--next': { right: '0px !important' },

		'& .react-datepicker__navigation--previous': {
			right: '60px !important',
			left: 'unset !important'
		},

		'& .react-datepicker__day--keyboard-selected': {
			background: 'transparent !important'
		},

		'& .react-datepicker__navigation': {
			top: '0px !important',
			padding: '0 !important',
			height: '25px !important'
		},

		'& .react-datepicker__navigation-icon::before': {
			borderColor: theme.palette.white,
			borderWidth: '2px 2px 0 0'
		},

		'& .react-datepicker__month': {
			padding: '10px 0px !important',
			margin: '0px !important',
			marginLeft: '-16px !important',

			'& .react-datepicker__week': {
				'& .react-datepicker__day--disabled': {
					'&:not(.react-datepicker__day--selected)': {
						backgroundColor: 'transparent !important',
						color: 'rgba(255, 255, 255, 0.3) !important',

						'&:hover': {
							backgroundColor: 'transparent !important',
							color: 'rgba(255, 255, 255, 0.3) !important'
						}
					}
				},

				'& .react-datepicker__day--selected': {
					background: '#ffff00 !important',
					color: '#000000 !important',

					'&:hover': {
						background: '#ffff00 !important',
						color: '#000000 !important'
					}
				},

				'& .react-datepicker__day': {
					textAlign: 'center',
					verticalAlign: 'middle',
					color: '#ffffff',
					fontSize: '18px',
					fontWeight: 900,
					padding: '6.5px 4px',
					margin: [[2, 14]],
					borderRadius: '6px',
					width: 22,

					'&:hover': {
						background: '#ffff00 !important',
						color: '#000000 !important'
					}
				},

				'& .react-datepicker__day--today': {
					border: `1px solid ${theme.palette.disabled}`
				},

				'& .react-datepicker__day--outside-month': {
					'&:not(.react-datepicker__day--disabled):not(.react-datepicker__day--range-start):not(.react-datepicker__day--range-end):not(.react-datepicker__day--in-range):not(.react-datepicker__day--selected)':
						{
							color: 'rgba(255, 255, 255, 0.4) !important',

							'&:hover': {
								color: '#000000 !important'
							}
						}
				},

				'& .react-datepicker__day--in-selecting-range-start': {
					backgroundColor: '#ffff00 !important',
					color: '#f0eeee !important',
					marginLeft: '0px !important',
					marginRight: '0px !important'
				},

				'& .react-datepicker__day--in-range': {
					background: '#ffff003d !important',
					color: 'rgb(255, 255, 0, 0.7) !important',
					borderRadius: '0px',
					marginLeft: '0px',
					marginRight: '0px',
					padding: '6.5px 18px',

					'&:has(+ .react-datepicker__day--range-end)': {
						marginRight: '-26px !important',
						paddingRight: '40px !important'
					}
				},

				'& .react-datepicker__day--in-selecting-range': {
					backgroundColor: '#ffff003d !important',
					color: 'rgb(255, 255, 0, 0.7) !important'
				},

				'& .react-datepicker__day--range-start + .react-datepicker__day--range-end':
					{
						backgroundColor: '#ffff00 !important',
						color: '#000000 !important',
						borderRadius: '6px !important',
						marginLeft: '6px !important',
						paddingLeft: '12px !important',
						padding: '6.5px 4px !important',

						'&:hover': {
							marginLeft: '0 !important',
							paddingLeft: '18px !important'
						}
					},

				'& .react-datepicker__day--range-start + .react-datepicker__day--in-range':
					{
						'&:not(.react-datepicker__day--range-end)': {
							marginLeft: '-26px !important',
							paddingLeft: '41px !important',

							'&:hover': {
								marginLeft: '-21px !important',
								paddingLeft: '36px !important'
							}
						}
					},

				'& .react-datepicker__day--range-start': {
					backgroundColor: '#ffff00 !important',
					color: '#000000 !important',
					borderRadius: '6px',
					padding: '6.5px 4px',
					marginLeft: '16px',
					marginRight: '16px'
				},

				'& .react-datepicker__day--range-end': {
					backgroundColor: '#ffff00 !important',
					color: '#000000 !important',
					borderRadius: '6px',
					padding: '6.5px 4px',
					marginLeft: '14px',
					marginRight: '14px',

					'&:not(.react-datepicker__day--range-start)': {
						marginLeft: '16px',
						marginRight: '16px'
					}
				}
			}
		},

		'& .react-datepicker__header': {
			backgroundColor: 'transparent !important',
			color: '#ffffff !important',
			textAlign: 'start !important',
			borderBottom: 'none !important',
			padding: '0px !important',
			borderTopRightRadius: '15px !important',
			borderTopLeftRadius: '15px !important',
			margin: '0 !important',
			marginLeft: '-16px !important',

			'& .react-datepicker__day-names': {
				padding: '16px 15px 4px 15px !important',
				display: 'flex !important',
				justifyContent: 'space-between !important',
				alignItems: 'center !important',

				'& .react-datepicker__day-name': {
					color: '#CCCCCC',
					fontSize: 10,
					fontWeight: 700,
					textTransform: 'uppercase'
				}
			},

			'& .react-datepicker__current-month': {
				color: '#ffffff',
				fontSize: '1.5rem !important',
				fontWeight: '700 !important',
				textAlign: 'start !important',
				textTransform: 'uppercase',
				marginLeft: 16
			}
		}
	}
}));
