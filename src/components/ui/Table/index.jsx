import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import { useSearchParams } from 'react-router-dom';
import CustomPagination from '../Pagination';
import { changeQueryParameters } from '../../../data/utils/helper';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { changeQueryParameters } from '../../../utils/helper';
import { useStyles } from './index.style';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const Table = ({ data, columns, totalRecords, onRowClick }) => {
	const [searchParams, setSearchParams] = useSearchParams();

	const sortState = useMemo(() => {
		const sortBy = searchParams.get('sortBy');
		const orderType = searchParams.get('orderType');
		return { sortBy: sortBy || '', orderType: orderType || '' };
	}, [searchParams]);

	const classes = useStyles();

	const tableRowEvents = {
		onClick: onRowClick
	};

	const sortRows = (order, col) => {
		if (order && col.dataField) {
			if (
				order.toUpperCase() !== sortState.orderType ||
				col.dataField != sortState.sortBy
			) {
				let queryParams = changeQueryParameters(searchParams, {
					sortBy: col.dataField,
					orderType: order.toUpperCase()
				});
				setSearchParams(queryParams);
			}
		}
		if (order === 'asc')
			return <ArrowDropUpIcon className={classes.sortIconSelected} />;
		if (order === 'desc') {
			return <ArrowDropDownIcon className={classes.sortIconSelected} />;
		}
		return <ArrowDropUpIcon className={classes.sortIcon} />;
	};

	const modifiedColumns = useMemo(
		() =>
			columns.map((value) => {
				if (value.dataField !== 'options') {
					return { ...value, sortCaret: sortRows, sortFunc: () => {} };
				}
				return value;
			}),
		[columns]
	);

	return (
		<div>
			<div className={classes.tableContainer}>
				<BootstrapTable
					keyField='id'
					data={data}
					columns={modifiedColumns}
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
