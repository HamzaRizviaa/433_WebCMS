import React from 'react';
import Button from '../button';
import PropTypes from 'prop-types';

const StatusFormatter = ({ params, styledClass }) => {
	return (
		<div className={styledClass}>
			<Button
				onClick={() => {}}
				text={params == 'published' ? 'PUBLISHED' : 'DRAFT'}
				published={params == 'published' ? true : false}
			/>
		</div>
	);
};

StatusFormatter.propTypes = {
	styledClass: PropTypes.string.isRequired,
	params: PropTypes.string.isRequired
}

export default StatusFormatter;
