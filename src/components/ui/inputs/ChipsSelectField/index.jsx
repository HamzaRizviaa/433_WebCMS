import React from 'react';
import { Paper, Popper, Autocomplete, TextField } from '@mui/material';
import { useChipSelectStyles } from './index.style';
import ClearIcon from '@material-ui/icons/Clear';
import Four33Loader from '../../../../assets/Loader_Yellow.gif'

const ChipsSelectField = ({ 
    name,
    title,
    selectedData,
    isError,
    isEdit,
    draftStatus,
    closeDropdown,
    newLabels,
    isLoading,
    onChange,
    onInputChange,
    selectedLabelsRemoved,
    extraLabel,
    onBlur
}) => {
    const classes = useChipSelectStyles();

    const getClassName = () => {
        let classname = `${classes.autoComplete}`
        if(isEdit && (location === 'article' || draftStatus !== 'draft')){
            return (classname + `${classes.disableAutoComplete}`)
        }
        return classname
    }

    const getRenderOptions = (props, option) => {
        let currentLabelDuplicate = selectedData?.some(
            (label) => label.name == option.name
        );

        let arrayResultedDuplicate = newLabels.some(
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
                    className={classes.listClassname}
                >
                    {option.name || extraLabel}
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
    }

    const handleInputChange = (event, value) => {
		if (onChange) {
			onChange(value);
		}
		onInputChange(value);
	};

    return(
        <div>
			<div className={classes.header}>
				<h6 className={isError ? classes.errorState : classes.noErrorState}>{title}S</h6>
				<div className={isError ? classes.errorState : classes.noErrorState}>
                    CURRENT {title}:{selectedData?.length || '0'}
                </div>
            </div>

			<Autocomplete
				disabled={isEdit && draftStatus !== 'draft'}
				getOptionLabel={(option) => option.name} // setSelectedLabels name out of array of strings
				PaperComponent={(props) => {
					return (
						<Paper
							elevation={6}
							className={classes.paperBody}
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
				onClose={closeDropdown}
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
				options={
					isEdit && draftStatus === 'draft' ? newOptions : selectedLabelsRemoved
				}
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
				renderOption={(props, option) => getRenderOptions(props, option)}
				ChipProps={{
					className: classes.tagYellow,
					size: 'small',
					deleteIcon: <ClearIcon />
				}}
				clearIcon={''}
			/>
		</div>
    )
}

export default ChipsSelectField;