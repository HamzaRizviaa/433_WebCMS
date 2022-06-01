import React from 'react';
import { useStyles } from './index.style';
import PropTypes from 'prop-types';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import { useStyles as globalUseStyles } from '../../styles/global.style';
import { MenuItem, TextField, Select } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Avatar from '@mui/material/Avatar';
import Profile433 from '../../assets/Profile433.svg';

const ArticleGeneralInfo = ({
	isEdit,
	form,
	setForm,
	status,
	setDisableDropdown,
	mainCategoryId,
	mainCategories,
	subCategories,
	SubCategoryId,
	handleDeleteFile
}) => {
	const classes = useStyles();
	const globalClasses = globalUseStyles();

	return (
		<div className={classes.root}>
			<Accordion defaultExpanded>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<Typography>General Information</Typography>
				</AccordionSummary>

				<AccordionDetails>
					<div className={classes.categoryContainer}>
						<div className={classes.mainCategory}>
							<h6
							// className={[
							// 	isError.mainCategory
							// 		? globalClasses.errorState
							// 		: globalClasses.noErrorState
							// ].join(' ')}
							>
								MAIN CATEGORY
							</h6>
							<Select
								onOpen={() => {
									setDisableDropdown(false);
								}}
								onClose={() => {
									setDisableDropdown(true);
								}}
								disabled={isEdit && status === 'published' ? true : false}
								style={{
									backgroundColor:
										isEdit && status === 'published' ? '#404040' : '#000000'
								}}
								value={isEdit ? form.mainCategory : form.mainCategory?.name}
								onChange={(event) => {
									setDisableDropdown(true);
									mainCategoryId(event.target.value);
									if (form.uploadedFiles.length) {
										form.uploadedFiles.map((file) => handleDeleteFile(file.id));
									}
									if (isEdit) {
										setForm((prev) => {
											return { ...prev, subCategory: '' };
										});
									}
								}}
								className={`${classes.select} ${
									isEdit && status === 'published'
										? `${classes.isEditSelect}`
										: ''
								}`}
								disableUnderline={true}
								IconComponent={(props) => (
									<KeyboardArrowDownIcon
										{...props}
										style={{
											display:
												isEdit && status === 'published' ? 'none' : 'block',
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
								renderValue={(value) => {
									return value ? value?.name || value : 'Please Select';
								}}
							>
								{mainCategories.map((category, index) => {
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

						<div className={classes.subCategory}>
							<h6
							// className={[
							// 	isError.subCategory && form.mainCategory
							// 		? globalClasses.errorState
							// 		: globalClasses.noErrorState
							// ].join(' ')}
							>
								SUB CATEGORY
							</h6>
							<Select
								onOpen={() => {
									setDisableDropdown(false);
								}}
								onClose={() => {
									setDisableDropdown(true);
								}}
								disabled={
									!form.mainCategory || (isEdit && status === 'published')
										? true
										: false
								}
								style={{
									backgroundColor:
										isEdit && status === 'published' ? '#404040' : '#000000'
								}}
								value={
									isEdit
										? form.subCategory
										: form.subCategory?.name || form.subCategory
								}
								onChange={(e) => {
									setDisableDropdown(true);
									SubCategoryId(e.target.value);
								}}
								className={`${classes.select} ${
									isEdit && status === 'published'
										? `${classes.isEditSelect}`
										: ''
								}`}
								disableUnderline={true}
								IconComponent={(props) => (
									<KeyboardArrowDownIcon
										{...props}
										style={{
											display:
												isEdit && status === 'published' ? 'none' : 'block',
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
								displayEmpty={form.mainCategory ? true : false}
								renderValue={(value) => {
									return value ? value?.name || value : 'Please Select';
								}}
							>
								{subCategories.map((category, index) => {
									return (
										<MenuItem key={index} value={category.name}>
											{category.name}
										</MenuItem>
									);
								})}
							</Select>

							{/* <p className={globalClasses.uploadMediaError}>
								{isEdit && status === 'published'
									? ' '
									: form.mainCategory?.name || form.mainCategory
									? isError.subCategory && 'You need to select sub category'
									: ''}
								
							</p> */}
						</div>
					</div>

					<h6>Author</h6>
					<div className={classes.authorContainer}>
						<div className={classes.authorAvatar}>
							<Avatar src={Profile433} />
						</div>

						<div className={globalClasses.dropBoxUrlContainer}>
							<TextField
								// value={form.dropbox_url}
								defaultValue={'433 Team'}
								onChange={(e) =>
									setForm((prev) => {
										return { ...prev, dropbox_url: e.target.value };
									})
								}
								placeholder={'Please enter your name here'}
								className={classes.textField}
								multiline
								maxRows={2}
								InputProps={{
									disableUnderline: true,
									className: classes.textFieldInput
								}}
							/>
						</div>
					</div>
				</AccordionDetails>
			</Accordion>
		</div>
	);
};

export default ArticleGeneralInfo;

ArticleGeneralInfo.propTypes = {
	isEdit: PropTypes.bool.isRequired,
	form: PropTypes.object.isRequired,
	setForm: PropTypes.func.isRequired,
	status: PropTypes.string.isRequired,
	setDisableDropdown: PropTypes.func.isRequired,
	mainCategoryId: PropTypes.func.isRequired,
	SubCategoryId: PropTypes.func.isRequired,
	handleDeleteFile: PropTypes.func.isRequired,
	mainCategories: PropTypes.array.isRequired,
	subCategories: PropTypes.array.isRequired
};
