/* eslint-disable react/prop-types */
import React from 'react';
import CustomAutocomplete from './CustomAutocomplete';
import CustomSelect from './CustomSelect';

const SelectField = ({
	onSearchTextChange,
	onClearText,
	searchable = false,
	readOnly,
	...rest
}) => {
	return searchable ? (
		<CustomAutocomplete
			onSearchTextChange={onSearchTextChange}
			onClearText={onClearText}
			{...rest}
		/>
	) : (
		<CustomSelect readOnly={readOnly} {...rest} />
	);
};

export default SelectField;
