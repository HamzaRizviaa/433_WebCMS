import React, { useState, useEffect } from 'react';
// import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import classes from './_banners.module.scss';
import Autocomplete from '@mui/material/Autocomplete';
import ClearIcon from '@material-ui/icons/Clear';
import { Popper, Paper } from '@mui/material';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { ReactComponent as DropdownArrow } from '../../assets/drop_drown_arrow.svg';
import { ReactComponent as Union } from '../../assets/drag.svg';
import Button from '../button';

const useStyles = makeStyles(() => ({
	'&.Mui-focused': {
		border: 'none !important',
		borderRadius: 'none !important',
		outline: 'none !important'
	}
}));
export default function Banners() {
	const classUseStyle = useStyles();
	const [disableDropdown, setDisableDropdown] = useState(true);
	const [dropdownPosition, setDropdownPosition] = useState(false);
	const [selectedMedia, setSelectedMedia] = useState(null);
	const [selectMediaInput, setSelectMediaInput] = useState('');
	const options = ['neymar', 'neymar', 'neymar', 'neymar', 'neymar'];
	const [bannerData, setBannerData] = useState([
		{
			id: '1',
			name: 'neymar'
		},
		{
			id: '2',
			name: 'salah'
		},
		{
			id: '3',
			name: 'neymar'
		},
		{
			id: '4',
			name: 'neymar'
		},
		{
			id: '5',
			name: 'messi'
		}
	]);
	const [bannerType, setBannerType] = useState('');
	const allMedia = ['Title only', 'Title + Text', 'Please Select'];
	const bannersDataValue = [
		{
			id: '1'
		},
		{
			id: '2'
		},
		{
			id: '3'
		},
		{
			id: '4'
		},
		{
			id: '5'
		}
	];

	// a little function to help us with reordering the result
	const reorder = (list, startIndex, endIndex) => {
		const result = Array.from(list);
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);
		return result;
	};

	const onDragEnd = (result) => {
		// dropped outside the list
		if (!result.destination) {
			return;
		}

		const items = reorder(
			bannerData,
			result.source.index, // pick
			result.destination.index // drop
		);

		setBannerData(items);
	};

	useEffect(() => {
		if (!open) {
			resetState();
		}
	}, [open]);
	const resetState = () => {
		setDropdownPosition(false);
	};
	const handleChangeSelectMediaInput = (e) => {
		setSelectMediaInput(e.target.value);
	};

	return (
		<div className={classes.Banner}>
			<div className={classes.bannerRow}>
				<div className={classes.bannersLeft}>
					{bannersDataValue.length > 0 &&
						bannersDataValue.map((data, index) => {
							return (
								<div className={classes.bannertext} key={index}>
									Banner {data.id}
								</div>
							);
						})}
				</div>
				<div className={classes.dragbale} disableDropdown={disableDropdown}>
					<DragDropContext onDragEnd={onDragEnd}>
						<Droppable droppableId='droppable-1'>
							{(provided) => (
								<div
									{...provided.droppableProps}
									ref={provided.innerRef}
									// className={classes.uploadedFilesContainer}
								>
									{bannerData.map((file, index) => {
										return (
											<Draggable
												key={file.id}
												draggableId={`droppable-${file.id}`}
												index={index}

												//	isDragDisabled={uploadedFiles.length <= 1}
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
														<div
															className={classes.bannerRight}
															key={file.id}
															index={index}
														>
															<div className={classes.dragIcon}>
																<span {...provided.dragHandleProps}>
																	<Union
																		style={{ cursor: 'grab' }}
																		// className={classes.filePreviewIcons}
																	/>
																</span>
															</div>
															<div className={classes.bannerDropdownDiv}>
																<label className={classes.bannerLabel}>
																	select Banner Type
																</label>

																<div className={classes.bannerDropdown}>
																	<Select
																		className={classUseStyle.bannerSelect}
																		onOpen={() => {
																			setDisableDropdown(false);
																		}}
																		onClose={() => {
																			setDisableDropdown(true);
																		}}
																		disabled={false}
																		value={bannerType}
																		onChange={(e) => {
																			setDisableDropdown(true);
																			setBannerType(e.target.value);
																		}}
																		// className={`${classes.select}`}
																		disableUnderline={true}
																		IconComponent={() => (
																			<DropdownArrow
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
																					>
																						{category}
																					</MenuItem>
																				);
																			})}
																	</Select>
																</div>
															</div>

															{bannerType == 'Please Select' ? (
																''
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
																						boxShadow:
																							'0px 16px 40px rgba(255, 255, 255, 0.16)',
																						borderRadius: '8px'
																					}}
																					{...props}
																				/>
																			);
																		}}
																		PopperComponent={({ style, ...props }) => (
																			<Popper
																				{...props}
																				style={{ ...style, height: 0 }}
																			/>
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
																		// options={bannerData}
																		options={options}
																		getOptionLabel={(options) => options}
																		// getOptionLabel={(option) => option.name}
																		renderOption={(props, option) => {
																			return (
																				<li
																					{...props}
																					className={classes.liAutocomplete}
																				>
																					{option.title}
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
									})}
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</DragDropContext>
				</div>
			</div>
			<div className={classes.buttonDiv}>
				<Button
					disabled={false}
					onClick={() => {}}
					text={'PUBLISH HOME BANNERS'}
				/>
			</div>
		</div>
	);
}
