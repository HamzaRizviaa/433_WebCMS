import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { InputAdornment, TextField } from '@material-ui/core';
import { useSearchParams } from 'react-router-dom';
import { ReactComponent as SearchIcon } from '../../../../assets/SearchIcon.svg';
import { useStyles } from './index.styled';
import { changeQueryParameters } from '../../../../utils/helper';

function SearchFilter({ placeholder, isError, errorMessage }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const [search, setSearch] = useState(searchParams.get('q') || '');

	const handleChange = (e) => {
		setSearch(e.target.value);
	};

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			const queryParams = changeQueryParameters(searchParams, { q: search });

			setSearchParams(queryParams);
		}
	};

	const handleClick = () => {
		const queryParams = changeQueryParameters(searchParams, { q: search });

		setSearchParams(queryParams);
	};

	const classes = useStyles({ isError });

	return (
		<div>
			<TextField
				className={classes.searchField}
				value={search}
				onKeyPress={handleKeyPress}
				onChange={handleChange}
				placeholder={placeholder}
				InputProps={{
					disableUnderline: true,
					className: classes.textFieldInput,
					endAdornment: (
						<InputAdornment>
							<SearchIcon
								onClick={handleClick}
								className={classes.searchIcon}
							/>
						</InputAdornment>
					)
				}}
			/>
			<p className={classes.noResultError}>{isError ? errorMessage : ''}</p>
		</div>
	);
}

SearchFilter.propTypes = {
	placeholder: PropTypes.string.isRequired,
	isError: PropTypes.bool,
	errorMessage: PropTypes.string
};

export default SearchFilter;
