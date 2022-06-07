/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
// import { useStyles } from './index.styles';
import PropTypes from 'prop-types';
import { useStyles as globalUseStyles } from '../../styles/global.style';
import { useDropzone } from 'react-dropzone';
import checkFileSize from '../../utils/validateFileSize';
import DragAndDropField from '../DragAndDropField';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { makeid } from '../../utils/helper';

const ArticleElementMedia = ({
	sendFileToParent,
	WidthHeightCallback,
	handleDeleteFile
}) => {
	const globalClasses = globalUseStyles();

	const [fileRejectionError, setFileRejectionError] = useState('');
	const [fileWidth, setFileWidth] = useState(0);
	const [fileHeight, setFileHeight] = useState(0);
	// const [form, setForm] = useState({  elementMediaFiles: [],});
	const [newFile, setNewFile] = useState([]);

	const imgEl = useRef(null);
	const videoRef = useRef(null);

	const getFileType = (type) => {
		if (type) {
			let _type = type.split('/');
			return _type && _type[1];
		}
	};

	const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
		useDropzone({
			accept: '.jpeg,.jpg,.png,video/mp4',
			maxFiles: 1,
			validator: checkFileSize
		});

	useEffect(() => {
		if (acceptedFiles?.length) {
			let newFiles = acceptedFiles.map((file) => {
				let id = makeid(10);
				return {
					id: id,
					file_name: file.name,
					media_url: URL.createObjectURL(file),
					fileExtension: `.${getFileType(file.type)}`,
					mime_type: file.type,
					file: file,
					type: file.type === 'video/mp4' ? 'video' : 'image'
				};
			});
			WidthHeightCallback(fileHeight, fileWidth);
			setNewFile([...newFiles]);
			sendFileToParent(newFiles);
		}
	}, [acceptedFiles]);

	useEffect(() => {
		if (fileRejections.length) {
			fileRejections.forEach(({ errors }) => {
				return errors.forEach((e) => setFileRejectionError(e.message));
			});
			setTimeout(() => {
				setFileRejectionError('');
			}, [5000]);
		}
	}, [fileRejections]);

	return (
		<div>
			<DragAndDropField
				uploadedFiles={newFile}
				handleDeleteFile={(id) => {
					setNewFile(newFile.filter((file) => file.id !== id));
					handleDeleteFile(id);
				}}
				isArticle
				isArticleNew
				imgEl={imgEl}
				videoRef={videoRef}
				imageOnload={() => {
					setFileWidth(imgEl.current.naturalWidth);
					setFileHeight(imgEl.current.naturalHeight);
				}}
				onLoadedVideodata={() => {
					setFileWidth(videoRef.current.videoWidth);
					setFileHeight(videoRef.current.videoHeight);
				}}
			/>
			{!newFile?.length ? (
				<section
					className={globalClasses.dropZoneContainer}
					// style={{
					// 	borderColor: isError.uploadedFiles ? '#ff355a' : 'yellow'
					// }}
				>
					<div
						{...getRootProps({
							className: globalClasses.dropzone
						})}
					>
						<input {...getInputProps()} />
						<AddCircleOutlineIcon className={globalClasses.addFilesIcon} />
						<p className={globalClasses.dragMsg}>
							Click or drag files to this area to upload
						</p>
						<p className={globalClasses.formatMsg}>
							Supported formats are jpeg, png and mp4
						</p>
						{/* <p className={globalClasses.uploadMediaError}>
							{isError.uploadedFiles
								? 'You need to upload a media in order to post'
								: ''}
						</p> */}
					</div>
				</section>
			) : (
				<>
					<br />
				</>
			)}

			<p className={globalClasses.fileRejectionError}>{fileRejectionError}</p>
		</div>
	);
};
export default ArticleElementMedia;

ArticleElementMedia.propTypes = {
	sendFileToParent: PropTypes.func.isRequired,
	WidthHeightCallback: PropTypes.func,
	handleDeleteFile: PropTypes.func
	// handleDeleteFile: PropTypes.func.isRequired,
	// imgEl: PropTypes.oneOfType([
	// 	PropTypes.func,
	// 	PropTypes.shape({ current: PropTypes.elementType })
	// ]),
	// setFileWidth: PropTypes.func.isRequired,
	// setFileHeight: PropTypes.func.isRequired
};
