import React from 'react';
import { useStyles } from './index.styles';
import PropTypes from 'prop-types';

const ArticleElements = ({ data, onClick }) => {
	const classes = useStyles();

	return (
		<>
			{data.map((dataItem) => (
				<button
					onClick={() => onClick(dataItem)}
					key={dataItem.id}
					className={classes.elementContainter}
				>
					<img src={dataItem.image} />
					<p className={classes.elementText}>Add {dataItem.text}</p>
				</button>
			))}
		</>
	);
};

export default ArticleElements;

ArticleElements.propTypes = {
	data: PropTypes.object,
	onClick: PropTypes.func
};
