import React from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import { useStyles } from './index.style';
import CustomPagination from '../Pagination';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const Table = ({ data, columns, totalRecords, onRowClick }) => {
	const classes = useStyles();

	const tableRowEvents = {
		onClick: onRowClick
	};
	return (
		<div>
			<div className={classes.tableContainer}>
				<BootstrapTable
					keyField='id'
					data={data}
					columns={columns}
					bordered={false}
					headerClasses={classes.tableHeader}
					rowEvents={tableRowEvents}
				/>
			</div>
			<CustomPagination totalRecords={totalRecords} />
		</div>
	);
};

Table.propTypes = {
	data: PropTypes.array.isRequired,
	columns: PropTypes.array.isRequired,
	onRowClick: PropTypes.func.isRequired,
	totalRecords: PropTypes.number.isRequired
};

export default Table;
