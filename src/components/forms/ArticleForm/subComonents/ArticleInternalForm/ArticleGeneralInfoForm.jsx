import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useFormikContext } from 'formik';
import { useStyles } from '../../index.styles';
import { useFormStyles } from '../../../forms.style';
import AccordianLayout from '../../../../layouts/AccordianLayout';
import FormikSelect from '../../../../ui/inputs/formik/FormikSelect';
import FormikDropzone from '../../../../ui/inputs/formik/FormikDropzone';
import FormikField from '../../../../ui/inputs/formik/FormikField';
import FormikLabelsSelect from '../../../../ui/inputs/formik/FormikLabelsSelect';
import ArticleAvatarField from './ArticleAvatarField';
import {
	getArticleMainCategories,
	getArticleSubCategories
} from '../../../../../data/features/articleLibrary/articleLibraryActions';
import {
	selectArticleMainCategories,
	selectArticleMainCategoriesStatus,
	selectArticleSubCategories,
	selectArticleSubCategoriesStatus
} from '../../../../../data/selectors';
import ScheduledInfoBox from '../../../common/ScheduledInfoBox';

const ArticleGeneralInfoForm = ({
	isEdit,
	status,
	selectedOption,
	readOnly,
	openSchedulerModal
}) => {
	const classes = useStyles();
	const formClasses = useFormStyles();
	const dispatch = useDispatch();
	const isPublished = isEdit && status === 'published';

	useEffect(() => {
		dispatch(getArticleMainCategories());
	}, []);

	const mainCategories = useSelector(selectArticleMainCategories);
	const subCategories = useSelector(selectArticleSubCategories);
	const mainCategoriesStatus = useSelector(selectArticleMainCategoriesStatus);
	const subCategoriesStatus = useSelector(selectArticleSubCategoriesStatus);

	const { values, setFieldValue, errors, isValid } = useFormikContext();

	const handleMainCategoryChange = (val, metaData) => {
		if (val) dispatch(getArticleSubCategories(val));
		if (metaData) setFieldValue('mainCategoryName', metaData.name);
	};

	const handleSubCategoryChange = (_, metaData) => {
		if (metaData) setFieldValue('subCategoryName', metaData.name);
	};

	return (
		<AccordianLayout title='General Information'>
			{values.is_scheduled && (
				<ScheduledInfoBox
					scheduleDate={values.schedule_date}
					openSchedulerModal={openSchedulerModal}
					isValid={isValid}
				/>
			)}
			<div className={classes.categoryContainer}>
				<div className={classes.mainCategory}>
					<div className={classes.fieldWrapper}>
						<FormikSelect
							label='MAIN CATEGORY'
							name='mainCategoryId'
							placeholder='Please Select'
							size='large'
							options={mainCategories}
							mapOptions={{ labelKey: 'name', valueKey: 'id' }}
							onChange={handleMainCategoryChange}
							disabled={isPublished}
							required={selectedOption === 'article'}
							readOnly={readOnly}
							isLoading={mainCategoriesStatus}
						/>
					</div>
				</div>
				<div className={classes.subCategory}>
					<div className={classes.fieldWrapper}>
						<FormikSelect
							label='SUB CATEGORY'
							name='subCategoryId'
							placeholder='Please Select'
							disabled={!values.mainCategoryName || isPublished}
							size='large'
							options={subCategories}
							mapOptions={{ labelKey: 'name', valueKey: 'id' }}
							onChange={handleSubCategoryChange}
							required={selectedOption === 'article'}
							readOnly={readOnly}
							isLoading={subCategoriesStatus}
						/>
					</div>
				</div>
			</div>
			{values.subCategoryId && (
				<Fragment>
					<h6 style={{ marginTop: '10px' }}>Author</h6>
					<div className={classes.authorContainer}>
						<ArticleAvatarField name={'author_image'} disabled={readOnly} />
						<div className={classes.authorName}>
							<FormikField
								name='author_text'
								value={'433 Team'}
								multiline
								maxRows={2}
								readOnly={readOnly}
							/>
						</div>
					</div>
					<span className={classes.authorImageError}>
						{errors.author_image}
					</span>
					<h5>Add Media File</h5>
					<h6 className={formClasses.fieldContainer}>
						PORTRAIT IMAGE
						{selectedOption === 'article' && (
							<span style={{ color: '#ff355a', fontSize: '16px' }}>{'*'}</span>
						)}
					</h6>
					<div className={formClasses.dropzoneWrapper}>
						<FormikDropzone
							name='uploadedFiles'
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
							required={selectedOption === 'article'}
							onDelete={() => setFieldValue('uploadedFiles', [])}
							readOnly={readOnly}
						/>
					</div>
					<div className={classes.dropBoxUrlContainer}>
						<FormikField
							label='PORTRAIT DROPBOX URL'
							name='dropbox_url'
							placeholder='Please drop the dropbox URL here'
							multiline
							maxRows={2}
							readOnly={readOnly}
						/>
					</div>
					<h6 className={classes.imageText}>
						LANDSCAPE IMAGE
						{selectedOption === 'article' && (
							<span style={{ color: '#ff355a', fontSize: '16px' }}>{'*'}</span>
						)}
					</h6>
					<div className={formClasses.dropzoneWrapper}>
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
							required={selectedOption === 'article'}
							onDelete={() => setFieldValue('uploadedLandscapeCoverImage', [])}
							readOnly={readOnly}
						/>
					</div>
					<div className={classes.dropBoxUrlContainer}>
						<FormikField
							label='LANDSCAPE DROPBOX URL'
							name='landscape_dropbox_url'
							placeholder='Please drop the dropbox URL here'
							multiline
							maxRows={2}
							readOnly={readOnly}
						/>
					</div>
					<div className={formClasses.fieldContainer}>
						<FormikField
							label='ARTICLE TITLE'
							name='title'
							placeholder='Please write your title here'
							multiline
							required={selectedOption === 'article'}
							maxLength={43}
							maxRows={2}
							readOnly={readOnly}
						/>
					</div>
					<div className={formClasses.fieldContainer}>
						<FormikField
							label='SUB TITLE'
							name='sub_text'
							placeholder='Please write your sub title here'
							multiline
							required={selectedOption === 'article'}
							maxRows={2}
							maxLength={84}
							readOnly={readOnly}
						/>
					</div>
					<div className={formClasses.fieldContainer}>
						<FormikLabelsSelect
							name='labels'
							label='LABELS'
							placeholder='Select a minimum of 4 labels'
							required={selectedOption === 'article'}
							library='Articles'
							disabled={isPublished || readOnly}
						/>
					</div>
				</Fragment>
			)}
		</AccordianLayout>
	);
};

ArticleGeneralInfoForm.propTypes = {
	isEdit: PropTypes.bool.isRequired,
	status: PropTypes.string.isRequired,
	selectedOption: PropTypes.oneOf(['', 'article', 'template']).isRequired,
	readOnly: PropTypes.bool,
	openSchedulerModal: PropTypes.func.isRequired
};

export default ArticleGeneralInfoForm;
