import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';

import FormikSelect from '../../../../../ui/inputs/formik/FormikSelect';
import Button from '../../../../../ui/Button';
import {
	AndroidIcon,
	AppleIcon,
	TrashIcon
} from '../../../../../../assets/svg-icons';
import { useNotificationStyles } from '../../../index.style';
import { useInputsStyles } from '../../../../../ui/inputs/inputs.style';

const appIdOptions = [
	{
		value: 'ios',
		label: (
			<div className='select-label-with-icon'>
				<AppleIcon /> <span>IOS</span>
			</div>
		)
	},
	{
		value: 'android',
		label: (
			<div className='select-label-with-icon'>
				<AndroidIcon /> <span>Android</span>
			</div>
		)
	}
];

const TargetApp = ({ form, push, remove }) => {
	const classes = useNotificationStyles();
	const inputsClasses = useInputsStyles({ isRequired: true });

	const handlePush = () => {
		push({ topic_name: '' });
	};

	const handleRemove = (index) => () => {
		remove(index);
	};

	const { target } = form.values;

	return (
		<div className={classes.targetWrapper}>
			<div className={classes.targetContainer}>
				<div className={inputsClasses.labelsContainer}>
					<span className={inputsClasses.inputLabel}>MESSAGE TOPIC</span>
				</div>
				{target.map((_, index) => (
					<div key={index}>
						<div className={classes.appIdContainer}>
							<FormikSelect
								name={`target.${index}.topic_name`}
								options={appIdOptions}
								placeholder='Select Topic'
								className={classes.selectField}
							/>
							<div>
								{target.length > 1 && (
									<IconButton
										className={classes.iconBtn}
										onClick={handleRemove(index)}
									>
										<TrashIcon />
									</IconButton>
								)}
							</div>
						</div>

						{/* <div className={classes.targetItemSeparator}>
								<div className={classes.separatorLine} />
								<p className={classes.separatorText}>OR</p>
								<div className={classes.separatorLine} />
							</div> */}
					</div>
				))}
			</div>
			{target.length < 5 && (
				<Button
					variant='outlined'
					size='small'
					onClick={handlePush}
					className={classes.targetAnotherAppBtn}
				>
					TARGET ANOTHER TOPIC
				</Button>
			)}
		</div>
	);
};

TargetApp.propTypes = {
	form: PropTypes.object.isRequired,
	push: PropTypes.func.isRequired,
	remove: PropTypes.func.isRequired
};

export default TargetApp;
