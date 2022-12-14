import { makeStyles } from '@material-ui/core';

export const useInlineDatePickerStyles = makeStyles((theme) => ({
	datePickerContainer: {
		marginBottom: '1rem',

		'& .react-datepicker': {
			fontFamily: "'Poppins' !important",
			overflow: 'visible !important',
			width: '325px !important',
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
			height: '55px !important'
		},

		'& .react-datepicker__month': {
			padding: '10px 0px !important',
			margin: '0px !important',

			'& .react-datepicker__week': {
				'& .react-datepicker__day': {
					textAlign: 'center',
					verticalAlign: 'middle',
					color: '#ffffff',
					fontSize: '18px',
					fontWeight: 900,
					padding: '6.5px 4px',
					margin: 8,
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
					color: 'rgba(255, 255, 255, 0.3) !important'
				},

				'& .react-datepicker__day--in-selecting-range-start': {
					backgroundColor: '#ffff00 !important',
					color: '#f0eeee !important',
					marginLeft: '0px !important',
					marginRight: '0px !important'
				},

				'& .react-datepicker__day--in-range': {
					background: '#ffff003d',
					color: 'rgb(255, 255, 0, 0.7) !important',
					borderRadius: '0px',
					marginLeft: '0px',
					marginRight: '0px',
					padding: '6.5px 12px',

					'&:has(+ .react-datepicker__day--range-end)': {
						marginRight: '-20px !important',
						paddingRight: '28px !important'
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
						marginLeft: '0px !important',
						paddingLeft: '12px !important',
						padding: '6.5px 4px !important',

						'&:hover': {
							marginLeft: '0 !important',
							paddingLeft: '12px !important'
						}
					},

				'& .react-datepicker__day--range-start + .react-datepicker__day--in-range':
					{
						'&:not(.react-datepicker__day--range-end)': {
							marginLeft: '-20px !important',
							paddingLeft: '28px !important',

							'&:hover': {
								marginLeft: '-15px !important',
								paddingLeft: '22px !important'
							}
						}
					},

				'& .react-datepicker__day--range-start, & .react-datepicker__day--range-end':
					{
						backgroundColor: '#ffff00 !important',
						color: '#000000 !important',
						borderRadius: '6px',
						marginLeft: '10px',
						marginRight: '10px',
						padding: '6.5px 4px'
					},

				'& .react-datepicker__day--disabled': {
					backgroundColor: 'transparent !important',
					color: '#404040 !important',

					'&:hover': {
						backgroundColor: 'transparent !important',
						color: '#404040 !important'
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

			'& .react-datepicker__day-names': {
				padding: '16px 15px 4px 12px !important',
				display: 'flex !important',
				justifyContent: 'space-between !important',
				alignItems: 'center !important',

				'& .react-datepicker__day-name': {
					color: '#ffffff',
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
				padding: '16px 0px !important',
				textTransform: 'uppercase'
			}
		}
	}
}));
