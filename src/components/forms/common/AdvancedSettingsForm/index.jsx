import React from 'react';
import { useSelector } from 'react-redux';
import { getRules } from '../../../../data/selectors';
import AccordianLayout from '../../../layouts/AccordianLayout';
import SubCardLayout from '../../../layouts/SubCardLayout';
import FormikCheckbox from '../../../ui/inputs/formik/FormikCheckbox';
import PrimaryLoader from '../../../ui/loaders/PrimaryLoader';
import { useAdvancedSettingsFormStyles } from './index.style';
import { toolTipHandler, toolTipFormatter } from '../../../../data/helpers';

const AdvancedSettingsForm = () => {
	const classes = useAdvancedSettingsFormStyles();

	const { rules, loading } = useSelector(getRules);

	return (
		<div className={classes.advancedSettingRoot}>
			<AccordianLayout title='Advanced Settings'>
				<SubCardLayout title={'Comments & Likes'}>
					<FormikCheckbox name='show_comments' label='Show Comments' />
					<FormikCheckbox name='show_likes' label='Show Likes' />
				</SubCardLayout>

				<SubCardLayout title={'Restrictions'}>
					<PrimaryLoader loading={loading}>
						{rules.map((val, index) => {
							return (
								<FormikCheckbox
									name={`rules.${val._id}`}
									label={val.title}
									tooltip={toolTipFormatter(toolTipHandler(val))}
									key={index}
								/>
							);
						})}
					</PrimaryLoader>
				</SubCardLayout>
			</AccordianLayout>
		</div>
	);
};

// AdvancedSettingsForm.propTypes = {};

export default AdvancedSettingsForm;
