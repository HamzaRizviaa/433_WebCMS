/* eslint-disable no-unused-vars */
import { useFormikContext } from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';
import { toolTipHandler } from '../../../../data/helpers/commonHelpers';
import { getRules } from '../../../../data/selectors';
//import PropTypes from 'prop-types';
import AccordianLayout from '../../../layouts/AccordianLayout';
import SettingsLayout from '../../../layouts/SettingsLayout';
import FormikCheckbox from '../../../ui/inputs/formik/FormikCheckbox';
import PrimaryLoader from '../../../ui/loaders/PrimaryLoader';
import { useAdvancedSettingsFormStyles } from './index.style';

const AdvancedSettingsForm = () => {
	const classes = useAdvancedSettingsFormStyles();
	const { rules, loading } = useSelector(getRules);

	return (
		<div className={classes.advancedSettingRoot}>
			<AccordianLayout title='Advanced Settings'>
				<SettingsLayout title={'Comments & Likes'}>
					<FormikCheckbox name='show_comments' label='Show Comments' />
					<FormikCheckbox name='show_likes' label='Show Likes' />
				</SettingsLayout>

				<SettingsLayout title={'Restrictions'}>
					<PrimaryLoader loading={loading}>
						{rules.map((val, index) => {
							return (
								<FormikCheckbox
									name={`rules.${val._id}`}
									label={val.title}
									tooltip={toolTipHandler(val.geoblocking)}
									key={index}
								/>
							);
						})}
					</PrimaryLoader>
				</SettingsLayout>
			</AccordianLayout>
		</div>
	);
};

// AdvancedSettingsForm.propTypes = {};

export default AdvancedSettingsForm;
