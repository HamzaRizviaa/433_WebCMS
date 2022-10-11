import { useEffect } from 'react';

const useScript = (url) => {
	useEffect(() => {
		const script = document.createElement('script');
		script.id = 'social-script';
		script.src = url;
		script.defer = true;

		if (document.getElementById('social-script')) {
			return;
		} else {
			document.body.appendChild(script);
		}

		return () => {
			document.body.removeChild(script);
		};
	}, [url]);
};

export default useScript;
