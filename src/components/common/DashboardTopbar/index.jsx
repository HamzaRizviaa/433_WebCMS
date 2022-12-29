import React from 'react';
import PropTypes from 'prop-types';
import { capitalize } from 'lodash';
import Button from '../../ui/Button';
import DateRangeFilter from '../../ui/inputs/DateRangeFilter';
import SearchFilter from '../../ui/inputs/SearchFilter';
import { useTopbarStyles } from './index.style';

const DashboardTopbar = ({
	title,
	onButtonClick,
	secondaryButtonText,
	secondaryButtonClick,
	hideLibraryText = false,
	hideBtn = false,
	hideSearchFilter = false,
	hideDateFilter = false
}) => {
	const classes = useTopbarStyles();

	return (
		<div className={classes.header}>
			<div className={classes.leftSection}>
				<h1 className={classes.title}>
					{title}
					{!hideLibraryText && ' Library'}
				</h1>
				{!hideBtn && (
					<Button
						onClick={onButtonClick}
					>{`UPLOAD ${title?.toUpperCase()}`}</Button>
				)}
				{secondaryButtonText && (
					<div className={classes.secondaryButtonBox}>
						<Button variant={'outlined'} onClick={secondaryButtonClick}>
							{secondaryButtonText.toUpperCase()}
						</Button>
					</div>
				)}
			</div>
			<div className={classes.rightSection}>
				{!hideSearchFilter && (
					<SearchFilter
						placeholder={`Search for ${capitalize(title)}, User, Label, ID`}
					/>
				)}
				{!hideDateFilter && <DateRangeFilter />}
			</div>
		</div>
	);
};

DashboardTopbar.propTypes = {
	title: PropTypes.string.isRequired,
	onButtonClick: PropTypes.func,
	secondaryButtonText: PropTypes.string,
	secondaryButtonClick: PropTypes.func,
	hideBtn: PropTypes.bool,
	hideSearchFilter: PropTypes.bool,
	hideDateFilter: PropTypes.bool,
	hideLibraryText: PropTypes.bool
};

export default DashboardTopbar;
