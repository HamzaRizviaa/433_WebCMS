import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Close from '@material-ui/icons/Close';
import { useDropzoneFilePreviewerStyles } from './index.style';
import useClickOutside from '../../../hooks/useClickOutside';
import ReactPlayer from 'react-player';

const DropzoneFilePreviewer = ({ onClose, previewFile }) => {
	const previewRef = useRef(null);

	useClickOutside(previewRef, onClose);

	const classes = useDropzoneFilePreviewerStyles();

	if (!previewFile) return null;

	return (
		<div ref={previewRef} className={classes.previewComponent}>
			<div className={classes.previewHeader}>
				<Close onClick={onClose} className={classes.closeIcon} />
				<h5>Preview</h5>
			</div>
			<div>
				{previewFile.type === 'video' ||
				previewFile.mime_type === 'video/mp4' ? (
					// <video
					// 	id='my-video'
					// 	poster={previewFile.thumbnail_url}
					// 	className={classes.previewFile}
					// 	controls={true}
					// >
					// 	<source src={previewFile.media_url} />
					// </video>
					<ReactPlayer
						width={'100%'}
						height={'32rem'}
						controls={true}
						url={previewFile.media_url}
					/>
				) : (
					<img src={previewFile.media_url} className={classes.previewFile} />
				)}
			</div>
		</div>
	);
};

DropzoneFilePreviewer.propTypes = {
	onClose: PropTypes.func.isRequired,
	previewFile: PropTypes.object
};

export default DropzoneFilePreviewer;
