import React, { useState } from 'react';
// import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
// import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import classes from './_banners.module.scss';
// import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { ReactComponent as DropdownArrow } from '../../assets/drop_drown_arrow.svg';
import { ReactComponent as Union } from '../../assets/Music.svg';
import Button from '../button';

const useStyles = makeStyles(() => ({
	'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
		border: 'none',
		borderRadius: '5px 5px 0 0'
	}
}));
export default function Banners() {
	const classUseStyle = useStyles();
	const [selectedValue, setDisableDropdown] = useState(true);
	const [bannerType, setBannerType] = useState('');
	const allMedia = ['Title only', 'Title + Text', 'Please Select'];
	const bannersData = [
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

	return (
		<>
			<div className={classes.Banner}>
				{bannersData.length > 0 &&
					bannersData.map((data, index) => {
						return (
							<div className={classes.bannerRow} key={index}>
								<div className={classes.bannertext}>Banner {data.id}</div>
								<div className={classes.bannerRight}>
									<div className={classes.dragIcon}>
										<Union />
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
													<DropdownArrow className={classes.dropdownicon} />
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
															<MenuItem key={index} value={category}>
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
										<div className={classes.bannerDropdownDiv}>
											<label
												style={
													selectedValue === ''
														? { color: '#FF355A' }
														: { color: 'white' }
												}
												className={classes.bannerLabel}
											>
												SELECT CONTENT
											</label>

											<div className={classes.bannerDropdown}>
												<Select>
													<MenuItem>abc</MenuItem>
												</Select>
												<DropdownArrow className={classes.dropdownicon} />
											</div>
										</div>
									)}
								</div>
							</div>
						);
					})}
			</div>

			<div className={classes.buttonDiv}>
				<Button
					disabled={false}
					onClick={() => {}}
					text={'PUBLISH HOME BANNERS'}
				/>
			</div>
		</>
	);
}
