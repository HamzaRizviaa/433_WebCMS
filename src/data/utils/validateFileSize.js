const checkFileSize = (file) => {
	console.log(file, 'file in validate file size');
	if (
		file.type === 'image/jpeg' ||
		file.type === 'image/png' ||
		file.type === 'image/jpg'
	) {
		if (file.size > 52428800) {
			//bytes
			return {
				code: 'size-too-large',
				message: `the size of the file is too high`
			};
		}
	}
	if (file.type === 'video/mp4') {
		console.log('Found Video');
		if (file.size > 10737418240) {
			return {
				code: 'size-too-large',
				message: `the size of the file is too high`
			};
		}
	} else {
		// for audio file
		if (file.size > 209715200) {
			console.log("got in audio'");
			return {
				code: 'size-too-large',
				message: `the size of the file is too high`
			};
		}
	}
};

export default checkFileSize;
