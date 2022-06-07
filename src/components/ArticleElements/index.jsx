import React from 'react';
import { useStyles } from './index.styles';
import PropTypes from 'prop-types';

const ArticleElements = ({ data, onClick }) => {
	const classes = useStyles();

	return (
		<div>
			{data.map((dataItem, index) => (
				<button
					onClick={() => onClick(dataItem, index)}
					key={dataItem.id}
					className={classes.elementContainter}
				>
					<img src={dataItem.image} />
					<p className={classes.elementText}>{dataItem.text}</p>
				</button>
			))}
		</div>
	);
};

export default ArticleElements;

ArticleElements.propTypes = {
	data: PropTypes.object,
	onClick: PropTypes.func
};
