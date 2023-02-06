import React from 'react';
import PropTypes from 'prop-types';
import {
	filterSelectedTopics,
	topicNameOptions
} from '../../../../../../data/helpers';
import FormikSelect from '../../../../../ui/inputs/formik/FormikSelect';
import { useNotificationStyles } from '../../../index.style';

const SelectTopicNameField = ({ target, index, isPublished }) => {
	const classes = useNotificationStyles();

	const filteredTopicNameOptions = filterSelectedTopics(
		target,
		topicNameOptions,
		index
	);

	return (
		<FormikSelect
			name={`target.${index}.topic_name`}
			options={filteredTopicNameOptions}
			placeholder='Select Topic'
			className={classes.selectField}
			disabled={isPublished}
		/>
	);
};

SelectTopicNameField.propTypes = {
	target: PropTypes.arrayOf(PropTypes.object),
	index: PropTypes.number,
	isPublished: PropTypes.bool
};

export default SelectTopicNameField;
