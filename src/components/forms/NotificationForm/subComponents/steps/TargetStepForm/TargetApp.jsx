/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';

import Button from '../../../../../ui/Button';
import SelectTopicNameField from './SelectTopicNameField';
import { TrashIcon } from '../../../../../../assets/svg-icons';
import { useNotificationStyles } from '../../../index.style';
import { topicNameOptions } from '../../../../../../data/helpers';
import { useInputsStyles } from '../../../../../ui/inputs/inputs.style';

const TargetApp = ({ form, push, remove, status, isFieldInteractionAllowed }) => {
	const classes = useNotificationStyles();
	const inputsClasses = useInputsStyles({ isRequired: true });

	const isPublished = status === 'published';

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
							<SelectTopicNameField
								target={target}
								index={index}
								isPublished={isPublished}
								isFieldInteractionAllowed={isFieldInteractionAllowed}
							/>
							<div>
								{target.length > 1 && (
									<IconButton
										className={classes.iconBtn}
										onClick={handleRemove(index)}
										disabled={isFieldInteractionAllowed ? isPublished : !isFieldInteractionAllowed}
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
			{target.length < 5 &&
				topicNameOptions.length > target.length &&
				isFieldInteractionAllowed && (
					<Button
						variant='outlined'
						size='small'
						onClick={handlePush}
						className={classes.targetAnotherAppBtn}
						disabled={isPublished}
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
	remove: PropTypes.func.isRequired,
	isFieldInteractionAllowed: PropTypes.bool.isRequired
};

export default TargetApp;
