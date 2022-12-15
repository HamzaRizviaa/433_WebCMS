/* eslint-disable no-unused-vars */
import React from 'react';
//import PropTypes from 'prop-types';
import AccordianLayout from '../../../layouts/AccordianLayout';
import SettingsLayout from '../../../layouts/SettingsLayout';
import FormikCheckbox from '../../../ui/inputs/formik/FormikCheckbox';

const AdvancedSettingsForm = () => {
	const geoblocking = {
		countries: ['Germany', 'Austria', 'Switzerland'],
		duration: 72,
		CMS: 'hey'
	};

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
					<FormikCheckbox
						name='6385e94da11fe52856b2eb18'
						label='Geoblock ligue 1'
						tooltip={toolTipHandler(geoblocking)}
					/>
				</SettingsLayout>
			</AccordianLayout>
		</div>
	);
};

// AdvancedSettingsForm.propTypes = {};

export default AdvancedSettingsForm;
