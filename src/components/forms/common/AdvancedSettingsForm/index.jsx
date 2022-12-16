import React from 'react';
import { useSelector } from 'react-redux';
//import { toolTipHandler } from '../../../../data/helpers/commonHelpers';
import { getRules } from '../../../../data/selectors';
//import PropTypes from 'prop-types';
import AccordianLayout from '../../../layouts/AccordianLayout';
import SettingsLayout from '../../../layouts/SettingsLayout';
import FormikCheckbox from '../../../ui/inputs/formik/FormikCheckbox';
import PrimaryLoader from '../../../ui/loaders/PrimaryLoader';
import { useAdvancedSettingsFormStyles } from './index.style';

const AdvancedSettingsForm = () => {
	// const geoblocking = {
	// 	countries: ['Germany', 'Austria', 'Switzerland'].join(', '),
	// 	duration: 72,
	// 	CMS: 'hey'
	// };

	const classes = useAdvancedSettingsFormStyles();
	const { rules, loading } = useSelector(getRules);

	const toolTipHandler = (val) => {
		const newObj = {};

		Object.keys(val).forEach((key) => {
			const value = val[key];

			if (
				typeof value === 'object' &&
				value !== null &&
				!Array.isArray(value)
			) {
				Object.assign(newObj, toolTipHandler(value));
			} else {
				if (typeof value !== 'string') {
					newObj[key] = value;
				}
			}
		});

		console.log(newObj);

		return newObj;

		// const values = {
		//  ...val,
		//  countries: val.countries?.length > 0 ? val.countries.join(‘, ’) : ‘none’
		// };
		// return Object.entries(values).map(([key, value]) => (
		//  <div key={key} className={classes.toolTipText}>
		//      {key} : {value}
		//  </div>
		// ));
	};

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
									tooltip={toolTipHandler(val)}
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
