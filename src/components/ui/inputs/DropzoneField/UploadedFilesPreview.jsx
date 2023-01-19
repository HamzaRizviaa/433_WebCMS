/* eslint-disable react/prop-types */
import React from 'react';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import {
	MenuIcon,
	DeleteIcon,
	EyeIcon,
	MusicIcon
} from '../../../../assets/svg-icons';
import { useDropzoneStyles } from './index.style';

const getFileTypeFromUrl = (url = '') => {
	if (url.includes('/vids/')) return 'video';
	if (url.includes('/audio/')) return 'audio';
	return 'image';
};

const UploadedFilesPreview = ({
	uploadedFiles,
	onDelete,
	onPreview,
	showPreview,
	hidePreviewIcon,
	hideDeleteIcon,
	readOnly
}) => {
	const handleDeleteFile = (file) => {
		if (onDelete) onDelete(file);
	};

	const handlePreviewFile = (file) => {
		if (onPreview) onPreview(file);
	};

	const handleVideoLoad = (event, file) => {
		file.width = event.currentTarget.videoWidth;
		file.height = event.currentTarget.videoHeight;
		file.duration = event.currentTarget.duration;
	};

	const handleAudioLoad = (event, file) => {
		file.duration = event.currentTarget.duration;
	};

	const handleImageLoad = (event, file) => {
		file.width = event.currentTarget.naturalWidth;
		file.height = event.currentTarget.naturalHeight;
	};

	const classes = useDropzoneStyles({ showPreview });

	return (
		<div className={classes.uploadedFilesContainer}>
			{uploadedFiles?.map((file) => {
				const fileType = file.type || getFileTypeFromUrl(file.media_url);

				return (
					<div key={file.id}>
						<div className={classes.filePreview}>
							<div className={classes.filePreviewLeft}>
								{fileType === 'video' && (
									<div className={classes.previewWrapper}>
										{showPreview ? (
											<PlayArrowIcon className={classes.playIcon} />
										) : (
											<>
												<MenuIcon className={classes.playIcon} />
												<div className={classes.defaultThumbnailBackground} />
											</>
										)}
										<video
											id={file.id}
											src={file.media_url}
											poster={file.thumbnail_url || file.img}
											className={classes.videoThumbnail}
											onLoadedMetadata={(e) => {
												handleVideoLoad(e, file);
											}}
										>
											<source src={file.media_url || file.img} />
										</video>
									</div>
								)}
								{fileType === 'audio' && (
									<div className={classes.previewWrapper}>
										<MusicIcon className={classes.playIcon} />
										<div className={classes.defaultThumbnailBackground} />
										<audio
											id={file.id}
											src={file.media_url}
											style={{ display: 'none' }}
											onLoadedMetadata={(e) => {
												handleAudioLoad(e, file);
											}}
										/>
									</div>
								)}
								{fileType === 'image' && (
									<div className={classes.previewWrapper}>
										<img
											id={file.id}
											src={file.media_url || file.img}
											className={classes.fileThumbnail}
											onLoad={(e) => {
												handleImageLoad(e, file);
											}}
										/>
									</div>
								)}
								<p className={classes.fileName}>
									{file.fileName || file.file_name}
								</p>
							</div>
							{!readOnly && (
								<div className={classes.filePreviewRight}>
									{showPreview && !hidePreviewIcon && (
										<EyeIcon
											onClick={() => handlePreviewFile(file)}
											className={classes.filePreviewIcons}
										/>
									)}
									{!hideDeleteIcon && (
										<DeleteIcon
											onClick={() => handleDeleteFile(file)}
											className={classes.filePreviewIcons}
										/>
									)}
								</div>
							)}
						</div>
						<hr className={classes.horizontalLine} />
					</div>
				);
			})}
		</div>
	);
};

export default UploadedFilesPreview;
