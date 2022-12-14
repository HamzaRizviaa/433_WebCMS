/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import AccordianLayout from '../../../layouts/AccordianLayout';
import SettingsLayout from '../../../layouts/SettingsLayout';
import FormikCheckbox from '../../../ui/inputs/formik/FormikCheckbox';

const AdvancedSettingsForm = () => {
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
						tooltip={
							<div>
								Geoblock: France <br />
								Duration: 72 hours
							</div>
						}
					/>
				</SettingsLayout>
			</AccordianLayout>
		</div>
	);
};

AdvancedSettingsForm.propTypes = {};

export default AdvancedSettingsForm;
