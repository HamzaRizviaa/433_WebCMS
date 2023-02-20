import dayjs from 'dayjs';

export const getArticleBuilderDrawerTitle = (isEdit) => {
	return isEdit ? 'Edit Article' : 'Article Builder';
};

export const getArticleTemplateDrawerTitle = (isEdit) => {
	return isEdit ? 'Edit Template' : 'Create Template';
};

export const getFileExtension = (type) => {
	if (type) {
		let _type = type.split('/');
		return _type && _type[1];
	}
};

export const selectFileType = (type) => {
	switch (type) {
		case 'video/mp4':
			return 'video';
		case 'audio/mp3':
			return 'audio';
		case 'audio/mpeg':
			return 'audio';
		default:
			return 'image';
	}
};

export const getTeamOptions = (data, val) => {
	return data.find((value) => value.name === val)?.teams;
};

export const getMatchName = (date, name) => {
	return `${dayjs(date).format('DD-MM-YYYY')} - ${name
		.split('-')
		.join(' VS ')}`;
};
