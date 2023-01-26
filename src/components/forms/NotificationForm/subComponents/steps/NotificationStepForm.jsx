import React from 'react';
import FormikDropzone from '../../../../ui/inputs/formik/FormikDropzone';
import FormikField from '../../../../ui/inputs/formik/FormikField';
import { useFormStyles } from '../../../forms.style';
import { useNotificationStyles } from '../../index.style';
import NotificationPreview from './NotificationPreview';

const NotificationStepForm = () => {
	const classes = useFormStyles();
	const notifClasses = useNotificationStyles();
	return (
		<div className={notifClasses.notifDisplay}>
			<div className={notifClasses.notifiContainer}>
				<div className={classes.fieldContainer}>
					<FormikField
						label='NOTIFICATION TITLE'
						name='notification_title'
						placeholder='Please write your notification title here'
						required
					/>
				</div>
				<div className={classes.fieldContainer}>
					<FormikField
						label='NOTIFICATION TEXT'
						name='notification_text'
						placeholder='Please write your notification text here'
						minRows={2}
						multiline
						required
					/>
				</div>
				<div className={classes.fieldWrapper}>
					<FormikDropzone
						name='notification_image'
						accept='image/jpeg, image/png, video/mp4'
						formatMessage='Supported formats are jpeg, png and mp4'
						maxFiles={1}
						showPreview
						required
						// onPreview={openPreviewer}
						// onDelete={() => setFieldValue('uploadedFiles', [])}
					/>
				</div>
				<div className={classes.fieldContainer}>
					<FormikField
						label='NOTIFICATION NAME'
						name='notification_name'
						placeholder='Please write your notification name here'
						required
					/>
				</div>
			</div>
			<NotificationPreview />
		</div>
	);
};

export default NotificationStepForm;
