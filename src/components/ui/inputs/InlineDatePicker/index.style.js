import { makeStyles } from '@material-ui/core';

export const useInlineDatePickerStyles = makeStyles(() => ({
	datePickerContainer: {
		marginBottom: '1rem',

		'& .react-datepicker': {
			fontFamily: "'Poppins' !important",
			overflow: 'visible !important',
			width: '350px !important',
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
				display: 'flex !important',
				justifyContent: 'space-between !important',
				alignItems: 'center !important',

				'& .react-datepicker__day': {
					textAlign: 'center !important',
					color: '#ffffff !important',
					fontSize: '1.5rem !important',
					padding: '8px 12px !important',
					borderRadius: '0px !important',

					'&:hover': {
						background: '#ffff00 !important',
						color: '#000000 !important'
					}
				},

				'& .react-datepicker__day--outside-month': {
					color: '#404040 !important'
				},

				'& .react-datepicker__day--in-selecting-range-start': {
					backgroundColor: '#ffff00 !important',
					color: '#f0eeee !important'
				},

				'& .react-datepicker__day--in-range': {
					background: '#ffff003d !important'
				},

				'& .react-datepicker__day--in-selecting-range': {
					backgroundColor: '#ffff003d !important'
				},

				'& .react-datepicker__day--range-start, & .react-datepicker__day--range-end':
					{
						backgroundColor: '#ffff00 !important',
						color: '#000000 !important'
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
				padding: '16px 10px 8px 10px !important',
				display: 'flex !important',
				justifyContent: 'space-between !important',
				alignItems: 'center !important',

				'& .react-datepicker__day-name': {
					color: '#ffffff',
					fontSize: '1.5rem !important'
				}
			},

			'& .react-datepicker__current-month': {
				color: '#ffffff',
				fontSize: '1.5rem !important',
				fontWeight: '700 !important',
				textAlign: 'start !important',
				padding: '16px 0px !important'
			}
		}
	}
}));
