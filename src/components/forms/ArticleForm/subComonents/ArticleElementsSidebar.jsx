import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ToggleSwitch from '../../../switch';
import { Box, Typography } from '@material-ui/core';
import { useArticleFormStyles } from '../index.style';

const ArticleElementsSidebar = ({ heading, elements, onClick }) => {
	const [itemsOnTop, setItemsOnTop] = useState(false);
	const classes = useArticleFormStyles();

	return (
		<Box className={classes.ArticleElementsSidebar}>
			<Box mb={3.5}>
				<Typography className={classes.titleHeading}>{heading}</Typography>
				<Typography className={classes.titleText}>
					Add elements to build your article
				</Typography>
			</Box>
			<Box className={classes.elementsDesc}>
				<Typography className={classes.elementsText}>
					Add elements to the top
				</Typography>
				<Box>
					<ToggleSwitch
						id={`itemsOnTop-button`}
						checked={itemsOnTop}
						onChange={(checked) => {
							console.log(checked);
							setItemsOnTop(checked);
						}}
					/>
				</Box>
			</Box>

			{elements.map((dataItem, index) => (
				<button
					onClick={() => onClick(dataItem, index)}
					key={index}
					className={classes.elementContainter}
				>
					<img src={dataItem.image} />
					<p className={classes.elementText}>{dataItem.text}</p>
				</button>
			))}
		</Box>
	);
};
ArticleElementsSidebar.propTypes = {
	elements: PropTypes.array.isRequired,
	heading: PropTypes.string.isRequired,
	onClick: PropTypes.func
};
export default ArticleElementsSidebar;
