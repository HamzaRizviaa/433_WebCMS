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
	setNewLabels
}) => {
	const regex = /[!@#$%^&*(),.?":{}|<>\\\s]/g;
	//const regex = /[\s]/g;

	return (
		<Autocomplete
			disabled={isEdit}
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
			// onKeyUp={(event) => {
			// 	event.target.value.replace('/[^a-zA-Z0-9]/', '');
			// 	console.log(event);
			// 	// if (event.key === ' ') {
			// 	// 	event.preventDefault();
			// 	// 	event.stopPropagation();
			// 	// }
			// }}
			onKeyUp={(e) => {
				let regexCheck = regex.test(e.target.value);
				console.log(regexCheck);
				if (regexCheck) {
					e.preventDefault();
					e.stopPropagation();
					return false;
				}
			}}
			onChange={(event, newValue) => {
				setDisableDropdown(true);

				// newValue.map((label) => {
				// 	return label.name.replace(/[^a-zA-Z0-9]/g, '');
				// });
				// let regexCheck = regex.replace(regex, '');

				// if (regexCheck) {
				// 	return false;
				// } else {
				let newLabels = newValue.filter(
					(v, i, a) =>
						a.findIndex(
							(t) => t.name.toLowerCase() === v.name.toLowerCase()
						) === i
				);
				setSelectedLabels([...newLabels]);
				//}
				// setSelectedLabels([...newLabels]);
				console.log(newValue);
				setNewLabels(newLabels);
			}}
			popupIcon={''}
			noOptionsText={
				<div className={classes.liAutocompleteWithButton}>
					<p>No results found</p>
				</div>
			}
			className={`${classes.autoComplete} ${
				isEdit && classes.disableAutoComplete
			}`}
			id='free-solo-2-demo'
			disableClearable
			options={LabelsOptions} //postlabels, medialabels
			renderInput={(params) => (
				<TextField
					{...params}
					placeholder={selectedLabels.length ? ' ' : 'Select Label'}
					className={classes.textFieldAuto}
					value={extraLabel}
					onChange={handleChangeExtraLabel}
					InputProps={{
						disableUnderline: true,
						className: classes.textFieldInput,
						...params.InputProps
					}}
					// onChange={(e) => {
					// 	if (e.target.value.match(/[\s]/)) {
					// 		e.preventDefault();
					// 	}
					// }}
				/>
			)}
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
	setNewLabels: PropTypes.func
};

export default Labels;
