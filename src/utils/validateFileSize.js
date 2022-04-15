const checkFileSize = (file) => {
	if (
		file.type === 'image/jpeg' ||
		file.type === 'image/png' ||
		file.type === 'image/jpg'
	) {
		if (file.size > 52428800) {
			return {
				code: 'size-too-large',
				message: `the size of the file is too high`
			};
		}
	}
	if (file.type === 'video/mp4') {
		if (file.size > 10737418240) {
			return {
				code: 'size-too-large',
				message: `the size of the file is too high`
			};
		}
	}
	if (file.size > 209715200) {
		return {
			code: 'size-too-large',
			message: `the size of the file is too high`
		};
	}
};

export default checkFileSize;
