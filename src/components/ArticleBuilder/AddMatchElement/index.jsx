/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import { useStyles } from './index.style';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { ReactComponent as Union } from '../../../assets/drag.svg';
import { ReactComponent as Deletes } from '../../../assets/Delete.svg';
import { useStyles as globalUseStyles } from '../../../styles/global.style';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import MenuItem from '@mui/material/MenuItem';
// import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import SelectField from '../../ui/inputs/SelectField';
import { useRef } from 'react';
// import { FormControl, InputLabel } from '@mui/material';

const AddMatchElement = ({
	item,
	key,
	index,
	sendDataToParent,
	setIsOpen,
	handleDeleteFile,
	initialData,
	matchesTree
}) => {

	const firstSet = useRef(true);
	const [allLeagues, setAllLeagues] = useState([]);
	const [initial, setInitial] = useState(false);

	const [clickExpandIcon, setClickExpandIcon] = useState(item?.isOpen);
	useEffect(() => {
		if (allLeagues.length > 0) return;
		matchesTree && setAllLeagues(matchesTree);
	}, [matchesTree]);

	useEffect(() => {
		if (allLeagues.length <= 0 && !initialData) return;
		console.log('hello', buildInitialData(initialData));
		initialData && sendDataToParent(buildInitialData(initialData),index);
		setTimeout(() => {
			setInitial(true);
		});
	}, [allLeagues]);

	useEffect(() => {
		if (firstSet.current && item?.data?.match?.value) {
			firstSet.current = false;
		}
	}, [item.data]);

	const handleSelect = (value, name, data) => {
		console.log(name, value, data, item?.data);

		switch (name) {
			case 'league':
				sendDataToParent({
					league: { value, name: data?.name, childs: data?.teams || [] },
					team:{},
					match:{},
				},index);
				break;
			case 'team':
				sendDataToParent({
					...item?.data,
					team: { value, name: data?.name, childs: data?.matches },
					match: {}
				},index);
				break;
			case 'match':
				sendDataToParent({
					...item?.data,
					match: { value, name: data?.name, data, childs: [] }
				},index);
				break;

			default:
				break;
		}
	};

	const clickExpand = () => {
		setClickExpandIcon(!clickExpandIcon);
		setIsOpen(!clickExpandIcon);
	};

	const buildInitialData = (data) => {
		if (!data) return;
		let obj = {};
		allLeagues.forEach((league) => {
			if (league.name === data.league_name) {
				obj.league = {
					value: league?.id,
					name: league?.name,
					childs: league?.teams
				};
				league?.teams.forEach((team) => {
					if (team.name === data.team_name) {
						obj = {
							...obj,
							team: { value: team?.id, name: team?.name, childs: team?.matches }
						};
						team?.matches.forEach((match) => {
							if (match._id === data.match_id) {
								obj = {
									...obj,
									match: {
										value: match?._id,
										name: match?.name,
										childs: [],
										data: match
									}
								};
							}
						});
					}
				});
			}
		});

		return obj;
	};

	const classes = useStyles();

	// const globalClasses = globalUseStyles();

	const haveToShow = () => {
		if (initialData) {
			return initial && allLeagues.length > 0 && clickExpandIcon;
		} else {
			return allLeagues.length > 0 && clickExpandIcon;
		}
	};
	return (
		<>
			<Draggable
				draggableId={`draggable-${index}`}
				index={index}
				key={key}
				//	isDragDisabled={uploadeddatas.length <= 1}
			>
				{(provided) => (
					<div
						ref={provided.innerRef}
						{...provided.draggableProps}
						style={{
							...provided.draggableProps.style
						}}
						className={classes.articleBuilder}
					>
						<div className={classes.draggableWrapperHead}>
							<div className={classes.leftDiv}>
								<div className={classes.grabIconDiv}>
									<span {...provided.dragHandleProps}>
										<Union
											style={{ cursor: 'grab' }}
											className={classes.grabIcon}
										/>
									</span>
								</div>
								<div
									onClick={() => {
										console.log(item?.data);
									}}
									className={classes.wrapperHeading}
								>
									{item.heading}
								</div>
							</div>
							<div className={classes.rightDiv}>
								<div className={classes.deleteIconDiv}>
									<Deletes
										className={classes.deleteIcon}
										onClick={() => {
											handleDeleteFile(item.sortOrder);
										}}
									/>
								</div>
								<div
									className={classes.expandIconDiv}
									onClick={() => {
										clickExpand();
									}}
								>
									{clickExpandIcon ? <ExpandLessIcon /> : <ExpandMoreIcon />}
								</div>
							</div>
						</div>
						{haveToShow() && (
							<div>
								{/* <CustomSelect
									isEdit={false}
									isError={false}
									status='dra'
									label='SELECT LEAGUE'
								/>
								<CustomSelect
									isEdit={false}
									isError={false}
									status='dra'
									label='SELECT TEAM'
								/> */}
								<SelectField
									label='SELECT LEAGUE'
									name='league'
									value={item?.data?.league?.value}
									// defaultValue={defaultState?.league?.value}
									options={(allLeagues || []).map((league) => ({
										label: league.name,
										value: league.id,
										data: league
									}))}
									onChange={(value, name, data) => {
										handleSelect(value, name, data);
									}}
								/>
								<SelectField
									label='SELECT TEAM'
									name='team'
									value={item?.data?.team?.value}
									// defaultValue={defaultState?.team?.value}
									options={(item?.data?.league?.childs || []).map((team) => ({
										label: team.name,
										value: team.id,
										data: team
									}))}
									onChange={(value, name, data) => {
										handleSelect(value, name, data);
									}}
								/>
								<SelectField
									label='SELECT MATCH'
									name='match'
									value={item?.data?.match?.value}
									// defaultValue={defaultState?.match?.value}
									options={(item?.data?.team?.childs || []).map((match) => ({
										label: match.name,
										value: match._id,
										data: match
									}))}
									onChange={(value, name, data) => {
										handleSelect(value, name, data);
									}}
									// disabled
								/>
							</div>
						)}
					</div>
				)}
			</Draggable>
		</>
	);
};

AddMatchElement.propTypes = {
	item: PropTypes.number,
	key: PropTypes.number,
	index: PropTypes.number,
	sendDataToParent: PropTypes.func.isRequired,
	handleDeleteFile: PropTypes.func,
	initialData: PropTypes.object,
	setIsOpen: PropTypes.func,
	matchesTree: PropTypes.object
};

export default React.memo(AddMatchElement);

const CustomSelect = ({ isError, isEdit, status, name = '', label = '' }) => {
	const classes = useStyles();

	const globalClasses = globalUseStyles();

	return (
		<div className={classes.mainCategory}>
			<h6
				className={[
					isError ? globalClasses.errorState : globalClasses.noErrorState
				].join(' ')}
			>
				{label}
			</h6>
			<Select
				// onOpen={() => {
				// 	setDisableDropdown(false);
				// }}
				onClose={() => {
					// setDisableDropdown(true);
				}}
				// disabled={true}//isEdit && status === 'published' ? true : false}
				style={{
					backgroundColor:
						isEdit && status === 'published' ? '#404040' : '#000000'
				}}
				name={name}
				// value={isEdit ? form.mainCategory : form.mainCategory?.name}
				// onChange={(event) => {
				// 	setDisableDropdown(true);
				// 	mainCategoryId(event.target.value);
				// 	if (form.uploadedFiles.length) {
				// 		form.uploadedFiles.map((file) =>
				// 			handleDeleteFile(file.id)
				// 		);
				// 	}
				// 	if (isEdit) {
				// 		setForm((prev) => {
				// 			return { ...prev, subCategory: '' };
				// 		});
				// 	}
				// }}
				className={`${classes.select} ${
					isEdit && status === 'published' ? `${classes.isEditSelect}` : ''
				}`}
				disableUnderline={true}
				IconComponent={(props) => (
					<KeyboardArrowDownIcon
						{...props}
						style={{
							display: isEdit && status === 'published' ? 'none' : 'block',
							top: '4'
						}}
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
				// renderValue={(value) => {
				// 	return value ? value?.name || value : 'Please Select';
				// }}
			>
				{new Array(10).fill({ name: 'hello' }).map((category, index) => {
					return (
						<MenuItem key={index} value={category.name}>
							{category.name}
						</MenuItem>
					);
				})}
			</Select>

			{/* <div className={classes.catergoryErrorContainer}>
										<p className={globalClasses.uploadMediaError}>
											{isError.mainCategory
												? 'You need to select main category'
												: ''}
										</p>
									</div> */}
		</div>
	);
};

CustomSelect.propTypes = {
	isEdit: PropTypes.bool,
	status: PropTypes.string,
	name: PropTypes.string,
	label: PropTypes.string,
	isError: PropTypes.bool
};
