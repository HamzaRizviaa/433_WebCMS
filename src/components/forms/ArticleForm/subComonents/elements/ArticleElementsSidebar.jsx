import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import { Box, Typography } from '@material-ui/core';
import { useElementsStyles } from './elements.styles';
import ToggleSwitchField from '../../../../ui/inputs/ToggleSwitchField';
import { articleSidebarElements } from '../../../../../data/helpers/articleHelpers/index';
import { useSelector } from 'react-redux';
import {
	selectTiktokFlag,
	selectYoutubeFlag
} from '../../../../../data/selectors';

const ArticleElementsSidebar = ({
	selectedOption,
	topElementRef,
	elementsWrapperRef
}) => {
	const classes = useElementsStyles();
	const { values, setFieldValue } = useFormikContext();
	const [itemsOnTop, setItemsOnTop] = useState(false);
	const [mapValues, setMapValues] = useState(articleSidebarElements);

	const youtubeSelector = useSelector(selectYoutubeFlag);
	const isYoutubeEnabled = youtubeSelector?._value === 'true';
	const tiktokSelector = useSelector(selectTiktokFlag);
	const isTiktokEnabled = tiktokSelector?._value === 'true';
	console.log(isYoutubeEnabled, isTiktokEnabled);

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

	useEffect(() => {
		let copyArray = articleSidebarElements;
		if (!isYoutubeEnabled) {
			copyArray = copyArray.filter(
				(value) => value.data.element_type !== 'YOUTUBE'
			);
		}
		if (!isTiktokEnabled) {
			copyArray = copyArray.filter(
				(value) => value.data.element_type !== 'TIKTOK'
			);
		}
		setMapValues(copyArray);
	}, []);

	return (
		<Box className={classes.ArticleElementsSidebar}>
			<Box mb={2.5}>
				<Typography className={classes.titleHeading}>Elements</Typography>
				<Typography className={classes.titleText}>
					Add elements to build your {selectedOption}
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
			{mapValues.map((dataItem, index) => (
				<button
					type={'button'}
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
	selectedOption: PropTypes.oneOf(['', 'article', 'template']).isRequired,
	topElementRef: PropTypes.any,
	elementsWrapperRef: PropTypes.any
};

export default ArticleElementsSidebar;
