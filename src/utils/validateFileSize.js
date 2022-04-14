const checkFileSize = (file) => {
	if (
		file.type === 'image/jpeg' ||
		file.type === 'image/png' ||
		file.type === 'image/jpg'
	) {
		if (file.size > 52428800) {
			return {
				code: 'size-too-large',
				message: `Image file Too Large`
			};
		}
	}
	if (file.type === 'video/mp4') {
		if (file.size > 10737418240) {
			return {
				code: 'size-too-large',
				message: `Video file Too Large`
			};
		}
	}
	if (file.size > 209715200) {
		return {
			code: 'size-too-large',
			message: `Audio file Too Large`
		};
	}
};

export default checkFileSize;
