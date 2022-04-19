const resetForm = (form) => {
	Object.keys(form).map((key) => {
		if (typeof form[key] === 'string') {
			form[key] = '';
		}
		if (typeof form[key] === 'object') {
			form[key] = [];
		}
		return false; // for non - mandatory fields
	});
	return form;
};

export default resetForm;
