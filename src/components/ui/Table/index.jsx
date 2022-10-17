import React from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import { useSearchParams } from 'react-router-dom';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import CustomPagination from '../Pagination';
import NoDataIndicator from './NoDataIndicator';
import { changeQueryParameters } from '../../../data/utils/helper';
import { useStyles } from './index.style';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const Table = ({
	data,
	columns,
	totalRecords,
	onRowClick,
	isLoading,
	noDataText
}) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const sortBy = searchParams.get('sortBy');
	const orderType = searchParams.get('orderType');

	const classes = useStyles({ isEmpty: totalRecords === 0 });

	const sortCaret = (_, column) => {
		if (orderType === 'asc' && sortBy === column.dataField)
			return <ArrowDropUpIcon className={classes.sortIconSelected} />;
		if (orderType === 'desc' && sortBy === column.dataField) {
			return <ArrowDropDownIcon className={classes.sortIconSelected} />;
		}
		return <ArrowDropUpIcon className={classes.sortIcon} />;
	};

	const handleTableChange = (type, { sortOrder, sortField }) => {
		if (type === 'sort' && sortOrder && sortField) {
			if (sortOrder !== orderType || sortField !== sortBy) {
				const queryParams = changeQueryParameters(searchParams, {
					sortBy: sortField,
					orderType: sortOrder,
					page: null
				});

				setSearchParams(queryParams);
			}
		}
	};

	const sort = {
		sortCaret
	};

	const tableRowEvents = {
		onClick: onRowClick
	};

	const noDataIndication = isLoading ? undefined : (
		<NoDataIndicator noDataText={noDataText} />
	);

	return (
		<div className={classes.tableWrapper}>
			<div className={classes.tableContainer}>
				<BootstrapTable
					keyField='id'
					data={data}
					columns={columns}
					bordered={false}
					headerClasses={classes.tableHeader}
					rowEvents={tableRowEvents}
					sort={sort}
					noDataIndication={noDataIndication}
					remote={{ sort: true }}
					onTableChange={handleTableChange}
				/>
			</div>
			{totalRecords > 0 && <CustomPagination totalRecords={totalRecords} />}
		</div>
	);
};

Table.propTypes = {
	data: PropTypes.array.isRequired,
	columns: PropTypes.array.isRequired,
	onRowClick: PropTypes.func.isRequired,
	totalRecords: PropTypes.number.isRequired,
	isLoading: PropTypes.bool,
	noDataText: PropTypes.string
};

export default Table;
