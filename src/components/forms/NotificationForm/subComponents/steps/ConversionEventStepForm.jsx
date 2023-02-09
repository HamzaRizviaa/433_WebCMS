import React from 'react';
import { Box } from '@material-ui/core';

import FormikSelect from '../../../../ui/inputs/formik/FormikSelect';
import { RightChevron } from '../../../../../assets/svg-icons';
import { useNotificationStyles } from '../../index.style';

const ConversionEventStepForm = () => {
	const classes = useNotificationStyles();

	return (
		<Box className={classes.stepContainer}>
			<Box className={classes.conversionContainer}>
				<div className={classes.conversionChevronContainer}>
					<div>Sent</div>
					<RightChevron />
					<div>Opened</div>
					<RightChevron />
				</div>
				<div className={classes.metricContainer}>
					<FormikSelect
						name='goal_metrics'
						placeholder='Select goal metric'
						options={[]}
						mapOptions={{ labelKey: 'name', valueKey: 'id' }}
					/>
				</div>
			</Box>
			<Box>
				<FormikSelect
					label='ANALYTICS LABEL'
					name='analytics_label'
					placeholder='Add an analytics label'
					size='large'
					options={[]}
					mapOptions={{ labelKey: 'name', valueKey: 'id' }}
				/>
			</Box>
		</Box>
	);
};

export default ConversionEventStepForm;
