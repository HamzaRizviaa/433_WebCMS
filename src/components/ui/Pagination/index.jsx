import React, { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { useStyles } from './index.style';
import { useStyles as globalUseStyles } from '../../../styles/global.style';
import { useSearchParams } from 'react-router-dom';
import { changeQueryParameters } from '../../../utils/helper';
import PropTypes from 'prop-types';

const CustomPagination = ({ totalRecords }) => {
	const muiClasses = useStyles();

	const [searchParams, setSearchParams] = useSearchParams();
	const [page, setPage] = useState(()=> {
		let queryParam = searchParams.get('page')
		if(isNaN(Number(queryParam))){
			return 1
		}
		return Number(queryParam) || 1
	})
    const [paginationError, setPaginationError] = useState(false)
    const classes = globalUseStyles();

    const handleChange = (event, value) => {
		setPage(value);
		let queryParams = changeQueryParameters(searchParams, { page: value });
		setSearchParams(queryParams);
	};

    return (
        <div className={classes.paginationRow}>
					<Pagination
						className={muiClasses.root}
						page={page}
						onChange={handleChange}
						count={Math.ceil(totalRecords / 20)}
						variant='outlined'
						shape='rounded'
						defaultPage={page}
					/>
					<div className={classes.gotoText}>Go to page</div>
					<input
						style={{
							border: `${
								paginationError ? '1px solid red' : '1px solid #808080'
							}`
						}}
						type={'number'}
						min={1}
						onChange={(e) => {
							setPaginationError(false);
							const value = Number(e.target.value);
							if (value > Math.ceil(totalRecords / 20)) {
								setPaginationError(true);
								setPage(1);
								let queryParams = changeQueryParameters(searchParams, { page: value });
								setSearchParams(queryParams);
							} else if (value) {
								setPage(value);
								let queryParams = changeQueryParameters(searchParams, { page: value });
								setSearchParams(queryParams);
							} else {
								setPage(1);
								let queryParams = changeQueryParameters(searchParams, { page: value });
								setSearchParams(queryParams);
							}
						}}
						className={classes.gotoInput}
					/>
		</div>
    )
}

CustomPagination.propTypes = {
    totalRecords: PropTypes.number.isRequired
}

export default CustomPagination;