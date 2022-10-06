import React from 'react';
import PropTypes from 'prop-types';
import { capitalize } from 'lodash';
import Button from '../../button';
import DateRangeFilter from '../../ui/inputs/DateRangeFilter';
import SearchFilter from '../../ui/inputs/SearchFilter';
import { useTopbarStyles } from './index.style';

const DashboardTopbar = ({
	title,
	onButtonClick,
	isSearchFilterError = false,
	isDateFilterError = false,
	hideBtn = false,
	hideSearchFilter = false,
	hideDateFilter = false
}) => {
	const classes = useTopbarStyles();

	return (
		<div className={classes.header}>
			<div className={classes.leftSection}>
				<h1 className={classes.title}>{title} LIBRARY</h1>
				{!hideBtn && (
					<Button
						onClick={onButtonClick}
						text={`UPLOAD ${title?.toUpperCase()}`}
					/>
				)}
			</div>
			<div className={classes.rightSection}>
				{!hideSearchFilter && (
					<SearchFilter
						placeholder={`Search for ${capitalize(title)}, User, Label, ID`}
						errorMessage='No results found'
						isError={isSearchFilterError}
					/>
				)}
				{!hideDateFilter && (
					<DateRangeFilter
						errorMessage='No results found'
						isError={isDateFilterError}
					/>
				)}
			</div>
		</div>
	);
};

DashboardTopbar.propTypes = {
	title: PropTypes.string.isRequired,
	onButtonClick: PropTypes.func,
	isSearchFilterError: PropTypes.bool,
	isDateFilterError: PropTypes.bool,
	hideBtn: PropTypes.bool,
	hideSearchFilter: PropTypes.bool,
	hideDateFilter: PropTypes.bool
};

export default DashboardTopbar;
