import React from 'react';
import { useStyles } from './index.styles';
import PropTypes from 'prop-types';

const ArticleElements = ({ data }) => {
	const classes = useStyles();

	return (
		<>
			{data.map((dataItem) => (
				<div key={dataItem.id} className={classes.elementContainter}>
					<img src={dataItem.image} />
					<p className={classes.elementText}>Add {dataItem.text}</p>
				</div>
			))}
		</>
	);
};

export default ArticleElements;

ArticleElements.propTypes = {
	data: PropTypes.object
};
