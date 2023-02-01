import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import { isEqual, pick } from 'lodash';

import Button from '../../../ui/Button';
import { notificationInitialValues } from '../../../../data/helpers';
import { useFormStyles } from '../../forms.style';

const NotificationFormButtons = ({
	isEdit,
	status,
	openDeleteModal,
	onSubmitHandler
}) => {
	const isPublished = status === 'published';

	const { dirty, isValid, values, setFieldValue } = useFormikContext();

	const isDraftDisabled = useMemo(() => {
		const isEqualToDefaultValues = isEqual(
			pick(values, Object.keys(notificationInitialValues)),
			notificationInitialValues
		);

		return !dirty || isEqualToDefaultValues;
	}, [values, dirty]);

	const handlePublish = () => {
		setFieldValue('save_draft', false);
	};

	const handleDraft = () => {
		onSubmitHandler({ ...values, save_draft: true });
	};

	const classes = useFormStyles();

	return (
		<div className={classes.buttonDiv}>
			<div>
				{isEdit && (
					<Button size='small' variant='outlined' onClick={openDeleteModal}>
						DELETE NOTIFICATION
					</Button>
				)}
			</div>
			<div className={classes.formButtons}>
				{(!isEdit || status === 'draft') && (
					<Button
						size='small'
						variant='outlined'
						disabled={isDraftDisabled}
						onClick={handleDraft}
					>
						{status === 'draft' && isEdit ? 'SAVE DRAFT' : 'SAVE AS DRAFT'}
					</Button>
				)}
				<Button
					size='small'
					type='submit'
					disabled={isPublished ? (!dirty ? isValid : !isValid) : !isValid}
					onClick={handlePublish}
				>
					{isPublished ? 'SAVE CHANGES' : 'SET NOTIFICATION'}
				</Button>
			</div>
		</div>
	);
};

NotificationFormButtons.propTypes = {
	isEdit: PropTypes.bool,
	status: PropTypes.string,
	openDeleteModal: PropTypes.func,
	onSubmitHandler: PropTypes.func
};

export default NotificationFormButtons;
