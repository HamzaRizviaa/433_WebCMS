import React from 'react';
import PropTypes from 'prop-types';
import { getTiktokEmbedId } from '../../../../../data/helpers/articleHelpers';

const TiktokElementPreviewer = ({ data }) => {
	const embedId = getTiktokEmbedId(data.tiktok_video_url);

	return (
		<div>
			{!!embedId && (
				<embed
					width='100%'
					height='745'
					src={`https://www.tiktok.com/embed/${embedId}`}
					allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
					title='Embedded youtube'
				/>
			)}
		</div>
	);
};

export default TiktokElementPreviewer;

TiktokElementPreviewer.propTypes = {
	data: PropTypes.object.isRequired
};
