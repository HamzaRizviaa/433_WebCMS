const resetForm = (form) => {
	Object.keys(form).map((key) => {
		if (typeof form[key] === 'string') {
			form[key] = '';
		}
		if (typeof form[key] === 'object') {
			if (key === 'end_date') {
				// for question end_Date field
				form[key] = null;
			}
			form[key] = [];
		}

		form[key] = false; // for non - mandatory fields
	});
	return form;
};

export default resetForm;
