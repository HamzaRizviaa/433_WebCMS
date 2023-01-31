import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import { isEqual, pick } from 'lodash';

import Button from '../../../ui/Button';
import { notificationInitialValues } from '../../../../data/helpers';
import { useFormStyles } from '../../forms.style';

const NotificationFormButtons = ({ isEdit, status }) => {
	const isPublished = status === 'published';

	const { dirty, isValid, values } = useFormikContext();

	const isDraftDisabled = useMemo(() => {
		const isEqualToDefaultValues = isEqual(
			pick(values, Object.keys(notificationInitialValues)),
			notificationInitialValues
		);

		return !dirty || isEqualToDefaultValues;
	}, [values, dirty]);

	const classes = useFormStyles();

	return (
		<div className={classes.formButtons}>
			{(!isEdit || status === 'draft') && (
				<Button
					size='small'
					variant='outlined'
					disabled={isDraftDisabled}
					onClick={() => {}}
				>
					{status === 'draft' && isEdit ? 'SAVE DRAFT' : 'SAVE AS DRAFT'}
				</Button>
			)}
			<Button
				size='small'
				type='submit'
				disabled={isPublished ? (!dirty ? isValid : !isValid) : !isValid}
			>
				{isPublished ? 'SAVE CHANGES' : 'SET NOTIFICATION'}
			</Button>
		</div>
	);
};

NotificationFormButtons.propTypes = {
	isEdit: PropTypes.bool,
	status: PropTypes.string
};

export default NotificationFormButtons;
