import React from 'react';
import Button from '../../../button';
import PropTypes from 'prop-types';

const StatusFormatter = ({ text, styledClass }) => {
	return (
		<div className={styledClass}>
			<Button
				onClick={() => {}}
				text={text == 'published' ? 'PUBLISHED' : 'DRAFT'}
				published={text == 'published' ? true : false}
			/>
		</div>
	);
};

StatusFormatter.propTypes = {
	styledClass: PropTypes.string.isRequired,
	params: PropTypes.string.isRequired
}

export default StatusFormatter;
