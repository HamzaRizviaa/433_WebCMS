/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useStyles } from '../index.styles';
import { useStyles as globalUseStyles } from '../../../../styles/global.style';
import { useFormikContext } from 'formik';
import AccordianLayout from '../../../layouts/AccordianLayout';
import FormikSelect from '../../../ui/inputs/formik/FormikSelect';
import FormikDropzone from '../../../ui/inputs/formik/FormikDropzone';
import FormikField from '../../../ui/inputs/formik/FormikField';
import FormikLabelsSelect from '../../../ui/inputs/formik/FormikLabelsSelect';
import FormikSwitchField from '../../../ui/inputs/formik/FormikSwitchField';
import Avatar from '@mui/material/Avatar';
import { getArticleMainCategories } from '../../../../data/features/articleLibrary/articleLibraryActions';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectArticleMainCategories,
	selectArticleSubCategories
} from '../../../../data/selectors';

const ArticleGeneralForm = (previewFile, openPreviewer, handleLoading) => {
	const classes = useStyles();
	const globalClasses = globalUseStyles();
	const dispatch = useDispatch();

	useEffect(() => {
		// dispatch(getPostLabels());
		dispatch(getArticleMainCategories());
	}, []);

	const mainCategories = useSelector(selectArticleMainCategories);

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

	console.log('HerEerere ', values);

	return (
		<AccordianLayout title='General Information'>
			{/* <div className={classes.contentTypeWrapper}>
				<label className={classes.bannerLabel}>Select Banner Type</label>
				<div className={classes.fieldWrapper}>
					<FormikSelect
						label='MAIN CATEGORY'
						name='mainCategory'
						size='large'
						options={mainCategories}
						mapOptions={{ labelKey: 'name', valueKey: 'id' }}
					/>
				</div>
			</div>

			<div className={classes.contentTypeWrapper}>
				<label className={classes.bannerLabel}>Select Content</label>
				<div className={classes.fieldWrapper}>
					<FormikSelect
						label='SUB CATEGORY'
						name='subCategory'
						options={}
						
					/>
				</div>
			</div> */}

			<div className={classes.categoryContainer}>
				<div className={classes.mainCategory}>
					<div className={classes.fieldWrapper}>
						<FormikSelect
							label='MAIN CATEGORY'
							name='mainCategory'
							size='large'
							options={mainCategories}
							mapOptions={{ labelKey: 'name', valueKey: 'id' }}
						/>
					</div>
				</div>

				<div className={classes.subCategory}>
					<div className={classes.fieldWrapper}>
						<FormikSelect
							label='MAIN CATEGORY'
							name='mainCategory'
							size='large'
							options={mainCategories}
							mapOptions={{ labelKey: 'name', valueKey: 'id' }}
						/>
					</div>
				</div>
			</div>

			<h6 style={{ marginTop: '10px' }}>Author</h6>
			<div className={classes.authorContainer}>
				<div
				// {...getRootPropsAvatar({ className: classes.authorAvatar })}
				>
					{/* <input {...getInputPropsAvatar()} /> */}
					<Avatar src={values.author_image[0]?.media_url} />
				</div>

				<div className={classes.authorName}>
					<FormikField
						name='author_text'
						value={'433 Team'}
						multiline
						maxRows={2}
					/>
				</div>
			</div>

			<h6 className={classes.imageText}>
				PORTRAIT IMAGE
				<span style={{ color: '#ff355a', fontSize: '16px' }}>{'*'}</span>
			</h6>

			<div className={classes.fieldWrapper}>
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
					onPreview={openPreviewer}
					onDelete={() => setFieldValue('uploadedFiles', [])}
				/>
			</div>

			<div className={globalClasses.dropBoxUrlContainer}>
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
					onDelete={() => setFieldValue('uploadedLandscapeCoverImage', [])}
				/>
			</div>

			<div className={globalClasses.dropBoxUrlContainer}>
				<FormikField
					label='LANDSCAPE DROPBOX URL'
					name='landscape_dropbox_url'
					placeholder='Please drop the dropbox URL here'
					multiline
					maxRows={2}
				/>
			</div>
			<div className={classes.titleContainer}>
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

			<div className={classes.titleContainer}>
				<FormikField
					label='DESCRIPTION'
					name='sub_text'
					placeholder='Please write your description here'
					multiline
					required
					maxRows={2}
				/>
			</div>

			<div className={classes.titleContainer}>
				<FormikLabelsSelect
					name='labels'
					label='LABELS'
					placeholder='Select a minimum of 4 labels'
					// disabled={isPublished}
					required
					library='Articles'
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
		</AccordianLayout>
	);
};

export default ArticleGeneralForm;
