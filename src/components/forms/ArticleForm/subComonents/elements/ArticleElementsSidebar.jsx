import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import { Box, Typography } from '@material-ui/core';
import { useElementsStyles } from './elements.styles';
import ToggleSwitchField from '../../../../ui/inputs/ToggleSwitchField';
import { articleSidebarElements } from '../../../../../data/helpers/articleHelpers';

const ArticleElementsSidebar = ({ topElementRef, elementsWrapperRef }) => {
	const classes = useElementsStyles();
	const { values, setFieldValue } = useFormikContext();
	const [itemsOnTop, setItemsOnTop] = useState(false);

	const handleClick = (dataItem) => {
		const cloneElements = [...values.elements];

		if (itemsOnTop) {
			cloneElements.unshift(dataItem.data);
			setFieldValue('elements', cloneElements);

			setTimeout(() => {
				topElementRef?.current?.scrollIntoView({
					block: 'end',
					behavior: 'smooth'
				});
			});
		} else {
			cloneElements.push(dataItem.data);
			setFieldValue('elements', cloneElements);

			setTimeout(() => {
				elementsWrapperRef.current?.scrollIntoView({
					block: 'end',
					behavior: 'smooth'
				});
			});
		}
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
					<ToggleSwitchField
						name='itemsOnTop'
						checked={itemsOnTop}
						onChange={handleChange}
					/>
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

ArticleElementsSidebar.propTypes = {
	topElementRef: PropTypes.any,
	elementsWrapperRef: PropTypes.any
};

export default ArticleElementsSidebar;
