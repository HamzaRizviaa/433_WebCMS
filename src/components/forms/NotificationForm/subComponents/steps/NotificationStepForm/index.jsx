import React from 'react';
import { useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import FormikDropzone from '../../../../../ui/inputs/formik/FormikDropzone';
import FormikField from '../../../../../ui/inputs/formik/FormikField';
import NotificationPreview from './NotificationPreview';
import { useFormStyles } from '../../../../forms.style';
import { useNotificationStyles } from '../../../index.style';

const NotificationStepForm = ({ status, isFieldInteractionAllowed }) => {
	const classes = useFormStyles();
	const notifClasses = useNotificationStyles();

	const isPublished = status === 'published';

	// formik hook
	const { setFieldValue } = useFormikContext();

	return (
		<div className={notifClasses.notifDisplay}>
			<div className={notifClasses.notifiContainer}>
				<div className={classes.fieldContainer}>
					<FormikField
						label='NOTIFICATION TITLE'
						name='notification.notification_title'
						placeholder='Please write notification title here'
						maxRows={2}
						multiline
						disabled={isFieldInteractionAllowed ? isPublished : !isFieldInteractionAllowed}
					/>
				</div>
				<div className={classes.fieldContainer}>
					<FormikField
						label='NOTIFICATION TEXT'
						name='notification.notification_text'
						placeholder='Please write notification text here'
						minRows={2}
						multiline
						required
						disabled={isFieldInteractionAllowed ? isPublished : !isFieldInteractionAllowed}
					/>
				</div>
				<div className={classes.fieldWrapper}>
					<FormikDropzone
						label='NOTIFICATION IMAGE'
						name='notification.uploadedFiles'
						accept='image/jpeg, image/png'
						formatMessage='Supported formats are jpeg and png'
						maxFiles={1}
						onDelete={() => setFieldValue('notification.uploadedFiles', [])}
						disabled={isFieldInteractionAllowed ? isPublished : !isFieldInteractionAllowed}
						hideDeleteIcon={isFieldInteractionAllowed ? isPublished : !isFieldInteractionAllowed}
					/>
				</div>
				<div className={classes.fieldContainer}>
					<FormikField
						label='NOTIFICATION NAME'
						name='notification.notification_name'
						placeholder='Please write notification name here'
						disabled={isFieldInteractionAllowed ? isPublished : !isFieldInteractionAllowed}
					/>
				</div>
			</div>
			<NotificationPreview />
		</div>
	);
};

NotificationStepForm.propTypes = {
	status: PropTypes.string,
	isFieldInteractionAllowed: PropTypes.bool
};

export default NotificationStepForm;
