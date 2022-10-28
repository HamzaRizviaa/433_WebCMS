import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import FormikChipSelect from '../FormikChipSelect';
import { useDispatch } from 'react-redux';
import {
	getNewLabelsSearch,
	getAllNewLabels
} from '../../../../../data/features/postsLibrary/postsLibraryActions';
import {
	newLabelsSearch,
	labelsSearchStatus
} from '../../../../../data/selectors/labelsSelectors';

const FormikLabelSelect = ({ name, isEdit, draftStatus, selectedLabels }) => {
	const dispatch = useDispatch();
	const labelName = selectedLabels?.map((label) => label.name);
	let newOptions = newLabelsSearch.filter(
		(element) => !labelName.includes(element.name)
	);

	const labelsParams = (labels) => {
		return labels.reduce((accumulator, currentItem, currentIndex) => {
			accumulator[`already_searched[${currentIndex}]`] = currentItem.name;
			return accumulator;
		}, {});
	};

	useEffect(() => {
		dispatch(getAllNewLabels());
	}, []);

	const handleSearchTextChange = (value) => {
		if (value) {
			dispatch(
				getNewLabelsSearch({
					q: value,
					...(selectedLabels?.length ? labelsParams(selectedLabels) : {})
				})
			);
		} else {
			dispatch(getAllNewLabels());
		}
	};
	return (
		<FormikChipSelect
			name={name}
			title='LABELS'
			disabled={isEdit && draftStatus !== 'draft'}
			newData={newLabelsSearch}
			options={newOptions}
			isLoading={labelsSearchStatus === 'pending' ? true : false}
			onSearchTextChange={handleSearchTextChange}
			placeholder='Select a minimum of 7 labels'
		/>
	);
};

FormikLabelSelect.propTypes = {
	isEdit: PropTypes.bool,
	draftStatus: PropTypes.string,
	selectedLabels: PropTypes.array
};

export default FormikLabelSelect;
