import React from 'react';
import { useStyles } from './index.styles';
import PropTypes from 'prop-types';
const ArticleBuilderSidebar = ({ data }) => {
	console.log(data, '===data===');
	const classes = useStyles();
	return (
		<>
			<div className={classes.articleSidebar}>
				<img src={data.image} />
				<div>{data.text}</div>
			</div>
		</>
	);
};
export default ArticleBuilderSidebar;

ArticleBuilderSidebar.propTypes = {
	data: PropTypes.object
};
