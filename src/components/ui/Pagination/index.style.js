import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
	root: {
		'& .MuiPagination-ul': {
			display: 'flex',
			justifyContent: 'flex-end',
			'& > li:first-child': {
				'& button': {
					borderRadius: '8px',
					border: '1px solid #808080',
					width: '32',
					height: '32',
					color: 'white'
				}
			},
			'& > li:last-child': {
				'& button': {
					borderRadius: '8px',
					border: '1px solid #808080',
					width: '32',
					height: '32',
					color: 'white'
				}
			}
		},
		'& .Mui-selected': {
			backgroundColor: 'transparent !important',
			color: 'yellow',
			border: '1px solid yellow',
			borderRadius: '8px',
			fontSize: '12px',
			fontWeight: '700',
			lineHeight: '16px',
			letterSpacing: '0.03em'
		},
		'& ul > li:not(:first-child):not(:last-child) > button:not(.Mui-selected)':
			{
				background: 'transparent',
				border: '1px solid #808080',
				color: '#ffffff',
				height: '32px',
				width: '32px',
				borderRadius: '8px',
				fontSize: '12px',
				fontWeight: '700',
				lineHeight: '16px',
				letterSpacing: '0.03em'
			},
		'& .MuiPaginationItem-ellipsis': {
			color: '#ffffff',
			fontSize: '12px',
			fontWeight: '700',
			lineHeight: '16px',
			letterSpacing: '0.03em'
		},
		'& .MuiPaginationItem-icon': {
			fontSize: '2rem !important'
		},
		'& .Mui-disabled': {
			background: '#808080',
			opacity: 0.4
		},
		'&. Mui-focused': {
			display: 'none !important'
		}
	}
}));
