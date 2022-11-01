import { useEffect } from 'react';

function useClickOutside(ref, handler) {
	useEffect(() => {
		// Run if clicked on outside of element
		function handleClickOutside(event) {
			if (handler && ref.current && !ref.current.contains(event.target)) {
				handler();
			}
		}

		// Bind the event listener
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [ref]);
}

export default useClickOutside;
