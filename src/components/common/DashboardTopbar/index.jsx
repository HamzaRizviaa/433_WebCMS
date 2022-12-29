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
	hideLibraryText = false,
	hideBtn = false,
	hideSearchFilter = false,
	hideDateFilter = false,
	onTemplateButtonClick,
	hideTemplateBtn = false
}) => {
	const classes = useTopbarStyles();

	return (
		<div className={classes.header}>
			<div className={classes.leftSection}>
				<h1 className={classes.title}>
					{title}
					{!hideLibraryText && ' Library'}
				</h1>
				<div className={classes.buttonsSection}>
					{!hideBtn && (
						<Button
							onClick={onButtonClick}
							text={`UPLOAD ${title?.toUpperCase()}`}
						/>
					)}
					{title === 'Article' && !hideTemplateBtn && (
						<Button
							button2
							className={classes.templateButton}
							onClick={onTemplateButtonClick}
							text={'TEMPLATES'}
						/>
					)}
				</div>
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
	onTemplateButtonClick: PropTypes.func,
	hideTemplateBtn: PropTypes.func,
	hideBtn: PropTypes.bool,
	hideSearchFilter: PropTypes.bool,
	hideDateFilter: PropTypes.bool,
	hideLibraryText: PropTypes.bool
};

export default DashboardTopbar;
