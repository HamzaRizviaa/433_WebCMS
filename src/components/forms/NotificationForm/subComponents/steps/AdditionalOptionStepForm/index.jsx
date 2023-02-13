import React, { useMemo } from 'react';
import { Grid } from '@material-ui/core';
import { FieldArray, useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import FormikField from '../../../../../ui/inputs/formik/FormikField';
import FormikSelect from '../../../../../ui/inputs/formik/FormikSelect';
import CustomData from './CustomData';
import {
	booleanOptions,
	expirationUnitOptions,
	expirationUnitRange
} from '../../../../../../data/helpers/notificationHelpers';
import { useNotificationStyles } from '../../../index.style';

const AdditionalOptionStepForm = ({ status }) => {
	const classes = useNotificationStyles();

	const { values } = useFormikContext();

	const isPublished = status === 'published';

	const expireRangeOptions = useMemo(() => {
		return [
			...Array(
				expirationUnitRange[values.additional_options.expiration_unit]
			).keys()
		].map((item) => ({ value: item + 1, label: item + 1 }));
	}, [values.additional_options.expiration_unit]);

	return (
		<div className={classes.stepContainer}>
			<div>
				<FormikField
					name='additional_options.android_notification_channel'
					label='ANDROID NOTIFICATION CHANNEL'
					disabled={isPublished}
				/>
			</div>
			<FieldArray name='additional_options.custom_data'>
				{(props) => {
					return <CustomData status={status} {...props} />;
				}}
			</FieldArray>
			<div>
				<FormikSelect
					name='additional_options.sound'
					label='SOUND'
					placeholder='Please Select'
					options={booleanOptions}
					disabled={isPublished}
				/>
			</div>
			<div>
				<FormikSelect
					name='additional_options.apple_badge'
					label='APPLE BADGE'
					placeholder='Please Select'
					options={booleanOptions}
					disabled={isPublished}
				/>
			</div>
			<div>
				<Grid container>
					<Grid className={classes.expireField} md={6} item>
						<FormikSelect
							name='additional_options.expires_in'
							label='EXPIRES'
							placeholder='Please Select'
							options={expireRangeOptions}
							disabled={isPublished}
						/>
					</Grid>
					<Grid className={classes.expirationUnitField} md={6} item>
						<FormikSelect
							name='additional_options.expiration_unit'
							placeholder='Please Select'
							label='&nbsp;'
							options={expirationUnitOptions}
							disabled={isPublished}
						/>
					</Grid>
				</Grid>
			</div>
		</div>
	);
};

export default AdditionalOptionStepForm;

AdditionalOptionStepForm.propTypes = {
	status: PropTypes.string
};
