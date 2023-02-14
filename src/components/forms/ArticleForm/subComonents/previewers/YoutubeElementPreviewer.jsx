import React from 'react';
import PropTypes from 'prop-types';
import { getYoutubeVideoEmbedId } from '../../../../../data/helpers/articleHelpers';

const YoutubeElementPreviewer = ({ data, error }) => {
	const embedId = getYoutubeVideoEmbedId(data.youtube_video_url);

	return (
		<div>
			{!error && !!embedId && (
				<embed
					width='100%'
					height='200'
					src={`https://www.youtube.com/embed/${embedId}`}
					allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
					title='Embedded youtube'
					allowFullScreen
				/>
			)}
		</div>
	);
};

export default YoutubeElementPreviewer;

YoutubeElementPreviewer.propTypes = {
	data: PropTypes.object.isRequired,
	error: PropTypes.object
};
