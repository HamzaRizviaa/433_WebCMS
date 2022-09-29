import React from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import './_table.scss';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const Table = ({ data, columns, rowEvents }) => (
	<BootstrapTable
		className={'table'}
		keyField='id'
		data={data}
		columns={columns}
		bordered={false}
		headerClasses={'table-header'}
		rowEvents={rowEvents}
		//hover
	/>
);

Table.propTypes = {
	data: PropTypes.array.isRequired,
	columns: PropTypes.array.isRequired,
	rowEvents: PropTypes.func.isRequired
};

export default Table;