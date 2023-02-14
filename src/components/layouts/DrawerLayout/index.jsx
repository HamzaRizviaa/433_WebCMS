import React from 'react';
import DrawerLayoutSlider from '../../common/DrawerLayoutSlider';
import PrimaryLoader from '../../ui/loaders/PrimaryLoader';
import Slide from '@material-ui/core/Slide';
import PropTypes from 'prop-types';
import { useDrawerLayoutStyles } from './index.style';
import DropzoneFilePreviewer from '../../common/DropzoneFilePreviewer';

const DrawerLayout = ({
	open,
	handleClose,
	title,
	handlePreviewClose,
	previewFile,
	notifID,
	isLoading,
	children,
	fromArticle = false,
	customWidth
}) => {
	const classes = useDrawerLayoutStyles({ showPreview: !!previewFile });

	return (
		<DrawerLayoutSlider
			open={open}
			handleClose={handleClose}
			title={title}
			handlePreview={handlePreviewClose}
			preview={!!previewFile}
			fromArticle={fromArticle}
			customWidth={customWidth}
			notifID={notifID}
		>
			<PrimaryLoader loading={isLoading} mainPage={fromArticle}>
				<Slide in={true} direction='up' timeout={400}>
					<div className={classes.contentWrapper}>
						<div className={classes.contentChildrenWrapper}>{children}</div>
						<DropzoneFilePreviewer
							previewFile={previewFile}
							onClose={handlePreviewClose}
						/>
					</div>
				</Slide>
			</PrimaryLoader>
		</DrawerLayoutSlider>
	);
};

DrawerLayout.propTypes = {
	open: PropTypes.bool.isRequired,
	fromArticle: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	handlePreviewClose: PropTypes.func.isRequired,
	previewFile: PropTypes.bool.isRequired,
	notifID: PropTypes.string.isRequired,
	isLoading: PropTypes.bool.isRequired,
	children: PropTypes.element.isRequired,
	customWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default DrawerLayout;
