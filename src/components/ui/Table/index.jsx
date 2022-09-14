import React from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import './_table.scss';
import { useStyles } from './index.style';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const Table = ({ data, columns, onRowClick }) => {
	const classes = useStyles()

	const tableRowEvents = {
		onClick: onRowClick
	};
		return (
			<BootstrapTable
				className={classes.tableContainer}
				keyField='id'
				data={data}
				columns={columns}
				bordered={false}
				headerClasses={classes.tableHeader}
				rowEvents={tableRowEvents}
			//hover
			/>
		)
};

Table.propTypes = {
	data: PropTypes.array.isRequired,
	columns: PropTypes.array.isRequired,
	onRowClick: PropTypes.func.isRequired
};

export default Table;
