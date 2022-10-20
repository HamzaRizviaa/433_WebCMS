/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import { useStyles } from './index.style';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { ReactComponent as Union } from '../../../assets/drag.svg';
import { ReactComponent as Deletes } from '../../../assets/Delete.svg';
import SelectField from '../../ui/inputs/SelectField';

const AddMatchElement = ({
	item,
	key,
	index,
	sendDataToParent,
	setIsOpen,
	handleDeleteFile,
	initialData,
	matchesTree,
	readOnly = false,
	allElements = []
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
		initialData && sendDataToParent(buildInitialData(initialData), index);
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
				sendDataToParent(
					{
						league: { value, name: data?.name, childs: data?.teams || [] },
						team: {},
						match: {}
					},
					index
				);
				break;
			case 'team':
				sendDataToParent(
					{
						...item?.data,
						team: { value, name: data?.name, childs: data?.matches },
						match: {}
					},
					index
				);
				break;
			case 'match':
				sendDataToParent(
					{
						...item?.data,
						match: { value, name: data?.name, data, childs: [] }
					},
					index
				);
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

	const haveToShow = () => {
		if (initialData) {
			return initial && allLeagues.length > 0 && clickExpandIcon;
		} else {
			return allLeagues.length > 0 && clickExpandIcon;
		}
	};

	const ifAlreadySelected = (match) => {
		for (let i = 0; i < allElements.length; i++) {
			const element = allElements[i];
			if (i !== index) {
				if (element.element_type === 'MATCH') {
					if (element?.data?.league?.value === item?.data?.league?.value) {
						if (element?.data?.team?.value === item?.data?.team?.value) {
							if (element?.data?.match?.value === match?._id) {
								return true;
							}
						}
					}
				}
			}
		}
		return false;
	};

	const classes = useStyles();

	// const globalClasses = globalUseStyles();

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
								<SelectField
									label='SELECT LEAGUE'
									name='league'
									placeholder='Please Select'
									value={item?.data?.league?.value}
									// defaultValue={defaultState?.league?.value}
									disabled={readOnly}
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
									placeholder='Please Select'
									value={item?.data?.team?.value}
									// defaultValue={defaultState?.team?.value}
									disabled={readOnly || !item?.data?.league?.childs}
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
									placeholder='Please Select'
									value={item?.data?.match?.value}
									// defaultValue={defaultState?.match?.value}
									disabled={readOnly || !item?.data?.team?.childs}
									options={(item?.data?.team?.childs || [])
										.filter((match) => !ifAlreadySelected(match))
										.map((match) => ({
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
	matchesTree: PropTypes.object,
	readOnly: PropTypes.bool,
	allElements: PropTypes.array
};

export default React.memo(AddMatchElement);
