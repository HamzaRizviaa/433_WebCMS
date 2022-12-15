/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import { getRules } from '../../../../data/selectors';
//import PropTypes from 'prop-types';
import AccordianLayout from '../../../layouts/AccordianLayout';
import SettingsLayout from '../../../layouts/SettingsLayout';
import FormikCheckbox from '../../../ui/inputs/formik/FormikCheckbox';
import PrimaryLoader from '../../../ui/loaders/PrimaryLoader';

const AdvancedSettingsForm = () => {
	const { rules, loading } = useSelector(getRules);

	const toolTipHandler = (val) => {
		return Object.entries(val).map(([key, value]) => (
			<div key={key} style={{ textTransform: 'capitalize' }}>
				{key} : {value}
			</div>
		));
	};

	return (
		<div>
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
									name={val._id}
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
