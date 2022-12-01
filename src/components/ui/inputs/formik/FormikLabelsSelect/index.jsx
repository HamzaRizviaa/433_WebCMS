/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useField } from 'formik';
import SelectField from '../../SelectField';
import Button from '../../../Button';
import {
	getAllNewLabels,
	getNewLabelsSearch
} from '../../../../../data/features/postsLibrary/postsLibraryActions';
import {
	newLabelsSearch,
	labelsSearchStatus
} from '../../../../../data/selectors/labelsSelectors';
import { useFormikLabelsSelectStyles } from './index.style';

const labelsParams = (labels) => {
	return labels.reduce((accumulator, currentItem, currentIndex) => {
		accumulator[`already_searched[${currentIndex}]`] = currentItem.name;
		return accumulator;
	}, {});
};

const regex = /\W/;

const FormikLabelsSelect = ({ name, placeholder, ...restProps }) => {
	const dispatch = useDispatch();
	const [searchText, setSearchText] = useState('');

	// Formik related stuff
	const [field, meta, helpers] = useField(name);
	const { value: selectedValues } = field;
	const { touched, error } = meta;
	const { setValue, setTouched } = helpers;

	const selectedLabelNames = selectedValues.map((item) => item.name); // Converting array of objects into array of string
	const labelOptions = useSelector(newLabelsSearch); // getting label options list from redux store
	const searchLabelStatus = useSelector(labelsSearchStatus); // getting label API status from redux store.

	// Filtering selected labels from options list
	const filteredLabelOptions = labelOptions.filter(
		(item) => !selectedLabelNames.includes(item.name)
	);

	useEffect(() => {
		dispatch(getAllNewLabels());
	}, []);

	const handleSearchTextChange = (value) => {
		if (value) {
			setSearchText(value.toUpperCase());
			dispatch(
				getNewLabelsSearch({
					q: value.toUpperCase(),
					...(value?.length ? labelsParams(selectedValues) : {})
				})
			);
		} else {
			dispatch(getAllNewLabels());
		}
	};

	const handleChange = (value) => {
		setValue(value);
	};

	const handleBlur = () => {
		setTouched(true);
	};

	const handlePaste = (e) => {
		const newValue = e.clipboardData.getData('Text');

		if (newValue.match(regex)) {
			e.preventDefault();
			e.stopPropagation();
		}
	};

	const handleKeyPress = (e) => {
		const newValue = e.key;

		if (newValue.match(regex) || newValue === 'Enter') {
			e.preventDefault();
			e.stopPropagation();
		}
	};

	const classes = useFormikLabelsSelectStyles();

	// Custom render option for handling API data and loading state
	const renderOption = (option) => {
		const arrayResultedDuplicate = labelOptions.some(
			(data) => data.name === searchText && data.id !== null
		);

		if (option.id === null && !arrayResultedDuplicate) {
			return (
				<span className={classes.createNewLabelWrapper}>
					{option.name || searchText}
					<Button className={classes.createNewLabelBtn} onClick={() => {}}>
						CREATE NEW LABEL
					</Button>
				</span>
			);
		}
		if (option.id === null && selectedLabelNames.includes(option.name)) {
			return <span>Already Selected</span>;
		} else {
			return <span>{option.name}</span>;
		}
	};

	return (
		<SelectField
			{...restProps}
			searchable
			multiple
			filterSelectedOptions
			autoHighlight
			disableClearable
			freeSolo={false}
			name={name}
			placeholder={selectedValues.length > 0 ? '' : placeholder}
			rightLabel={`CURRENT LABELS: ${selectedValues?.length}`}
			isLoading={searchLabelStatus === 'pending'}
			mapOptions={{ labelKey: 'name', valueKey: 'name' }}
			value={selectedValues}
			options={filteredLabelOptions}
			onChange={handleChange}
			onBlur={handleBlur}
			onSearchTextChange={handleSearchTextChange}
			searchBarProps={{ onKeyPress: handleKeyPress, onPaste: handlePaste }}
			error={touched && error ? error : ''}
			renderOption={renderOption}
		/>
	);
};

export default FormikLabelsSelect;
