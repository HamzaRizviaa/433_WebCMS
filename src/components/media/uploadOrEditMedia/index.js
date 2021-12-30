import React, { useState } from 'react';
import classes from './_uploadOrEditMedia.module.scss';
import PropTypes from 'prop-types';
import Slider from '../../slider';
import Button from '../../button';
import LoadingOverlay from 'react-loading-overlay';
import { MenuItem, Select } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const UploadOrEditMedia = ({
	open,
	handleClose,
	title,
	heading1,
	buttonText
}) => {
	const [mainCategory, setMainCategory] = useState('');
	const [subCategory, setSubCategory] = useState('');

	return (
		<Slider
			open={open}
			handleClose={() => {
				handleClose();
			}}
			title={title}
		>
			<LoadingOverlay spinner text='Loading...'>
				<div className={classes.contentWrapper}>
					<div>
						<h5>{heading1}</h5>
						<div className={classes.categoryContainer}>
							<div className={classes.mainCategory}>
								<h6>MAIN CATEGORY</h6>
								<Select
									value={mainCategory}
									onChange={(e) => setMainCategory(e.target.value)}
									className={`${classes.select}`}
									disableUnderline={true}
									IconComponent={KeyboardArrowDownIcon}
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
								>
									<MenuItem value={'Watch'}>Watch</MenuItem>
									<MenuItem value={'Listen'}>Listen</MenuItem>
								</Select>
							</div>
							<div className={classes.subCategory}>
								<h6>SUB CATEGORY</h6>
								<Select
									disabled={mainCategory ? false : true}
									value={subCategory}
									onChange={(e) => setSubCategory(e.target.value)}
									className={`${classes.select}`}
									disableUnderline={true}
									IconComponent={KeyboardArrowDownIcon}
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
								>
									{mainCategory === 'Watch' ? (
										<MenuItem value={'Funny Clips'}>Funny Clips</MenuItem>
									) : (
										<MenuItem value={'Football Players'}>
											Football Players
										</MenuItem>
									)}
								</Select>
							</div>
						</div>
					</div>
					<div className={classes.buttonDiv}>
						<div className={classes.addMediaBtn}>
							<Button disabled={false} onClick={() => {}} text={buttonText} />
						</div>
					</div>
				</div>
			</LoadingOverlay>
		</Slider>
	);
};

UploadOrEditMedia.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	//isEdit: PropTypes.bool.isRequired,
	title: PropTypes.string.isRequired,
	heading1: PropTypes.string.isRequired,
	buttonText: PropTypes.string.isRequired
};

export default UploadOrEditMedia;
