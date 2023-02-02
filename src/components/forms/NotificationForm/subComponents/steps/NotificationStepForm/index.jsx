import React from 'react';
import { useFormikContext } from 'formik';

import FormikDropzone from '../../../../../ui/inputs/formik/FormikDropzone';
import FormikField from '../../../../../ui/inputs/formik/FormikField';
import NotificationPreview from './NotificationPreview';
import { useFormStyles } from '../../../../forms.style';
import { useNotificationStyles } from '../../../index.style';

const NotificationStepForm = () => {
	const classes = useFormStyles();
	const notifClasses = useNotificationStyles();

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
					/>
				</div>
				<div className={classes.fieldContainer}>
					<FormikField
						label='NOTIFICATION NAME'
						name='notification.notification_name'
						placeholder='Please write notification name here'
					/>
				</div>
			</div>
			<NotificationPreview />
		</div>
	);
};

export default NotificationStepForm;
