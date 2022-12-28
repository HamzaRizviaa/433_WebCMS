const checkFileSize = (file, library) => {
	if (
		file.type === 'image/jpeg' ||
		file.type === 'image/png' ||
		file.type === 'image/jpg'
	) {
		if (library === 'viral') {
			if (file.size > 50000000) {
				//bytes
				return {
					code: 'size-too-large',
					message: `The file size you are trying to upload exceeds the limit of 50MB.`
				};
			}
		} else if (file.size > 1000000) {
			//bytes
			return {
				code: 'size-too-large',
				message: `The file size you are trying to upload exceeds the limit of 1MB.`
			};
		}
	}
	if (file.type === 'video/mp4') {
		console.log('Found Video');
		if (file.size > 5368709120) {
			return {
				code: 'size-too-large',
				message: `The size of the file is higher than 5 GB`
			};
		}
	} else {
		// for audio file
		if (file.size > 209715200) {
			console.log("got in audio'");
			return {
				code: 'size-too-large',
				message: `The size of the file is too high`
			};
		}
	}
};

export default checkFileSize;
