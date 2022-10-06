import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Pagination from '@material-ui/lab/Pagination';
import { useSearchParams } from 'react-router-dom';
import { changeQueryParameters } from '../../../data/utils/helper';
import { useStyles } from './index.style';

const CustomPagination = ({ totalRecords }) => {
	const noOfPages = Math.ceil(totalRecords / 20);

	const [searchParams, setSearchParams] = useSearchParams();
	const parsedPage = Number(searchParams.get('page'));
	const page = isNaN(parsedPage) ? 1 : parsedPage || 1;

	const [paginationError, setPaginationError] = useState(false);

	const handleChange = (_, value) => {
		const queryParams = changeQueryParameters(searchParams, { page: value });
		setSearchParams(queryParams);
	};

	const handleInputChange = (e) => {
		setPaginationError(false);
		const value = Number(e.target.value);
		if (value > noOfPages || value < 1) {
			setPaginationError(true);
		} else if (value) {
			const queryParams = changeQueryParameters(searchParams, { page: value });
			setSearchParams(queryParams);
		}
	};

	const classes = useStyles({ paginationError });

	return (
		<div className={classes.paginationRow}>
			<Pagination
				className={classes.root}
				page={page}
				onChange={handleChange}
				count={noOfPages}
				variant='outlined'
				shape='rounded'
				defaultPage={page}
			/>
			<div className={classes.gotoText}>Go to page</div>
			<input
				type='number'
				min={1}
				onChange={handleInputChange}
				className={classes.gotoInput}
			/>
		</div>
	);
};

CustomPagination.propTypes = {
	totalRecords: PropTypes.number.isRequired
};

export default CustomPagination;
