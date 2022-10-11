import React, { useMemo, useCallback } from 'react';
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

	const sortCaret = useCallback((order) => {
		if (order === 'asc')
			return <ArrowDropUpIcon className={classes.sortIconSelected} />;
		if (order === 'desc') {
			return <ArrowDropDownIcon className={classes.sortIconSelected} />;
		}
		return <ArrowDropUpIcon className={classes.sortIcon} />;
	}, []);

	const sortFunc = useCallback(
		(a, b, order, dataField) => {
			if (order && dataField) {
				if (order !== orderType || dataField !== sortBy) {
					const queryParams = changeQueryParameters(searchParams, {
						sortBy: dataField,
						orderType: order,
						page: null
					});

					setSearchParams(queryParams);
				}
			}
		},
		[searchParams, sortBy, orderType]
	);

	const sort = useMemo(
		() => ({
			sortCaret,
			sortFunc
		}),
		[sortFunc, sortCaret]
	);

	const defaultSorted = useMemo(
		() => [
			{
				dataField: sortBy || '',
				order: orderType || 'asc'
			}
		],
		[]
	);

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
					defaultSorted={defaultSorted}
					noDataIndication={noDataIndication}
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
