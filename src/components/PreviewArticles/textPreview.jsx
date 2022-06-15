import React from 'react';
import PropTypes from 'prop-types';
import { useStyles } from './index.style';
import { Markup } from 'interweave';
const TextPreview = ({ data }) => {
	console.log(data, '======== text preview');
	const classes = useStyles();

	// useEffect(() => {
	// 	if (initialData?.description) {
	// 		setTimeout(() => {
	// 			setDescription(
	// 				tinyMCE.activeEditor?.setContent(initialData?.description)
	// 			);
	// 		}, 500);
	// 	}
	// }, []);

	return (
		<div className={classes.textDraggableData}>
			{data.map((item, index) => {
				return (
					<div key={index} className={classes.textDraggableData}>
						<div>
							<Markup content={item?.data ? item?.data[0].description : ''} />
						</div>
					</div>
				);
			})}
		</div>
	);
};
TextPreview.propTypes = {
	data: PropTypes.element
};
export default TextPreview;
