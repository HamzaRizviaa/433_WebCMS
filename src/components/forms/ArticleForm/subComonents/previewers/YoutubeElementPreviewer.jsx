import React from 'react';
import PropTypes from 'prop-types';
import { getYoutubeVideoEmbedId } from '../../../../../data/helpers/articleHelpers';

const YoutubeElementPreviewer = ({ data }) => {
	const embedId = getYoutubeVideoEmbedId(data.youtube_video_url);

	return (
		<div>
			<embed
				width='100%'
				height='200'
				src={`https://www.youtube.com/embed/${embedId}`}
				allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
				allowFullScreen
				title='Embedded youtube'
			/>
		</div>
	);
};

export default YoutubeElementPreviewer;

YoutubeElementPreviewer.propTypes = {
	data: PropTypes.object.isRequired
};
