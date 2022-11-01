import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Paper, Popper, Autocomplete, TextField } from '@mui/material';
import { useChipSelectStyles } from './index.style';
import ClearIcon from '@material-ui/icons/Clear';
import Four33Loader from '../../../../assets/Loader_Yellow.gif';

const ChipsSelectField = ({
	name,
	title,
	selectedData,
	error,
	disabled,
	newData,
	options,
	isLoading,
	onChange,
	onSearchTextChange,
	onBlur,
	placeholder,
	...restProps
}) => {
	const isError = !!error;
	const classes = useChipSelectStyles();
	const [text, setText] = useState('');

	const getClassName = () => {
		let classname = `${classes.autoComplete}`;
		if (disabled) {
			return classname + `${classes.disableAutoComplete}`;
		}
		return classname;
	};

	const getRenderOptions = (props, option) => {
		let arrayResultedDuplicate = newData.some(
			(data) => data.name == text && data.id !== null
		);

		if (option.id === null && !arrayResultedDuplicate) {
			return (
				<li {...props} className={classes.listClassname}>
					{option.name || text}
					<Button
						text={`CREATE NEW ${title}`}
						style={{
							padding: '3px 12px',
							fontWeight: 700
						}}
						onClick={() => {}}
					/>
				</li>
			);
		}
		if (arrayResultedDuplicate && option.id == null) {
			return null;
		} else {
			return (
				<li {...props} className={classes.liAutocomplete}>
					{option.name}
				</li>
			);
		}
	};

	const handleInputChange = (event, value) => {
		if (onChange) {
			onChange(value);
		}
	};
	const debouncedHandleOnChange = useDebouncedCallback((event) => {
		if (onSearchTextChange) onSearchTextChange(event.target.value);
	}, 500);

	const onTextChange = (e) => {
		setText(e.target.value.toUpperCase());
		debouncedHandleOnChange(e);
	};

	return (
		<div>
			<div className={classes.header}>
				<h6 className={isError ? classes.errorState : classes.noErrorState}>
					{title}S
				</h6>
				<div className={isError ? classes.errorState : classes.noErrorState}>
					CURRENT {title}:{selectedData?.length || '0'}
				</div>
			</div>

			<Autocomplete
				{...restProps}
				disabled={disabled}
				getOptionLabel={(option) => option.name} // setSelectedLabels name out of array of strings
				PaperComponent={(props) => {
					return (
						<Paper elevation={6} className={classes.paperBody} {...props} />
					);
				}}
				PopperComponent={({ style, ...props }) => (
					<Popper {...props} style={{ ...style, height: 0 }} />
				)}
				ListboxProps={{
					style: { maxHeight: 180 },
					position: 'bottom'
				}}
				multiple
				filterSelectedOptions
				freeSolo={false}
				value={selectedData}
				autoHighlight={true}
				onChange={(event, newValue) => handleInputChange(event, newValue)}
				popupIcon={''}
				noOptionsText={
					isLoading ? (
						<div className={classes.labelsLoader}>
							<img src={Four33Loader} />
						</div>
					) : (
						''
					)
				}
				className={getClassName}
				name={name}
				onBlur={onBlur}
				id='free-solo-2-demo'
				disableClearable
				options={options}
				renderInput={(params) => (
					<TextField
						{...params}
						placeholder={selectedData?.length > 0 ? ' ' : placeholder}
						className={classes.textFieldAuto}
						value={text}
						onChange={onTextChange}
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
				renderOption={(props, option) => getRenderOptions(props, option)}
				ChipProps={{
					className: classes.tagYellow,
					size: 'small',
					deleteIcon: <ClearIcon />
				}}
				clearIcon={''}
			/>
		</div>
	);
};

ChipsSelectField.propTypes = {
	name: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	selectedData: PropTypes.array.isRequired,
	placeholder: PropTypes.string,
	options: PropTypes.array,
	error: PropTypes.string,
	disabled: PropTypes.bool,
	newData: PropTypes.array,
	isLoading: PropTypes.bool,
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	onSearchTextChange: PropTypes.func
};

export default ChipsSelectField;
