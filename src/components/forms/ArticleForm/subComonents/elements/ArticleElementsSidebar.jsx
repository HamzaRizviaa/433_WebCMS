import React, { useState } from 'react';
//import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import { useElementsStyles } from './elements.styles';
import ToggleSwitchField from '../../../../ui/inputs/ToggleSwitchField';
import { articleSidebarElements } from '../../../../../data/helpers/articleHelpers';
import { useFormikContext } from 'formik';

const ArticleElementsSidebar = () => {
	const classes = useElementsStyles();
	const { values, setFieldValue } = useFormikContext();
	const [itemsOnTop, setItemsOnTop] = useState(false);

	const handleClick = (dataItem) => {
		const cloneElements = [...values.elements];
		if (itemsOnTop) {
			cloneElements.unshift(dataItem.data);
		} else cloneElements.push(dataItem.data);
		setFieldValue('elements', cloneElements);
	};

	const handleChange = (value) => {
		setItemsOnTop(value);
	};

	return (
		<Box className={classes.ArticleElementsSidebar}>
			<Box mb={3}>
				<Typography className={classes.titleHeading}>Elements</Typography>
				<Typography className={classes.titleText}>
					Add elements to build your article
				</Typography>
			</Box>
			<Box className={classes.elementsDesc}>
				<Typography className={classes.elementsText}>
					Add elements to the top
				</Typography>
				<Box className={classes.toggleBtn}>
					<ToggleSwitchField checked={itemsOnTop} onChange={handleChange} />
				</Box>
			</Box>
			{articleSidebarElements.map((dataItem, index) => (
				<button
					onClick={() => handleClick(dataItem)}
					key={index}
					className={classes.elementContainter}
				>
					{dataItem.image}
					<p className={classes.elementText}>{dataItem.text}</p>
				</button>
			))}
		</Box>
	);
};

// ArticleElementsSidebar.propTypes = {
// 	push: PropTypes.func.isRequired,
// 	unshift: PropTypes.func.isRequired
// };

export default ArticleElementsSidebar;
