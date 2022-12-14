/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup } from '@material-ui/core';
import AccordianLayout from '../../../layouts/AccordianLayout';
import SettingsLayout from '../../../layouts/SettingsLayout';
import CheckBox from '../../../ui/inputs/CheckBox';

const AdvancedSettingsForm = () => {
	return (
		<div>
			<AccordianLayout title='Advanced Settings'>
				<SettingsLayout title={'Comments & Likes'}>
					<FormGroup>
						<CheckBox label='Show Comments' />
						<CheckBox label='Show Likes' />
					</FormGroup>
				</SettingsLayout>

				<SettingsLayout title={'Restrictions'}>
					<CheckBox
						label='Geoblock ligue 1'
						tooltip={`Geoblock: France, Belgium & Monaco
					Duration: 72 hours`}
					/>
					<CheckBox
						label='Geoblock Bundesliga'
						tooltip={`Geoblock: France, Belgium & Monaco
					Duration: 72 hours`}
					/>
				</SettingsLayout>
			</AccordianLayout>
		</div>
	);
};

AdvancedSettingsForm.propTypes = {};

export default AdvancedSettingsForm;
