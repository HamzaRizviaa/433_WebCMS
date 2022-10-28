import React from 'react';
import PropTypes from 'prop-types';
import FormikChipSelect from '../../inputs/formik/FormikChipSelect';
import { useDispatch, useSelector } from 'react-redux';
import {
	getNewLabelsSearch,
	getAllNewLabels
} from '../../../../data/features/postsLibrary/postsLibraryActions';
import { useEffect } from 'react';

const LabelSelect = ({ isEdit, draftStatus, selectedLabels }) => {
	const dispatch = useDispatch();
	const { newLabelsSearch, labelsSearchStatus } = useSelector(
		(state) => state.rootReducer.postsLibrary
	);
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
			name='label'
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

LabelSelect.propTypes = {
	isEdit: PropTypes.bool,
	draftStatus: PropTypes.string,
	selectedLabels: PropTypes.array
};

export default LabelSelect;
