import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
	tableWrapper: {
		pointerEvents: ({ isEmpty }) => (isEmpty ? 'none' : 'auto')
	},

	tableContainer: {
		margin: ' 1rem 0rem',
		'& .table': {
			width: '100%',
			borderCollapse: 'separate',
			borderSpacing: '0px 10px',
			'& tr th': {
				position: 'relative'
			},
			'& thead': {
				display: 'table',
				width: '98.7%',
				tableLayout: 'fixed',
				'& .sortable': {
					paddingLeft: '1.5rem'
				}
			},
			'& tbody': {
				display: 'block',
				maxHeight: 'calc(100vh - 200px)',
				minHeight: 'calc(100vh - 200px)',
				overflowY: 'auto',
				overflowX: 'hidden',
				'& tr': {
					display: 'table',
					width: '100%',
					tableLayout: 'fixed',
					cursor: 'pointer',
					'& td': {
						borderBottom: '1px solid #404040'
					},

					'& .react-bs-table-no-data': {
						borderBottom: 0
					}
				}
			}
		}
	},

	tableHeader: {
		'& th': {
			fontSize: '1rem',
			fontWeight: 'bold',
			letterSpacing: '0.03rem',
			textAlign: 'initial',
			textTransform: 'uppercase'
		}
	},

	sortIcon: {
		position: 'absolute',
		left: '-4px',
		bottom: '1.5px',
		height: '2rem !important',
		width: '2rem !important'
	},

	sortIconSelected: {
		position: 'absolute',
		left: '-4px',
		bottom: '1.5px',
		height: '2rem !important',
		width: ' 2rem !important',
		color: theme.palette.neonYellow
	},

	noDataText: {
		height: 'calc(100vh - 230px)',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	}
}));
