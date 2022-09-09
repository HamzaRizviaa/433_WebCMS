import React, { useContext } from 'react';
import Pagination from '@mui/material/Pagination';
import { useStyles } from '../../../utils/styles';
import { useStyles as globalUseStyles } from '../../../styles/global.style';
import { PaginationContext } from '../../../utils/context';
import PropTypes from 'prop-types';

const CustomPagination = ({ totalRecords }) => {
    const [page, setPage] = useContext(PaginationContext)
    const [paginationError, setPaginationError] = useContext(PaginationContext)
    const muiClasses = useStyles();
    const classes = globalUseStyles();

    const handleChange = (event, value) => {
		setPage(value);
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
							} else if (value) {
								setPage(value);
							} else {
								setPage(1);
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