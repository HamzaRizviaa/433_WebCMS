import React from 'react';
import { useStyles } from './index.style';
import PropTypes from 'prop-types';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import { useStyles as globalUseStyles } from '../../../styles/global.style';
import { MenuItem, TextField, Select } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Avatar from '@mui/material/Avatar';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DragAndDropField from '../../DragAndDropField';
import Labels from '../../Labels';
import ToggleSwitch from '../../switch';

const ArticleGeneralInfo = ({
	isEdit,
	form,
	setForm,
	status,
	setDisableDropdown,
	mainCategoryId,
	mainCategories,
	subCategories,
	SubCategoryId,
	handleDeleteFile,
	handleDeleteLandscapeFile,
	imgRef,
	imgRef2,
	setFileWidth,
	setFileHeight,
	setLandscapeFileWidth,
	setLandscapeFileHeight,
	getRootProps,
	getInputProps,
	getRootProps2,
	getInputProps2,
	fileRejectionError,
	getRootPropsAvatar,
	getInputPropsAvatar,
	fileRejectionError2,
	fileRejectionErrorAvatar,
	postLabels,
	extraLabel,
	handleChangeExtraLabel,
	setExtraLabel,
	isError
}) => {
	const classes = useStyles();
	const globalClasses = globalUseStyles();

	return (
		<div className={classes.root}>
			<Accordion defaultExpanded>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<Typography>General Information</Typography>
				</AccordionSummary>

				<AccordionDetails>
					<div className={classes.categoryContainer}>
						<div className={classes.mainCategory}>
							<h6
								className={[
									isError.mainCategory
										? globalClasses.errorState
										: globalClasses.noErrorState
								].join(' ')}
							>
								MAIN CATEGORY
							</h6>
							<Select
								onOpen={() => {
									setDisableDropdown(false);
								}}
								onClose={() => {
									setDisableDropdown(true);
								}}
								disabled={isEdit && status === 'published' ? true : false}
								style={{
									backgroundColor:
										isEdit && status === 'published' ? '#404040' : '#000000'
								}}
								value={isEdit ? form.mainCategory : form.mainCategory?.name}
								onChange={(event) => {
									setDisableDropdown(true);
									mainCategoryId(event.target.value);
									if (form.uploadedFiles.length) {
										form.uploadedFiles.map((file) => handleDeleteFile(file.id));
									}
									if (isEdit) {
										setForm((prev) => {
											return { ...prev, subCategory: '' };
										});
									}
								}}
								className={`${classes.select} ${
									isEdit && status === 'published'
										? `${classes.isEditSelect}`
										: ''
								}`}
								disableUnderline={true}
								IconComponent={(props) => (
									<KeyboardArrowDownIcon
										{...props}
										style={{
											display:
												isEdit && status === 'published' ? 'none' : 'block',
											top: '4'
										}}
									/>
								)}
								MenuProps={{
									anchorOrigin: {
										vertical: 'bottom',
										horizontal: 'left'
									},
									transformOrigin: {
										vertical: 'top',
										horizontal: 'left'
									},
									getContentAnchorEl: null
								}}
								displayEmpty={true}
								renderValue={(value) => {
									return value ? value?.name || value : 'Please Select';
								}}
							>
								{mainCategories.map((category, index) => {
									return (
										<MenuItem key={index} value={category.name}>
											{category.name}
										</MenuItem>
									);
								})}
							</Select>

							<div className={classes.catergoryErrorContainer}>
								<p className={globalClasses.uploadMediaError}>
									{isError.mainCategory
										? 'You need to select main category'
										: ''}
								</p>
							</div>
						</div>

						<div className={classes.subCategory}>
							<h6
								className={[
									isError.subCategory && form.mainCategory
										? globalClasses.errorState
										: globalClasses.noErrorState
								].join(' ')}
							>
								SUB CATEGORY
							</h6>
							<Select
								onOpen={() => {
									setDisableDropdown(false);
								}}
								onClose={() => {
									setDisableDropdown(true);
								}}
								disabled={
									!form.mainCategory || (isEdit && status === 'published')
										? true
										: false
								}
								style={{
									backgroundColor:
										isEdit && status === 'published' ? '#404040' : '#000000'
								}}
								value={
									isEdit
										? form.subCategory
										: form.subCategory?.name || form.subCategory
								}
								onChange={(e) => {
									setDisableDropdown(true);
									SubCategoryId(e.target.value);
								}}
								className={`${classes.select} ${
									isEdit && status === 'published'
										? `${classes.isEditSelect}`
										: ''
								}`}
								disableUnderline={true}
								IconComponent={(props) => (
									<KeyboardArrowDownIcon
										{...props}
										style={{
											display:
												isEdit && status === 'published' ? 'none' : 'block',
											top: '4'
										}}
									/>
								)}
								MenuProps={{
									anchorOrigin: {
										vertical: 'bottom',
										horizontal: 'left'
									},
									transformOrigin: {
										vertical: 'top',
										horizontal: 'left'
									},
									getContentAnchorEl: null
								}}
								displayEmpty={form.mainCategory ? true : false}
								renderValue={(value) => {
									return value ? value?.name || value : 'Please Select';
								}}
							>
								{subCategories.map((category, index) => {
									return (
										<MenuItem key={index} value={category.name}>
											{category.name}
										</MenuItem>
									);
								})}
							</Select>

							<p className={globalClasses.uploadMediaError}>
								{isEdit && status === 'published'
									? ' '
									: form.mainCategory?.name || form.mainCategory
									? isError.subCategory && 'You need to select sub category'
									: ''}
							</p>
						</div>
					</div>

					{(form.mainCategory &&
						(form.subCategory?.name || form.subCategory)) ||
					isEdit ? (
						<>
							<h6 style={{ marginTop: '10px' }}>Author</h6>
							<div className={classes.authorContainer}>
								<div
									{...getRootPropsAvatar({ className: classes.authorAvatar })}
								>
									<input {...getInputPropsAvatar()} />
									<Avatar src={form.author_image[0]?.media_url} />
								</div>

								<div className={classes.authorName}>
									<TextField
										value={form.author_text}
										onChange={(e) =>
											setForm((prev) => {
												return { ...prev, author_text: e.target.value };
											})
										}
										placeholder={'Please enter your name here'}
										className={classes.textField}
										multiline
										maxRows={2}
										InputProps={{
											disableUnderline: true,
											className: classes.textFieldInput
										}}
									/>
								</div>
							</div>
							<p className={globalClasses.fileRejectionError}>
								{fileRejectionErrorAvatar}
							</p>
							<h5>Add Media File</h5>
							<br />
							<h6>PORTRAIT IMAGE</h6>
							<div>
								<DragAndDropField
									uploadedFiles={form.uploadedFiles}
									handleDeleteFile={handleDeleteFile}
									isArticle
									isArticleNew
									imgEl={imgRef}
									imageOnload={() => {
										setFileWidth(imgRef.current.naturalWidth);
										setFileHeight(imgRef.current.naturalHeight);
									}}
								/>
								{!form.uploadedFiles.length ? (
									<section
										className={globalClasses.dropZoneContainer}
										style={{
											borderColor: fileRejectionError
												? '#ff355a'
												: isError.uploadedFiles
												? '#ff355a'
												: 'yellow'
										}}
									>
										<div
											{...getRootProps({
												className: globalClasses.dropzone
											})}
										>
											<input {...getInputProps()} />
											<AddCircleOutlineIcon
												className={globalClasses.addFilesIcon}
											/>
											<p className={globalClasses.dragMsg}>
												Click or drag files to this area to upload
											</p>
											<p className={globalClasses.formatMsg}>
												Supported formats are jpeg and png
												<br />
												Required size 720x900
												<br />
												Image File size should not exceed 1MB.
											</p>
											<p className={globalClasses.uploadMediaError}>
												{fileRejectionError
													? fileRejectionError
													: isError.uploadedFiles
													? 'You need to upload a media in order to post'
													: ''}
											</p>
										</div>
									</section>
								) : (
									<>
										<br />
									</>
								)}
							</div>
							<br />
							<div className={globalClasses.dropBoxUrlContainer}>
								<h6>PORTRAIT DROPBOX URL</h6>
								<TextField
									value={form.dropbox_url}
									onChange={(e) =>
										setForm((prev) => {
											return { ...prev, dropbox_url: e.target.value };
										})
									}
									placeholder={'Please drop the dropbox URL here'}
									className={classes.textField}
									multiline
									maxRows={2}
									InputProps={{
										disableUnderline: true,
										className: classes.textFieldInput
									}}
								/>
							</div>
							<h6>LANDSCAPE IMAGE</h6>
							<div>
								<DragAndDropField
									uploadedFiles={form.uploadedLandscapeCoverImage}
									handleDeleteFile={handleDeleteLandscapeFile}
									isArticle
									isArticleNew
									imgEl={imgRef2}
									imageOnload={() => {
										setLandscapeFileWidth(imgRef2.current.naturalWidth);
										setLandscapeFileHeight(imgRef2.current.naturalHeight);
									}}
								/>
								{!form.uploadedLandscapeCoverImage.length ? (
									<section
										className={globalClasses.dropZoneContainer}
										style={{
											borderColor: fileRejectionError2
												? '#ff355a'
												: isError.uploadedLandscapeCoverImage
												? '#ff355a'
												: 'yellow'
										}}
									>
										<div
											{...getRootProps2({
												className: globalClasses.dropzone
											})}
										>
											<input {...getInputProps2()} />
											<AddCircleOutlineIcon
												className={globalClasses.addFilesIcon}
											/>
											<p className={globalClasses.dragMsg}>
												Click or drag files to this area to upload
											</p>
											<p className={globalClasses.formatMsg}>
												Supported formats are jpeg and png
												<br />
												Required size 1920x1080
												<br />
												Image File size should not exceed 1MB.
											</p>
											<p className={globalClasses.uploadMediaError}>
												{fileRejectionError2
													? fileRejectionError2
													: isError.uploadedLandscapeCoverImage
													? 'You need to upload a media in order to post'
													: ''}
											</p>
										</div>
									</section>
								) : (
									<>
										<br />
									</>
								)}
							</div>
							<br />
							<div className={globalClasses.dropBoxUrlContainer}>
								<h6>LANDSCAPE DROPBOX URL</h6>
								<TextField
									value={form.landscape_dropbox_url}
									onChange={(e) =>
										setForm((prev) => {
											return { ...prev, landscape_dropbox_url: e.target.value };
										})
									}
									placeholder={'Please drop the dropbox URL here'}
									className={classes.textField}
									multiline
									maxRows={2}
									InputProps={{
										disableUnderline: true,
										className: classes.textFieldInput
									}}
								/>
							</div>
							<div className={globalClasses.captionContainer}>
								<div className={globalClasses.characterCount}>
									<h6
										className={
											isError.articleTitle || isError.articleTitleExists
												? globalClasses.errorState
												: globalClasses.noErrorState
										}
									>
										ARTICLE TITLE
									</h6>
									<h6
										style={{
											color:
												form.title?.length >= 39 && form.title?.length <= 42
													? 'pink'
													: form.title?.length === 43
													? 'red'
													: 'white'
										}}
									>
										{form.title?.length}/43
									</h6>
								</div>

								<TextField
									value={form.title}
									onChange={(e) =>
										setForm((prev) => {
											return { ...prev, title: e.target.value };
										})
									}
									placeholder={'Please write your title here'}
									className={classes.textField}
									InputProps={{
										disableUnderline: true,
										className: classes.textFieldInput
									}}
									inputProps={{ maxLength: 43 }}
									multiline
									maxRows={2}
								/>
							</div>
							<p className={globalClasses.mediaError}>
								{isError.articleTitle
									? 'This field is required'
									: isError.articleTitleExists
									? 'This title aready Exists'
									: ''}
							</p>
							<div className={globalClasses.captionContainer}>
								<div className={globalClasses.characterCount}>
									<h6
										className={
											isError.sub_text
												? globalClasses.errorState
												: globalClasses.noErrorState
										}
									>
										SUB TITLE
									</h6>
									<h6
										style={{
											color:
												form.sub_text?.length >= 76 &&
												form.sub_text?.length <= 83
													? 'pink'
													: form.sub_text?.length === 84
													? 'red'
													: 'white'
										}}
									>
										{form.sub_text?.length}/84
									</h6>
								</div>

								<TextField
									value={form.sub_text}
									onChange={(e) =>
										setForm((prev) => {
											return { ...prev, sub_text: e.target.value };
										})
									}
									placeholder={'Please write your sub title here'}
									className={classes.textField}
									InputProps={{
										disableUnderline: true,
										className: classes.textFieldInput
									}}
									inputProps={{ maxLength: 84 }}
									multiline
									maxRows={2}
								/>
							</div>
							<p className={globalClasses.mediaError}>
								{isError.sub_text ? 'This field is required' : ''}
							</p>
							<div className={globalClasses.captionContainer}>
								<Labels
									titleClasses={
										isError.selectedLabels
											? globalClasses.errorState
											: globalClasses.noErrorState
									}
									isEdit={isEdit}
									setDisableDropdown={setDisableDropdown}
									selectedLabels={form.labels}
									LabelsOptions={postLabels}
									extraLabel={extraLabel}
									draftStatus={status}
									handleChangeExtraLabel={handleChangeExtraLabel}
									setSelectedLabels={(newVal) => {
										setForm((prev) => {
											return { ...prev, labels: [...newVal] };
										});
									}}
									setExtraLabel={setExtraLabel}
								/>
							</div>
							<p className={globalClasses.mediaError}>
								{isError.selectedLabels
									? `You need to add  ${
											4 - form.labels.length
									  }  more labels in order to post`
									: ''}
							</p>
							<div className={globalClasses.postMediaContainer}>
								<div className={globalClasses.postMediaHeader}>
									<h5>Show comments</h5>
									<ToggleSwitch
										id={1}
										checked={form.show_comments}
										onChange={(checked) =>
											setForm((prev) => {
												return { ...prev, show_comments: checked };
											})
										}
									/>
								</div>
							</div>
							<div
								className={globalClasses.postMediaContainer}
								style={{ marginBottom: '1rem' }}
							>
								<div className={globalClasses.postMediaHeader}>
									<h5>Show likes</h5>
									<ToggleSwitch
										id={2}
										checked={form.show_likes}
										onChange={(checked) =>
											setForm((prev) => {
												return { ...prev, show_likes: checked };
											})
										}
									/>
								</div>
							</div>
						</>
					) : (
						<>
							<br />
						</>
					)}
				</AccordionDetails>
			</Accordion>
		</div>
	);
};

export default ArticleGeneralInfo;

ArticleGeneralInfo.propTypes = {
	isEdit: PropTypes.bool.isRequired,
	form: PropTypes.object.isRequired,
	setForm: PropTypes.func.isRequired,
	status: PropTypes.string.isRequired,
	setDisableDropdown: PropTypes.func.isRequired,
	mainCategoryId: PropTypes.func.isRequired,
	SubCategoryId: PropTypes.func.isRequired,
	handleDeleteFile: PropTypes.func.isRequired,
	handleDeleteLandscapeFile: PropTypes.func.isRequired,
	mainCategories: PropTypes.array.isRequired,
	subCategories: PropTypes.array.isRequired,
	imgRef: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({ current: PropTypes.elementType })
	]),
	setFileWidth: PropTypes.func.isRequired,
	setFileHeight: PropTypes.func.isRequired,
	imgRef2: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({ current: PropTypes.elementType })
	]),
	setLandscapeFileWidth: PropTypes.func.isRequired,
	setLandscapeFileHeight: PropTypes.func.isRequired,
	getRootProps: PropTypes.any,
	getInputProps: PropTypes.any,
	getRootProps2: PropTypes.any,
	getInputProps2: PropTypes.any,
	fileRejectionError: PropTypes.string,
	getRootPropsAvatar: PropTypes.any,
	getInputPropsAvatar: PropTypes.any,
	fileRejectionError2: PropTypes.string,
	fileRejectionErrorAvatar: PropTypes.string,
	postLabels: PropTypes.array,
	extraLabel: PropTypes.string,
	handleChangeExtraLabel: PropTypes.func.isRequired,
	isError: PropTypes.object.isRequired,
	setExtraLabel: PropTypes.func
};
