import { Box } from '@material-ui/core';
import React from 'react';
import FormikSelect from '../../../../ui/inputs/formik/FormikSelect';
import { useNotificationStyles } from '../../index.style';
import { RightChevron } from '../../../../../assets/svg-icons';

const ConversionEventStepForm = () => {
	const classes = useNotificationStyles();
	return (
		<Box className={classes.conversionRoot}>
			<Box className={classes.conversionContainer}>
				<div className={classes.conversionChevronContainer}>
					<div>Sent</div>
					<RightChevron className={classes.rightIcon} />
					<div>Opened</div>
					<RightChevron className={classes.rightIcon} />
				</div>

				<div className={classes.metricContainer}>
					<FormikSelect
						name='goal_metrics'
						placeholder='Select goal metric'
						size='large'
						// options={mainCategories}
						mapOptions={{ labelKey: 'name', valueKey: 'id' }}
						// onChange={handleMainCategoryChange}
						// disabled={isPublished}
						// required={selectedOption === 'article'}
						// readOnly={readOnly}
					/>
				</div>
			</Box>
			<Box>
				<FormikSelect
					label='ANALYTICS LABEL'
					name='analytics_label'
					placeholder='Add an analytics label'
					size='large'
					// options={mainCategories}
					mapOptions={{ labelKey: 'name', valueKey: 'id' }}
					// onChange={handleMainCategoryChange}
					// disabled={isPublished}
					// required={selectedOption === 'article'}
					// readOnly={readOnly}
				/>
			</Box>
		</Box>
	);
};

export default ConversionEventStepForm;
