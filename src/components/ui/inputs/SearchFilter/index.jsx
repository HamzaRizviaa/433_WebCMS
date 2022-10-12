import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { InputAdornment, TextField } from '@material-ui/core';
import { useSearchParams } from 'react-router-dom';
import { ReactComponent as SearchIcon } from '../../../../assets/SearchIcon.svg';
import { useStyles } from './index.styled';
import { changeQueryParameters } from '../../../../data/utils/helper';

function SearchFilter({ placeholder, isError, errorMessage }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const query = searchParams.get('q');

	const [search, setSearch] = useState(query || '');

	useEffect(() => {
		setSearch(query || '');
	}, [query]);

	const handleChange = (e) => {
		const { value } = e.target;
		setSearch(value);

		if (!value) {
			const queryParams = changeQueryParameters(searchParams, {
				q: null,
				page: null
			});

			setSearchParams(queryParams);
		}
	};

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			const queryParams = changeQueryParameters(searchParams, {
				q: search,
				page: null
			});

			setSearchParams(queryParams);
		}
	};

	const handleClick = () => {
		const queryParams = changeQueryParameters(searchParams, {
			q: search,
			page: null
		});

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
						<InputAdornment position='end'>
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
