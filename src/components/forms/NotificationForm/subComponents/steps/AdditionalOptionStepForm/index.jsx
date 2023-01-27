import React from 'react';
import { Grid } from '@material-ui/core';
import { FieldArray, useFormikContext } from 'formik';

import FormikField from '../../../../../ui/inputs/formik/FormikField';
import FormikSelect from '../../../../../ui/inputs/formik/FormikSelect';
import {
	booleanOptions,
	expirationUnitOptions,
	expirationUnitRange
} from '../../../../../../data/helpers/notificationHelpers';
import { useNotificationStyles } from '../../../index.style';
import { useMemo } from 'react';
import CustomData from './CustomData';

const AdditionalOptionStepForm = () => {
	const classes = useNotificationStyles();

	const { values } = useFormikContext();

	const expireRangeOptions = useMemo(() => {
		return [
			...Array(
				expirationUnitRange[values.additional_options.expiration_unit]
			).keys()
		].map((item) => ({ value: item, label: item }));
	}, [values.additional_options.expiration_unit]);

	return (
		<div className={classes.stepContainer}>
			<div>
				<FormikField
					name='additional_options.android_notification_channel'
					label='ANDROID NOTIFICATION CHANNEL'
				/>
			</div>
			<FieldArray
				name='additional_options.custom_data'
				component={CustomData}
			/>
			<div>
				<FormikSelect
					name='additional_options.sound'
					label='SOUND'
					placeholder='Please Select'
					options={booleanOptions}
				/>
			</div>
			<div>
				<FormikSelect
					name='additional_options.apple_badge'
					label='APPLE BADGE'
					placeholder='Please Select'
					options={booleanOptions}
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
						/>
					</Grid>
					<Grid className={classes.expirationUnitField} md={6} item>
						<FormikSelect
							name='additional_options.expiration_unit'
							placeholder='Please Select'
							label='&nbsp;'
							options={expirationUnitOptions}
						/>
					</Grid>
				</Grid>
			</div>
		</div>
	);
};

export default AdditionalOptionStepForm;
