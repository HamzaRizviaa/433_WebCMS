/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef  */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useFormikContext } from 'formik';
import { useStyles } from '../index.styles';
import { useStyles as globalUseStyles } from '../../../../styles/global.style';
import { selectLabels } from '../../../../data/selectors';

import { Tooltip, Fade, TextField } from '@mui/material';
import { ReactComponent as Info } from '../../../../assets/InfoButton.svg';

import Labels from '../../../Labels';
import FormikField from '../../../ui/inputs/formik/FormikField';
import FormikDropzone from '../../../ui/inputs/formik/FormikDropzone';
import ToggleSwitch from '../../../switch';
import Button from '../../../ui/Button';
import SelectField from '../../../ui/inputs/SelectField';

// const isEdit = false;
const isTrue = true;
const MediaInternalForm = ({
	isEdit,
	status,
	openPreviewer,
	onSubmitHandler,
	toggleDeleteModal
}) => {
	const classes = useStyles();
	const globalClasses = globalUseStyles();
	const isPublished = isEdit && status === 'published';

	const {
		values,
		errors,
		touched,
		dirty,
		isValid,
		isSubmitting,
		handleSubmit,
		setFieldValue,
		setSubmitting
	} = useFormikContext();

	const labels = useSelector(selectLabels);

	const [postLabels, setPostLabels] = useState([]);
	const [extraLabel, setExtraLabel] = useState('');

	useEffect(() => {
		if (labels?.length) {
			setPostLabels([...labels]);
		}
	}, [labels]);

	useEffect(() => {
		setPostLabels((labels) => {
			return labels.filter((label) => label.id != null);
		});
		if (extraLabel) {
			let flag = postLabels.some((label) => label.name == extraLabel);
			if (flag == false) {
				setPostLabels((labels) => {
					return [...labels, { id: null, name: extraLabel }];
				});
			}
		}
	}, [extraLabel]);

	const handleChangeExtraLabel = (e) =>
		setExtraLabel(e.target.value.toUpperCase());

	const saveDraftHandler = () =>
		onSubmitHandler(values, { setSubmitting, isSubmitting }, true);

	return (
		<div>
			<div
				className={globalClasses.contentWrapperNoPreview}
				// style={{ width: previewFile != null ? '60%' : 'auto' }}
			>
				<div>
					<h5>Select Media Type</h5>
					<div className={classes.categoryContainer}>
						<div className={classes.mainCategory}>
							<SelectField
								label='MAIN CATEGORY'
								name='league'
								placeholder='Please Select'
								noOptionsText="Leagues aren't available"
								// value={item?.data?.league?.value}
								// disabled={readOnly}
								options={[].map((league) => ({
									label: league.name,
									value: league.id,
									data: league
								}))}
								// onChange={(value, name, data) => {
								// 	handleSelect(value, name, data);
								// }}
							/>
						</div>
						<div className={classes.subCategory}>
							<SelectField
								label='SUB CATEGORY'
								name='league'
								placeholder='Please Select'
								noOptionsText="Leagues aren't available"
								// value={item?.data?.league?.value}
								// disabled={readOnly}
								options={[].map((league) => ({
									label: league.name,
									value: league.id,
									data: league
								}))}
								// onChange={(value, name, data) => {
								// 	handleSelect(value, name, data);
								// }}
							/>
						</div>
					</div>
				</div>

				{isTrue ? (
					<>
						{isTrue ? (
							<div className={globalClasses.explanationWrapper}>
								<h5>{isEdit ? 'Media File' : 'Add Media File'}</h5>
								<Tooltip
									TransitionComponent={Fade}
									TransitionProps={{ timeout: 800 }}
									title='Default encoding for videos should be H.264'
									arrow
									componentsProps={{
										tooltip: { className: globalClasses.toolTip },
										arrow: { className: globalClasses.toolTipArrow }
									}}
									placement='bottom-start'
								>
									<Info style={{ cursor: 'pointer', marginLeft: '1rem' }} />
								</Tooltip>
							</div>
						) : (
							<h5>{isEdit ? 'Media File' : 'Add Media File'}</h5>
						)}
						<div className={classes.fieldWrapper}>
							<FormikDropzone
								name='uploadedFiles'
								accept='image/jpeg, image/png, video/mp4'
								formatMessage='Supported formats are jpeg, png and mp4'
								maxFiles={3}
								showPreview
								required
								onPreview={openPreviewer}
								onDelete={() => setFieldValue('uploadedFiles', [])}
							/>
						</div>

						<div className={globalClasses.dropBoxUrlContainer}>
							<FormikField
								label='DROPBOX URL'
								name='media_dropbox_url'
								placeholder='Please drop the dropbox URL here'
								multiline
								maxRows={2}
							/>
						</div>
						<h5>{isEdit ? 'Cover Image' : 'Add Cover Image'}</h5>
						<br />
						<h6 className={classes.PotraitImage}>PORTRAIT IMAGE</h6>
						<div className={classes.fieldWrapper}>
							<FormikDropzone
								name='uploadedCoverImage'
								accept='image/jpeg, image/png, video/mp4'
								formatMessage='Supported formats are jpeg, png and mp4'
								maxFiles={3}
								showPreview
								required
								onPreview={openPreviewer}
								// onDelete={() => setFieldValue('uploadedFiles', [])}
							/>
						</div>

						<br />
						<div className={globalClasses.dropBoxUrlContainer}>
							<FormikField
								label='PORTRAIT DROPBOX URL'
								name='image_dropbox_url'
								placeholder='Please drop the dropbox URL here'
								multiline
								maxRows={2}
							/>
						</div>
						{/* landscape image  */}
						<h6 className={classes.PotraitImage}>LANDSCAPE IMAGE</h6>
						<div className={classes.fieldWrapper}>
							<FormikDropzone
								name='uploadedLandscapeCoverImage'
								accept='image/jpeg, image/png, video/mp4'
								formatMessage='Supported formats are jpeg, png and mp4'
								maxFiles={3}
								showPreview
								required
								onPreview={openPreviewer}
								// onDelete={() => setFieldValue('uploadedFiles', [])}
							/>
						</div>

						{/* !form.uploadedLandscapeCoverImage.length && */}

						<br />
						<div className={globalClasses.dropBoxUrlContainer}>
							<FormikField
								label='LANDSCAPE DROPBOX URL'
								name='landscape_image_dropbox_url'
								placeholder='Please drop the dropbox URL here'
								multiline
								maxRows={2}
							/>
						</div>
						{/* landscape image  */}

						<div className={classes.titleContainer}>
							<FormikField
								label='Title'
								name='title'
								placeholder='Please drop the dropbox URL here'
								multiline
								required
								maxLength={43}
								maxRows={2}
							/>
						</div>

						<div className={classes.titleContainer}>
							<Labels
								titleClasses={
									touched.labels && errors.labels
										? globalClasses.errorState
										: globalClasses.noErrorState
								}
								isEdit={isEdit}
								setDisableDropdown={() => {}}
								selectedLabels={values.labels}
								LabelsOptions={postLabels}
								extraLabel={extraLabel}
								handleChangeExtraLabel={handleChangeExtraLabel}
								setSelectedLabels={(newVal) => {
									setFieldValue('labels', [...newVal]);
								}}
								draftStatus={status}
								setExtraLabel={setExtraLabel}
							/>
						</div>
						<p className={globalClasses.mediaError}>
							{touched.labels && errors.labels
								? `You need to add ${
										7 - values.labels.length
								  } more labels in order to upload media`
								: touched.labels && values.labels.length === 0
								? 'You need to select atleast 1 label to save as draft'
								: ''}
						</p>

						<div className={classes.titleContainer}>
							<FormikField
								label='DESCRIPTION'
								name='description'
								placeholder='Please drop the dropbox URL here'
								multiline
								required
								maxRows={2}
							/>
						</div>

						<div className={classes.postMediaContainer}>
							<div className={classes.postMediaHeader}>
								<h5>Show comments</h5>
								<ToggleSwitch
									id={1}
									checked={values.show_comments}
									onChange={(checked) =>
										setFieldValue('show_comments', checked)
									}
								/>
							</div>
						</div>
						<div
							className={classes.postMediaContainer}
							style={{ marginBottom: '1rem' }}
						>
							<div className={classes.postMediaHeader}>
								<h5>Show likes</h5>
								<ToggleSwitch
									id={2}
									checked={values.show_likes}
									onChange={(checked) => setFieldValue('show_likes', checked)}
								/>
							</div>
						</div>
					</>
				) : (
					<></>
				)}

				{/* buttons */}
				<div className={classes.buttonDiv}>
					{isEdit && (
						<div className={classes.editBtn}>
							<Button
								size='small'
								variant={'outlined'}
								onClick={toggleDeleteModal}
							>
								DELETE MEDIA
							</Button>
						</div>
					)}

					<div className={classes.publishDraftDiv}>
						{(!isEdit || status === 'draft') && (
							<Button
								size='small'
								variant={'outlined'}
								disabled={!dirty}
								onClick={saveDraftHandler}
							>
								{status === 'draft' && isEdit ? 'SAVE DRAFT' : 'SAVE AS DRAFT'}
							</Button>
						)}
						<Button
							type='submit'
							disabled={isPublished ? (!dirty ? isValid : !isValid) : !isValid}
							onClick={handleSubmit}
						>
							{isPublished ? 'SAVE CHANGES' : 'PUBLISH'}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

MediaInternalForm.propTypes = {
	isEdit: PropTypes.bool.isRequired,
	status: PropTypes.string.isRequired,
	previewFile: PropTypes.any,
	setDisableDropdown: PropTypes.func.isRequired,
	openPreviewer: PropTypes.func.isRequired,
	onSubmitHandler: PropTypes.func.isRequired,
	toggleDeleteModal: PropTypes.func.isRequired
};

export default MediaInternalForm;
