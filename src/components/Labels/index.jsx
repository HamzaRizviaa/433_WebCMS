/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Popper, Autocomplete } from '@mui/material';
import { TextField } from '@material-ui/core';
import Button from '../button';
import ClearIcon from '@material-ui/icons/Clear';
import classes from './_labels.module.scss';

const Labels = ({
	isEdit,
	setDisableDropdown,
	selectedLabels,
	setSelectedLabels,
	LabelsOptions,
	extraLabel,
	handleChangeExtraLabel,
	draftStatus = 'published'
}) => {
	//const regex = /[%<>\\$'"\s@#/-=+&^*()!:;.,?{}[|]]/;
	const regex = /\W/; // all characters that are not numbers and alphabets and underscore

	// let draftLabels = selectedLabels.filter((label) => label.id == -1);
	// let drafts = [];
	// draftLabels.forEach((element) => drafts.push(element.name));
	// let newOptions = LabelsOptions.filter(
	// 	(element) => !drafts.includes(element.name)
	// );

	return (
		<Autocomplete
			disabled={isEdit && draftStatus === 'published'}
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
				// console.log(event, 'change');
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
			noOptionsText={
				<div className={classes.liAutocompleteWithButton}>
					<p>No results found</p>
				</div>
			}
			className={`${classes.autoComplete} ${
				isEdit && draftStatus === 'published' && classes.disableAutoComplete
			}`}
			id='free-solo-2-demo'
			disableClearable
			options={LabelsOptions} //postlabels, medialabels
			renderInput={(params) => (
				<TextField
					{...params}
					placeholder={selectedLabels?.length > 0 ? ' ' : 'Select Label'}
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
			// filterOptions={(options) => {
			// 	let drafts = [];
			// 	let draftLabels = selectedLabels.filter((label) => label.id == -1);
			// 	draftLabels.forEach((element) => drafts.push(element.name));
			// 	let newOptions = options.filter(
			// 		(element) => !drafts.includes(element.name)
			// 	);
			// 	return newOptions;
			// }}
			renderOption={(props, option) => {
				//selected in input field,  some -> array to check exists
				let currentLabelDuplicate = selectedLabels.some(
					(label) => label.name == option.name
				);
				if (option.id == null && !currentLabelDuplicate) {
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
							{option.name}
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
					return (
						<li {...props} className={classes.liAutocomplete}>
							{option.name}
						</li>
					);
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
	draftStatus: PropTypes.string
};

export default Labels;
