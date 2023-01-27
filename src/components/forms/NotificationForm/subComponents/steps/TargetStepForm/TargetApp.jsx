/* eslint-disable react/prop-types */
import React from 'react';
import { Grid, IconButton } from '@material-ui/core';

import FormikSelect from '../../../../../ui/inputs/formik/FormikSelect';
import Button from '../../../../../ui/Button';
import {
	AndroidIcon,
	AppleIcon,
	TrashIcon
} from '../../../../../../assets/svg-icons';
import { useNotificationStyles } from '../../../index.style';

const appIdOptions = [
	{
		value: 'ios',
		label: (
			<div className='select-label-with-icon'>
				<AppleIcon /> <span>Name.of.ios.app.prod</span>
			</div>
		)
	},
	{
		value: 'android',
		label: (
			<div className='select-label-with-icon'>
				<AndroidIcon /> <span>Name.of.android.app.prod</span>
			</div>
		)
	}
];

const TargetApp = ({ form, push, remove }) => {
	const classes = useNotificationStyles();

	const handlePush = () => {
		push({ topic_name: '' });
	};

	const handleRemove = (index) => () => {
		remove(index);
	};

	const { target } = form.values;

	return (
		<div className={classes.targetWrapper}>
			{target.map((_, index) => (
				<div key={index} className={classes.targetContainer}>
					<div className={classes.appIdContainer}>
						<Grid className={classes.fieldsRowContainer} container>
							<Grid md={4} className={classes.gridItem} item>
								<p className={classes.appTitle}>App</p>
							</Grid>
							<Grid md={8} item>
								<FormikSelect
									name={`target.${index}.topic_name`}
									options={appIdOptions}
									placeholder='Select App'
									className={classes.noBorderAndShadow}
								/>
							</Grid>
						</Grid>
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
					{index > 0 && (
						<div className={classes.targetItemSeparator}>
							<div className={classes.separatorLine} />
							<p className={classes.separatorText}>OR</p>
							<div className={classes.separatorLine} />
						</div>
					)}
				</div>
			))}
			{target.length < appIdOptions.length && (
				<Button
					variant='outlined'
					size='small'
					onClick={handlePush}
					className={classes.targetAnotherAppBtn}
				>
					TARGET ANOTHER APP
				</Button>
			)}
		</div>
	);
};

export default TargetApp;
