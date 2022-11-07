/* eslint-disable no-unused-vars */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { FieldArray, useFormikContext } from 'formik';
import { isEqual, pick } from 'lodash';

import FormikField from '../../../ui/inputs/formik/FormikField';
import FormikSwitchField from '../../../ui/inputs/formik/FormikSwitchField';
import FormikLabelsSelect from '../../../ui/inputs/formik/FormikLabelsSelect';
import Button from '../../../ui/Button';
import NewsSlideForm from './NewsSlideForm';
import AccordianLayout from '../../../layouts/AccordianLayout';
import { useFormStyles } from '../../forms.style';
import {
	areAllFieldsEmpty,
	newsFormInitialValues
} from '../../../../data/helpers';

const NewsInternalForm = ({
	isEdit,
	status,
	onSubmitHandler,
	toggleDeleteModal,
	openPreviewer
}) => {
	const classes = useFormStyles();
	const isPublished = isEdit && status === 'published';

	const { values, dirty, isValid, isSubmitting, setSubmitting } =
		useFormikContext();

	const saveDraftHandler = () => {
		onSubmitHandler(values, { setSubmitting, isSubmitting }, true);
	};

	const isDraftDisabled = useMemo(() => {
		const isAnyNewsSlideEmpty = values.newsSlides.some((item) =>
			areAllFieldsEmpty(item)
		);
		const isEqualToDefaultValues = isEqual(
			pick(values, Object.keys(newsFormInitialValues)),
			newsFormInitialValues
		);

		return !dirty || isAnyNewsSlideEmpty || isEqualToDefaultValues;
	}, [values]);

	return (
		<div>
			<AccordianLayout title='General Information'>
				<div>
					<FormikLabelsSelect
						name='labels'
						label='LABELS'
						placeholder='Select a minimum of 7 labels'
						required
					/>
				</div>
				<div className={classes.fieldContainer}>
					<FormikField
						label='BANNER TITLE'
						name='banner_title'
						placeholder='Please write you caption here'
						multiline
						maxLength={43}
						maxRows={2}
						required
					/>
				</div>
				<div className={classes.fieldContainer}>
					<FormikField
						label='BANNER DESCRIPTION'
						name='banner_description'
						placeholder='Please write you caption here'
						multiline
						maxLength={84}
						minRows={3}
						maxRows={4}
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
			<FieldArray
				name='newsSlides'
				render={(props) => (
					<NewsSlideForm {...props} openPreviewer={openPreviewer} />
				)}
			/>
			<div className={classes.buttonDiv}>
				<div>
					{isEdit && (
						<Button
							size='xsmall'
							variant='outlined'
							color='danger'
							onClick={toggleDeleteModal}
						>
							DELETE VIRAL
						</Button>
					)}
				</div>
				<div className={classes.publishDraftDiv}>
					{(!isEdit || status === 'draft') && (
						<Button
							size='small'
							variant='outlined'
							disabled={isDraftDisabled}
							onClick={saveDraftHandler}
						>
							{status === 'draft' && isEdit ? 'SAVE DRAFT' : 'SAVE AS DRAFT'}
						</Button>
					)}
					<Button
						type='submit'
						disabled={isPublished ? (!dirty ? isValid : !isValid) : !isValid}
					>
						{isPublished ? 'SAVE CHANGES' : 'PUBLISH'}
					</Button>
				</div>
			</div>
		</div>
	);
};

NewsInternalForm.propTypes = {
	isEdit: PropTypes.bool.isRequired,
	status: PropTypes.string.isRequired,
	previewFile: PropTypes.any,
	openPreviewer: PropTypes.func.isRequired,
	onSubmitHandler: PropTypes.func.isRequired,
	toggleDeleteModal: PropTypes.func.isRequired
};

export default NewsInternalForm;
