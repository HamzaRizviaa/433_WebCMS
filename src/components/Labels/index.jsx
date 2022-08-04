/* eslint-disable no-unused-vars */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Paper, Popper, Autocomplete } from '@mui/material';
import { TextField } from '@material-ui/core';
import Button from '../button';
import ClearIcon from '@material-ui/icons/Clear';
import classes from './_labels.module.scss';
import Four33Loader from '../../assets/Loader_Yellow.gif';
//new labels search
import { useDispatch, useSelector } from 'react-redux';
import { getNewLabelsSearch } from '../../pages/PostLibrary/postLibrarySlice';
import _debounce from 'lodash/debounce';

const Labels = ({
	isEdit,
	setDisableDropdown,
	selectedLabels,
	setSelectedLabels,
	LabelsOptions,
	extraLabel,
	// handleChangeExtraLabel,
	draftStatus = 'published',
	setExtraLabel
}) => {
	//const regex = /[%<>\\$'"\s@#/-=+&^*()!:;.,?{}[|]]/;
	const regex = /\W/; // all characters that are not numbers and alphabets and underscore

	//------------------------------new labels

	const dispatch = useDispatch();
	const { newLabelsSearch, labelsSearchStatus } = useSelector(
		(state) => state.postLibrary
	);

	let draftLabels = selectedLabels.filter((label) => label.id == -1);
	let drafts = [];
	draftLabels.forEach((element) => drafts.push(element.name));
	let newOptions = newLabelsSearch.filter(
		(element) => !drafts.includes(element.name)
	);

	console.log(newLabelsSearch, 'ls');

	const labelsParams = (labels) => {
		return labels.reduce((accumulator, currentItem, currentIndex) => {
			accumulator[`already_searched[${currentIndex}]`] = currentItem.name;
			return accumulator;
		}, {});
	};

	const handleDebounceFun = () => {
		let _search;
		setExtraLabel((prevState) => {
			_search = prevState;
			return _search;
		});

		if (_search) {
			dispatch(
				getNewLabelsSearch({
					q: _search,
					...(selectedLabels.length ? labelsParams(selectedLabels) : {})
				})
			);
		}
	};

	const debounceFun = useCallback(_debounce(handleDebounceFun, 600), [
		selectedLabels
	]);

	const handleChangeExtraLabel = (e) => {
		setExtraLabel(e.target.value.toUpperCase());
		debounceFun(e.target.value.toUpperCase());
	};

	return (
		<Autocomplete
			disabled={isEdit && draftStatus !== 'draft'}
			getOptionLabel={(option) => option.name} // setSelectedLabels name out of array of strings
			PaperComponent={(props) => {
				setDisableDropdown(false);
				return (
					<Paper
						elevation={6}
						className={classes.popperAuto}
						style={{
							marginTop: '12px',
							background: 'black',
							border: '1px solid #404040',
							boxShadow: '0px 16px 40px rgba(255, 255, 255, 0.16)',
							borderRadius: '8px'
						}}
						{...props}
					/>
				);
			}}
			PopperComponent={({ style, ...props }) => (
				<Popper {...props} style={{ ...style, height: 0 }} />
			)}
			ListboxProps={{
				style: { maxHeight: 180 },
				position: 'bottom'
			}}
			onClose={() => {
				setDisableDropdown(true);
			}}
			multiple
			filterSelectedOptions
			freeSolo={false}
			value={selectedLabels}
			autoHighlight={true}
			onChange={(event, newValue) => {
				setDisableDropdown(true);
				let newLabels = newValue?.filter(
					(v, i, a) =>
						a.findIndex(
							(t) => t.name.toLowerCase() === v.name.toLowerCase()
						) === i
				);
				setSelectedLabels([...newLabels]);
			}}
			popupIcon={''}
			//loader implement
			// <div className={classes.liAutocompleteWithButton}>
			// 	<p>No results found</p>
			// </div>
			noOptionsText={
				labelsSearchStatus === 'pending' ? (
					<div className={classes.labelsLoader}>
						<img src={Four33Loader} />
					</div>
				) : (
					''
				)
			}
			className={`${classes.autoComplete} ${
				isEdit && draftStatus !== 'draft' && classes.disableAutoComplete
			}`}
			id='free-solo-2-demo'
			disableClearable
			// options={isEdit && draftStatus === 'draft' ? newOptions : LabelsOptions} //old labels
			options={isEdit && draftStatus === 'draft' ? newOptions : newLabelsSearch} // new labels on search
			renderInput={(params) => (
				<TextField
					{...params}
					placeholder={
						selectedLabels?.length > 0 ? ' ' : 'Select a minimum of 7 labels'
					}
					className={classes.textFieldAuto}
					value={extraLabel}
					onChange={handleChangeExtraLabel}
					InputProps={{
						disableUnderline: true,
						className: classes.textFieldInput,
						...params.InputProps
					}}
					onPaste={(e) => {
						const newValue = e.clipboardData.getData('Text');
						if (newValue.match(regex)) {
							e.preventDefault();
							e.stopPropagation();
						}
					}}
					onKeyPress={(e) => {
						const newValue = e.key;
						if (newValue.match(regex)) {
							e.preventDefault();
							e.stopPropagation();
						}
					}}
				/>
			)}
			renderOption={(props, option) => {
				//selected in input field,  some -> array to check exists

				let currentLabelDuplicate = selectedLabels.some(
					(label) => label.name == option.name
				);

				let arrayResultedDuplicate = newLabelsSearch.some(
					(label) => label.name == extraLabel && label.id !== null
				);

				if (
					option.id === null &&
					!currentLabelDuplicate &&
					!arrayResultedDuplicate
				) {
					return (
						<li
							{...props}
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between'
							}}
							className={classes.liAutocomplete}
						>
							{option.name || extraLabel}
							<Button
								text='CREATE NEW LABEL'
								style={{
									padding: '3px 12px',
									fontWeight: 700
								}}
								onClick={() => {}}
							/>
						</li>
					);
				} else if (!currentLabelDuplicate) {
					if (arrayResultedDuplicate && option.id == null) {
						return null;
					} else {
						return (
							<li {...props} className={classes.liAutocomplete}>
								{option.name}
							</li>
						);
					}
				} else {
					return (
						<div className={classes.liAutocompleteWithButton}>
							&apos;{option.name}&apos; is already selected!
						</div>
					);
				}
			}}
			ChipProps={{
				className: classes.tagYellow,
				size: 'small',
				deleteIcon: <ClearIcon />
			}}
			clearIcon={''}
		/>
	);
};

Labels.propTypes = {
	isEdit: PropTypes.bool,
	setDisableDropdown: PropTypes.func,
	selectedLabels: PropTypes.array,
	setSelectedLabels: PropTypes.func,
	LabelsOptions: PropTypes.array,
	extraLabel: PropTypes.string,
	handleChangeExtraLabel: PropTypes.func,
	draftStatus: PropTypes.string,
	setExtraLabel: PropTypes.func
};

export default Labels;
