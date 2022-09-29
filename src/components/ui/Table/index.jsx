import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import { useStyles } from './index.style';
import { useSearchParams } from 'react-router-dom';
import CustomPagination from '../Pagination';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { changeQueryParameters } from '../../../utils/helper';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

const sortKeysMapping = {
	media: 'media',
	post_date: 'postdate',
	last_edit: 'lastedit',
	labels: 'label',
	user: 'user',
	status: 'status'
};

const Table = ({ data, columns, totalRecords, onRowClick, onDataReload }) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const sortState = useMemo(() => {
		const sortBy = searchParams.get('sortby');
		const orderType = searchParams.get('order_type');
		return { sortby: sortBy || '', order_type: orderType || '' };
	}, [searchParams]);

	const page = Number(searchParams.get('page')) || 1
	
	const classes = useStyles();

	const tableRowEvents = {
		onClick: onRowClick
	};

	const sortRows = (order, col) => {
		if (order && col.dataField) {
			if (
				order.toUpperCase() != sortState.order_type ||
				sortKeysMapping[col.dataField] != sortState.sortby
			) {
				let queryParams = changeQueryParameters(searchParams, {
					sortby: sortKeysMapping[col.dataField],
					order_type: order.toUpperCase()
				});
				setSearchParams(queryParams);
			}
		}
		if (!order) return <ArrowDropUpIcon className={classes.sortIcon} />;
		else if (order === 'asc')
			return <ArrowDropUpIcon className={classes.sortIconSelected} />;
		else if (order === 'desc') {
			return <ArrowDropDownIcon className={classes.sortIconSelected} />;
		}
		return null;
	};

	const modifiedColumns = columns.map((value) => {
		if (value.dataField !== 'options') {
			return { ...value, sortCaret: sortRows, sortFunc: () => {} };
		}
		return value;
	});

	useEffect(() => {
		onDataReload({...sortState, page})
	},[sortState.sortby, sortState.order_type, page])

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
	onDataReload: PropTypes.func.isRequired,
	totalRecords: PropTypes.number.isRequired
};

export default Table;
