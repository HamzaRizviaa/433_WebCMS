/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
// import Backdrop from '@material-ui/core/Backdrop';
//import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import MenuItem from '@mui/material/MenuItem';
import { Select } from '@material-ui/core';
import classes from './_banners.module.scss';
import { Paper, Popper } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import ClearIcon from '@material-ui/icons/Clear';
import { Draggable } from 'react-beautiful-dnd';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import PropTypes from 'prop-types';
import { ReactComponent as DropdownArrow } from '../../assets/drop_drown_arrow.svg';
import { ReactComponent as Union } from '../../assets/drag.svg';
import { ReactComponent as Deletes } from '../../assets/Delete.svg';
import { useStyles, useStyles2 } from './bannerStyles';

// eslint-disable-next-line no-unused-vars
export default function BannerRows({
	key,
	data,
	setBannerData,
	index,
	handleBanner,
	errMsg,
	firstrow
}) {
	// const listElement = useRef(null);
	//styles
	const muiClasses = useStyles();
	const muiClasses2 = useStyles2();
	//states
	// const [bannerType, setBannerType] = useState('');
	//const classUseStyle = useStyles();
	const [disableDropdown, setDisableDropdown] = useState(true);
	const [dropdownPosition, setDropdownPosition] = useState(false);
	const [selectedMedia, setSelectedMedia] = useState(null);
	const [selectMediaInput, setSelectMediaInput] = useState('');
	const [trashcan, setTrashCan] = useState(false);
	const allMedia = ['Title only', 'Title + Text'];
	const [errorMsg, setErrMsg] = useState('');
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

	const emptyBannerData = (Trashdata) => {
		console.log('empty data', data);
		setTrashCan(true);
		setSelectedMedia(null);
		setBannerData((data) => {
			// eslint-disable-next-line no-unused-vars
			let _bannerData = data.map((banner) => {
				if (Trashdata.id === banner.id) {
					return {
						...banner,
						bannerType: '',
						selectedMedia: null
					};
				}
				return {
					...banner
				};
			});
			return _bannerData;
		});
		// handleBanner();
	};
	useEffect(() => {
		var errorMessage = errMsg || firstrow;
		setErrMsg(errorMessage);
		setTimeout(() => {
			setErrMsg('');
		}, [5000]);
	}, [errMsg || firstrow]);

	return (
		<Draggable
			key={data.id}
			draggableId={`draggable-${data.id}`}
			index={index}
			//	isDragDisabled={uploadeddatas.length <= 1}
		>
			{(provided) => (
				<div
					key={index}
					ref={provided.innerRef}
					{...provided.draggableProps}
					style={{
						...provided.draggableProps.style
					}}
				>
					{' '}
					<div>
						<div
							className={
								errorMsg ? classes.bannerErrRight : classes.bannerRight
							}
						>
							<div className={classes.bannerContentRight}>
								{/* drag icon */}
								<div className={classes.dragIcon}>
									<span {...provided.dragHandleProps}>
										<Union
											style={{ cursor: 'grab' }}
											// className={classes.dataPreviewIcons}
										/>
									</span>
								</div>

								{/* select banner dropdown */}
								<div className={classes.bannerDropdownDiv}>
									<label className={classes.bannerLabel}>
										select Banner Type
									</label>

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
												// handleBanner();
											}}
											className={classes.select}
											disableUnderline={true}
											IconComponent={(props) => (
												<KeyboardArrowDownIcon {...props} />
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
												getContentAnchorEl: null,
												classes: {
													paper: muiClasses.paper
												}
											}}
											inputProps={{
												classes: {
													root: data.bannerType
														? muiClasses.input
														: muiClasses.inputPlaceholder
												}
											}}
											displayEmpty={true}
											renderValue={(value) =>
												value?.length
													? Array.isArray(value)
														? value.join(', ')
														: value
													: 'Please Select'
											}
										>
											{allMedia.length > 0 &&
												allMedia.map((category, index) => {
													return (
														<MenuItem
															key={index}
															value={category}
															style={{
																fontFamily: 'Poppins !important',
																fontSize: '14px'
															}}
														>
															{category}
														</MenuItem>
													);
												})}
										</Select>
									</div>
								</div>

								{/* select content sutocomplete */}
								{data.bannerType === '' && trashcan === true ? (
									<div className={classes.bannerAutocomplete}></div>
								) : (
									<div
										className={classes.bannerAutocomplete}
										style={{
											marginBottom: dropdownPosition ? 0 : 0
										}}
									>
										<label className={classes.bannerLabel}>
											select content
										</label>
										<Autocomplete
											//className={muiClasses.root}
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
															boxShadow:
																'0px 16px 40px rgba(255, 255, 255, 0.16)',
															borderRadius: '8px',
															color: '#ffffff',
															fontSize: '14px',
															fontFamily: 'Poppins'
														}}
														{...props}
													/>
												);
											}}
											PopperComponent={({ style, ...props }) => (
												<Popper {...props} style={{ ...style, height: 0 }} />
											)}
											ListboxProps={{
												style: { maxHeight: 140 },
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
												setBannerData((bannerData) => {
													// eslint-disable-next-line no-unused-vars
													let _bannerData = bannerData.map((banner) => {
														if (banner.id === data.id) {
															if (banner.bannerType === 'Please Select') {
																return {
																	...banner,
																	selectedMedia: null
																};
															} else {
																return {
																	...banner,
																	selectedMedia: newVal
																};
															}
														}
														return {
															...banner
														};
													});
													return _bannerData;
												});
											}}
											options={options}
											getOptionLabel={(option) => option.name}
											renderOption={(props, option) => {
												return (
													<li {...props} className={classes.liAutocomplete}>
														{option.name}
													</li>
												);
											}}
											// filterOptions={(items) => {
											// 	return items.filter((item) =>
											// 		item.name
											// 			.toLowerCase()
											// 			.includes(selectMediaInput.toLowerCase())
											// 	);
											// }}
											renderInput={(params) => (
												<TextField
													{...params}
													size='small'
													placeholder='Select Content'
													InputProps={{
														disableUnderline: true,
														...params.InputProps,
														className: classes.textFieldInput,
														classes: {
															root: muiClasses.input
														}
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

								{/* delete icon */}
								<Deletes
									className={classes.BannertrashCan}
									onClick={() => {
										emptyBannerData(data);
									}}
								/>
							</div>
							<div className={classes.errorMsg}>{errorMsg}</div>
						</div>
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
	handleBanner: PropTypes.func,
	provided: PropTypes.draggableProps,
	errMsg: PropTypes.object,
	firstrow: PropTypes.object
};
