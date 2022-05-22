import React, { useState, useRef } from 'react';
import Slider from '../../slider';
import PropTypes from 'prop-types';
//import classes from './_uploadOrEditQuiz.module.scss';
import UploadOrEditGames from './UploadOrEditGames';

import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import TabUnstyled from '@mui/base/TabUnstyled';
import { useStyles } from './gamesStyles';

const GamesSlider = ({
	open,
	handleClose,
	title,
	heading1,
	buttonText,
	gameType,
	isEdit,
	status
}) => {
	const [previewBool, setPreviewBool] = useState(false);
	const [previewFile, setPreviewFile] = useState(null);
	const [disableDropdown, setDisableDropdown] = useState(true);
	const previewRef = useRef(null);

	const muiClasses = useStyles();
	console.log(status, '---status in slider');
	const handlePreviewEscape = () => {
		setPreviewBool(false);
		setPreviewFile(null);
	};

	// on upload button in header - to upload new poll or quiz

	return (
		<Slider
			open={open}
			handleClose={() => {
				handleClose();
			}}
			title={title}
			preview={previewBool}
			handlePreview={() => {
				handlePreviewEscape();
			}}
			previewRef={previewRef}
			disableDropdown={disableDropdown}
			games={true}
		>
			{isEdit ? (
				<UploadOrEditGames
					heading1={heading1}
					open={open}
					buttonText={buttonText}
					setPreviewBool={setPreviewBool}
					previewFile={previewFile}
					setPreviewFile={setPreviewFile}
					previewRef={previewRef}
					setDisableDropdown={setDisableDropdown}
					editJogo={isEdit}
					status={status}
					handleClose={() => {
						handleClose();
					}}
					type={gameType === 'JOGO' ? 'jogo' : 'arcade'}
				/>
			) : (
				<div className={muiClasses.root}>
					<TabsUnstyled defaultValue={0} className={muiClasses.tabRoot}>
						<TabsListUnstyled
							className={muiClasses.tabMainDiv}
							style={{ width: previewBool ? '60%' : '100%' }}
						>
							<TabUnstyled>JOGO</TabUnstyled>
							<TabUnstyled>Arcade Game</TabUnstyled>
						</TabsListUnstyled>
						<TabPanelUnstyled value={0}>
							<UploadOrEditGames
								heading1={heading1}
								open={open}
								buttonText={buttonText}
								setPreviewBool={setPreviewBool}
								previewFile={previewFile}
								setPreviewFile={setPreviewFile}
								previewRef={previewRef}
								setDisableDropdown={setDisableDropdown}
								editJogo={isEdit}
								status={status}
								handleClose={() => {
									handleClose();
								}}
								type='jogo'
							/>
						</TabPanelUnstyled>
						<TabPanelUnstyled value={1}>
							<UploadOrEditGames
								heading1={heading1}
								open={open}
								buttonText={buttonText}
								setPreviewBool={setPreviewBool}
								previewFile={previewFile}
								setPreviewFile={setPreviewFile}
								previewRef={previewRef}
								setDisableDropdown={setDisableDropdown}
								handleClose={() => {
									handleClose();
								}}
								editArcade={isEdit}
								status={status}
								type='arcade'
							/>
						</TabPanelUnstyled>
					</TabsUnstyled>
				</div>
			)}
		</Slider>
	);
};

GamesSlider.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	gameType: PropTypes.string.isRequired,
	heading1: PropTypes.string.isRequired,
	buttonText: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	isEdit: PropTypes.bool.isRequired,
	status: PropTypes.string.isRequired
};

export default GamesSlider;
