/* eslint-disable react/prop-types */
import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { isEqual, pick, omit } from 'lodash';
import { useFormikContext } from 'formik';
import { useStyles } from '../index.styles';
import { useStyles as globalUseStyles } from '../../../../styles/global.style';
import {
	mediaFormInitialValues,
	mediaUnwantedKeysForDeepEqual
} from '../../../../data/helpers';
import {
	useGetMainCategoriesQuery
	// useLazyGetSubCategoriesQuery
} from '../../../../data/features/mediaLibrary/media.query';

import { Tooltip, Fade } from '@mui/material';
import { ReactComponent as Info } from '../../../../assets/InfoButton.svg';

import FormikLabelsSelect from '../../../ui/inputs/formik/FormikLabelsSelect';
import FormikField from '../../../ui/inputs/formik/FormikField';
import FormikDropzone from '../../../ui/inputs/formik/FormikDropzone';
import Button from '../../../ui/Button';
import SelectField from '../../../ui/inputs/SelectField';
import FormikSwitchField from '../../../ui/inputs/formik/FormikSwitchField';

// const isTrue = true;
const MediaInternalForm = ({
	getSubCategories,
	subCategoryStates,
	isEdit,
	status,
	openPreviewer,
	onSubmitHandler,
	toggleDeleteModal,
	handleLoading,
	loadingStatus
}) => {
	const classes = useStyles();
	const globalClasses = globalUseStyles();
	const isPublished = isEdit && status === 'published';

	// get categories
	const {
		data: mainCategories,
		isLoading: categoriesLoading,
		isSuccess
	} = useGetMainCategoriesQuery();

	const {
		isFetching: isLoading,
		isLoading: subLoading,
		data: subCategories,
		isSuccess: subCategoriesSuccess,
		...subResponse
	} = subCategoryStates;

	const {
		values,
		dirty,
		isValid,
		isSubmitting,
		status: formikStatus,
		handleSubmit,
		setFieldValue,
		setValues,
		setSubmitting,
		validateForm,
		resetForm
	} = useFormikContext();

	useEffect(() => {
		validateForm();
		return () => {
			resetForm(mediaFormInitialValues);
		};
	}, []);

	useEffect(() => {
		if (subCategoriesSuccess) {
			setTimeout(() => {
				setFieldValue('subCategory', values.subCategory);
			});
		}
	}, [subCategoriesSuccess, isLoading]);

	// get sub categories when editing an item
	useEffect(() => {
		if (
			!isLoading &&
			Array.isArray(mainCategories) &&
			isSuccess &&
			values?.mainCategory
		) {
			let id = mainCategories.filter(
				(category) => category.name === values.mainCategory
			);
			if (id[0]) {
				fetchSubCategories(id[0]?.id);
			}
		}
	}, [mainCategories, categoriesLoading, isSuccess, values?.mainCategory]);

	// setting sub category
	useEffect(() => {
		!!subCategories?.length && setFieldValue('subCategory', values.subCategory);
	}, [subCategories]);

	// handle loading for categories
	useEffect(() => {
		let ifLoading = categoriesLoading || isLoading || subLoading;
		if (loadingStatus === ifLoading) return;
		handleLoading(isLoading);
	}, [categoriesLoading, isLoading, subLoading]);

	const isDraftDisabled = useMemo(() => {
		const isEqualToDefaultValues = isEqual(
			omit(
				pick(values, Object.keys(mediaFormInitialValues)),
				mediaUnwantedKeysForDeepEqual
			),
			omit(mediaFormInitialValues, mediaUnwantedKeysForDeepEqual)
		);
		const isDirty = isEdit ? dirty : formikStatus?.dirty;

		return !isDirty || isEqualToDefaultValues;
	}, [dirty, values, formikStatus, isEdit]);

	const saveDraftHandler = () =>
		onSubmitHandler(values, { setSubmitting, isSubmitting }, true);

	const fetchSubCategories = (id) => {
		getSubCategories(id);
	};

	const ifMediaTypeSelected = () =>
		isEdit ? true : values?.mainCategory && values.subCategory;

	if (isEdit && mainCategories?.length < 0 && subCategories?.length < 0)
		return null;

	const mainCategoryChangeHandler = (value, name, { data }) => {
		fetchSubCategories(data.id);
		setValues({
			...values,
			[name]: value,
			subCategory: '',
			mainCategoryContent: data.id,
			uploadedFiles: []
			// setFieldValue('uploadedFiles', [])
		});
	};

	const subCategoryChangeHandler = (value, name, { data }) => {
		setValues({
			...values,
			[name]: value,
			subCategoryContent: data.id
		});
	};

	return (
		<div>
			<div className={globalClasses.contentWrapperNoPreview}>
				<div>
					<h5>Select Media Type</h5>
					<div className={classes.categoryContainer}>
						<div className={classes.mainCategory}>
							<SelectField
								label='MAIN CATEGORY'
								name='mainCategory'
								placeholder='Please Select'
								noOptionsText="Categories aren't available"
								value={values.mainCategory}
								disabled={isPublished}
								options={(mainCategories || []).map((category) => ({
									label: category.name,
									value: category.name,
									data: category
								}))}
								onChange={mainCategoryChangeHandler}
							/>
						</div>
						<div className={classes.subCategory}>
							{subCategoriesSuccess && !isLoading && (
								<SelectField
									label='SUB CATEGORY'
									name='subCategory'
									placeholder='Please Select'
									noOptionsText="Sub Categories aren't available"
									disabled={isPublished || isLoading || !values.mainCategory}
									value={values.subCategory}
									defaultValue={values.subCategory}
									options={(subCategories || []).map((category) => ({
										label: category.name,
										value: category.name,
										data: category
									}))}
									onChange={subCategoryChangeHandler}
								/>
							)}
							{(subResponse?.isUninitialized ||
								isLoading ||
								!subCategoriesSuccess) && (
								<SelectField
									placeholder='Please Select'
									label='SUB CATEGORY'
									disabled
									options={[]}
								/>
							)}
						</div>
					</div>
				</div>

				{ifMediaTypeSelected() && (
					<>
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

						<div className={classes.fieldWrapper}>
							<FormikDropzone
								name='uploadedFiles'
								accept={
									values.mainCategory === 'Watch'
										? 'video/mp4'
										: ['audio/mp3', 'audio/mpeg']
								}
								formatMessage={
									values.mainCategory === 'Watch' ? (
										<div>
											Supported format is
											<b> mp4</b>
										</div>
									) : (
										<div>
											Supported format is
											<b> mp3</b>
										</div>
									)
								}
								maxFiles={3}
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
						<h5 className={classes.coverText}>
							{isEdit ? 'Cover Image' : 'Add Cover Image'}
						</h5>

						<h6 className={classes.imageText}>PORTRAIT IMAGE</h6>
						<div className={classes.fieldWrapper}>
							<FormikDropzone
								name='uploadedCoverImage'
								accept='image/jpeg, image/png'
								formatMessage={
									<div>
										Supported formats are
										<b> jpeg</b> and <b>png</b>
										<br />
										Required Size <b>720x900</b>
									</div>
								}
								fileSizeMessage='Image file size should not exceed 1MB.'
								maxFiles={3}
								showPreview
								required
								onPreview={openPreviewer}
								onDelete={() => setFieldValue('uploadedCoverImage', [])}
							/>
						</div>

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
						<h6 className={classes.imageText}>LANDSCAPE IMAGE</h6>
						<div className={classes.fieldWrapper}>
							<FormikDropzone
								name='uploadedLandscapeCoverImage'
								accept='image/jpeg, image/png'
								formatMessage={
									<div>
										Supported formats are
										<b> jpeg</b> and <b>png</b>
										<br />
										Required Size <b>1920x1080</b>
									</div>
								}
								fileSizeMessage='Image file size should not exceed 1MB.'
								maxFiles={1}
								showPreview
								required
								onPreview={openPreviewer}
								onDelete={() =>
									setFieldValue('uploadedLandscapeCoverImage', [])
								}
							/>
						</div>

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
							<FormikLabelsSelect
								name='labels'
								label='LABELS'
								placeholder='Select a minimum of 7 labels'
								disabled={isPublished}
								required
							/>
						</div>

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
						<div className={classes.fieldContainer}>
							<div className={classes.switchContainer}>
								<FormikSwitchField name='show_comments' label='Show comments' />
								<FormikSwitchField name='show_likes' label='Show likes' />
							</div>
						</div>

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
										disabled={isDraftDisabled}
										onClick={saveDraftHandler}
									>
										{status === 'draft' && isEdit
											? 'SAVE DRAFT'
											: 'SAVE AS DRAFT'}
									</Button>
								)}
								<Button
									type='submit'
									disabled={
										isPublished ? (!dirty ? isValid : !isValid) : !isValid
									}
									onClick={handleSubmit}
								>
									{isPublished ? 'SAVE CHANGES' : 'PUBLISH'}
								</Button>
							</div>
						</div>
					</>
				)}
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
	toggleDeleteModal: PropTypes.func.isRequired,
	handleLoading: PropTypes.func,
	loadingStatus: PropTypes.bool
};

export default MediaInternalForm;
