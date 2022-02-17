/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
// import Backdrop from '@material-ui/core/Backdrop';
//import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import classes from './_banners.module.scss';
import Autocomplete from '@mui/material/Autocomplete';
import ClearIcon from '@material-ui/icons/Clear';
import { Popper, Paper } from '@mui/material';
import { Draggable } from 'react-beautiful-dnd';
//import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import PropTypes from 'prop-types';
import { ReactComponent as DropdownArrow } from '../../assets/drop_drown_arrow.svg';
import { ReactComponent as Union } from '../../assets/drag.svg';
import { useStyles } from './bannerStyles';

// const useStyles = makeStyles(() => ({
// 	'&.Mui-focused': {
// 		border: 'none !important',
// 		borderRadius: 'none !important',
// 		outline: 'none !important'
// 	}
// }));

// eslint-disable-next-line no-unused-vars
export default function BannerRows({ key, data, setBannerData }) {
	// const listElement = useRef(null);
	//styles
	const muiClasses = useStyles();
	//states
	// const [bannerType, setBannerType] = useState('');
	//const classUseStyle = useStyles();
	const [disableDropdown, setDisableDropdown] = useState(true);
	const [dropdownPosition, setDropdownPosition] = useState(false);
	const [selectedMedia, setSelectedMedia] = useState(null);
	const [selectMediaInput, setSelectMediaInput] = useState('');
	const allMedia = ['Title only', 'Title + Text', 'Please Select'];
	//content type dropdown
	const options = [
		{
			id: 1,
			name: 'neymar'
		},
		{
			id: 2,
			name: 'salah'
		},
		{
			id: 3,
			name: 'kagawa'
		},
		{
			id: 4,
			name: 'Cristiano'
		},
		{
			id: 5,
			name: 'RONAAAAAAAAALD'
		}
	];

	// a little function to help us with reordering the result

	useEffect(() => {
		// console.log(data, 'provided');
		if (!open) {
			resetState();
		}
	}, [open]);
	const resetState = () => {
		setDropdownPosition(false);
	};
	const handleChangeSelectMediaInput = (e) => {
		// console.log(disableDropdown);
		setSelectMediaInput(e.target.value);
	};

	// const removeClass = () => {
	// 	// var element = document.getElementById('myDIV');
	// 	if (listElement === undefined) {
	// 		return;
	// 	}

	// 	listElement.classList.remove('Mui-focused');
	// };

	return (
		<Draggable
			key={data.id}
			draggableId={`droppable-${data.id}`}
			index={key}
			//	isDragDisabled={uploadeddatas.length <= 1}
		>
			{(provided) => (
				<div
					key={key}
					ref={provided.innerRef}
					{...provided.draggableProps}
					style={{
						...provided.draggableProps.style
					}}
				>
					<div className={classes.bannerRight} key={data.id} index={key}>
						<div className={classes.dragIcon}>
							<span {...provided.dragHandleProps}>
								<Union
									style={{ cursor: 'grab' }}
									// className={classes.dataPreviewIcons}
								/>
							</span>
						</div>
						<div className={classes.bannerDropdownDiv}>
							<label className={classes.bannerLabel}>select Banner Type</label>

							<div className={classes.bannerDropdown}>
								<Select
									// className={classUseStyle.bannerSelect}
									// ref={listElement}
									// onClick={() => {
									// 	removeClass();
									// }}
									onOpen={() => {
										setDisableDropdown(false);
									}}
									onClose={() => {
										setDisableDropdown(true);
									}}
									disabled={false}
									value={data.bannerType}
									onChange={(e) => {
										setDisableDropdown(true);
										setBannerData((bannerData) => {
											// eslint-disable-next-line no-unused-vars
											let _bannerData = bannerData.map((banner) => {
												if (banner.id === data.id) {
													return {
														...banner,
														bannerType: e.target.value
													};
												}
												return {
													...banner
												};
											});
											return _bannerData;
										});
									}}
									disableUnderline={true}
									IconComponent={(props) => (
										<DropdownArrow
											{...props}
											className={classes.dropdownicon}
										/>
									)}
									MenuProps={{
										anchorOrigin: {
											vertical: 'bottom',
											horizontal: 'left'
										},
										transformOrigin: {
											vertical: 'top',
											horizontal: 'left'
										},
										getContentAnchorEl: null
									}}
									displayEmpty={true}
									renderValue={(value) =>
										value?.length
											? Array.isArray(value)
												? value.join(', ')
												: value
											: ' '
									}
								>
									{allMedia.length > 0 &&
										allMedia.map((category, index) => {
											return (
												<MenuItem
													key={index}
													value={category}
													className={muiClasses.root}
												>
													{category}
												</MenuItem>
											);
										})}
								</Select>
							</div>
						</div>

						{data.bannerType == 'Please Select' ? (
							<div className={classes.bannerAutocomplete}></div>
						) : (
							<div
								className={classes.bannerAutocomplete}
								style={{
									marginBottom: dropdownPosition ? 0 : 0
								}}
							>
								<label className={classes.bannerLabel}>
									select Banner Type
								</label>
								<Autocomplete
									value={selectedMedia}
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
													borderRadius: '8px',
													color: '#ffffff',
													fontSize: '14px'
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
									onOpen={() => {
										setDropdownPosition(true);
									}}
									onClose={() => {
										setDisableDropdown(true);
										setDropdownPosition(false);
									}}
									onChange={(e, newVal) => {
										setSelectedMedia(newVal);
										setDisableDropdown(true);
									}}
									options={options}
									getOptionLabel={(option) => option.name}
									// getOptionLabel={(option) => option.name}
									renderOption={(props, option) => {
										return (
											<li {...props} className={classes.liAutocomplete}>
												{option.name}
											</li>
										);
									}}
									// filterOptions={(items) => {
									// 	return items.filter((item) =>
									// 		item.title
									// 			.toLowerCase()
									// 			.includes(
									// 				selectMediaInput.toLowerCase()
									// 			)
									// 	);
									// }}
									renderInput={(params) => (
										<TextField
											{...params}
											size='small'
											placeholder=''
											InputProps={{
												disableUnderline: true,
												...params.InputProps,
												className: classes.textFieldInput
											}}
											value={selectMediaInput}
											onChange={handleChangeSelectMediaInput}
										/>
									)}
									clearIcon={<ClearIcon />}
									noOptionsText={
										<div
											style={{
												color: '#808080',
												fontSize: 14
											}}
										>
											No Results Found
										</div>
									}
									popupIcon={''}
								/>
							</div>
						)}
					</div>
				</div>
			)}
		</Draggable>
	);
}

BannerRows.propTypes = {
	data: PropTypes.object,
	key: PropTypes.integer,
	setBannerData: PropTypes.func,
	provided: PropTypes.draggableProps
};
