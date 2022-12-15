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
import FormikSwitchField from '../../../../ui/inputs/formik/FormikSwitchField';
import ArticleAvatarField from './ArticleAvatarField';
import {
	getArticleMainCategories,
	getArticleSubCategories
} from '../../../../../data/features/articleLibrary/articleLibraryActions';
import {
	selectArticleMainCategories,
	selectArticleSubCategories
} from '../../../../../data/selectors';

const ArticleGeneralInfoForm = ({ isEdit, status }) => {
	const classes = useStyles();
	const formClasses = useFormStyles();
	const dispatch = useDispatch();
	const isPublished = isEdit && status === 'published';

	useEffect(() => {
		dispatch(getArticleMainCategories());
	}, []);

	const mainCategories = useSelector(selectArticleMainCategories);
	const subCategories = useSelector(selectArticleSubCategories);

	const { values, setFieldValue, errors } = useFormikContext();

	const handleMainCategoryChange = (val, metaData) => {
		if (val) dispatch(getArticleSubCategories(val));
		if (metaData) setFieldValue('mainCategoryName', metaData.name);
	};

	const handleSubCategoryChange = (_, metaData) => {
		if (metaData) setFieldValue('subCategoryName', metaData.name);
	};

	return (
		<AccordianLayout title='General Information'>
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
						/>
					</div>
				</div>
			</div>
			{values.subCategoryId && (
				<Fragment>
					<h6 style={{ marginTop: '10px' }}>Author</h6>
					<div className={classes.authorContainer}>
						<ArticleAvatarField name={'author_image'} />
						<div className={classes.authorName}>
							<FormikField
								name='author_text'
								value={'433 Team'}
								multiline
								maxRows={2}
							/>
						</div>
					</div>
					<span className={classes.authorImageError}>
						{errors.author_image}
					</span>
					<h5>Add Media File</h5>
					<h6 className={formClasses.fieldContainer}>
						PORTRAIT IMAGE
						<span style={{ color: '#ff355a', fontSize: '16px' }}>{'*'}</span>
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
							required
							onDelete={() => setFieldValue('uploadedFiles', [])}
						/>
					</div>
					<div className={classes.dropBoxUrlContainer}>
						<FormikField
							label='PORTRAIT DROPBOX URL'
							name='dropbox_url'
							placeholder='Please drop the dropbox URL here'
							multiline
							maxRows={2}
						/>
					</div>
					<h6 className={classes.imageText}>
						LANDSCAPE IMAGE
						<span style={{ color: '#ff355a', fontSize: '16px' }}>{'*'}</span>
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
							required
							onDelete={() => setFieldValue('uploadedLandscapeCoverImage', [])}
						/>
					</div>
					<div className={classes.dropBoxUrlContainer}>
						<FormikField
							label='LANDSCAPE DROPBOX URL'
							name='landscape_dropbox_url'
							placeholder='Please drop the dropbox URL here'
							multiline
							maxRows={2}
						/>
					</div>
					<div className={formClasses.fieldContainer}>
						<FormikField
							label='TITLE'
							name='title'
							placeholder='Please write your title here'
							multiline
							required
							maxLength={43}
							maxRows={2}
						/>
					</div>
					<div className={formClasses.fieldContainer}>
						<FormikField
							label='DESCRIPTION'
							name='sub_text'
							placeholder='Please write your description here'
							multiline
							required
							maxRows={2}
						/>
					</div>
					<div className={formClasses.fieldContainer}>
						<FormikLabelsSelect
							name='labels'
							label='LABELS'
							placeholder='Select a minimum of 4 labels'
							required
							library='Articles'
							disabled={isPublished}
						/>
					</div>
					<div className={classes.fieldContainer}>
						<div className={classes.switchContainer}>
							<FormikSwitchField name='show_comments' label='Show Comments' />
						</div>
						<div className={classes.switchContainer}>
							<FormikSwitchField name='show_likes' label='Show Likes' />
						</div>
					</div>
				</Fragment>
			)}
		</AccordianLayout>
	);
};

ArticleGeneralInfoForm.propTypes = {
	isEdit: PropTypes.bool.isRequired,
	status: PropTypes.string.isRequired
};

export default ArticleGeneralInfoForm;
