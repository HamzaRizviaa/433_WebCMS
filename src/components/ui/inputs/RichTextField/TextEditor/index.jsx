/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import 'tinymce/tinymce';
import 'tinymce/icons/default';
import 'tinymce/themes/silver';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/hr';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/textcolor';
import 'tinymce/plugins/colorpicker';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/charmap';
import 'tinymce/skins/ui/oxide/skin.min.css';
import 'tinymce/skins/ui/oxide/content.min.css';
import 'tinymce/skins/content/default/content.min.css';
import { formatAndStyle, Menu } from '../../../../../data/helpers/textFieldHelpers';
import { useTextEditorStyles } from './index.style';

const TextEditor = ({ item, setDisableDropdown, clickExpandIcon, initialData, sendDataToParent }) => {
    const classes = useTextEditorStyles()
    const [description, setDescription] = useState('');

    useEffect(() => {
		if (initialData?.description) {
			setTimeout(() => {
				let editorbyId =
					window.tinymce?.get(`text-${item.sortOrder}_ifr`) ||
					window.tinymce?.get(`text-${item.sortOrder}`);
				setDescription(editorbyId?.setContent(initialData?.description));
			}, 1000);
		}
	}, [clickExpandIcon]);

    const handleEditorChange = () => {
		const editorTextContent = window.tinymce
			?.get(`text-${item.sortOrder}`)
			?.getContent();
		const textContent = window.tinymce
			?.get(`text-${item.sortOrder}`)
			?.getContent({ format: 'text' });
		setDescription(editorTextContent);
		if (textContent === '') {
			sendDataToParent([{ description: '' }]);
		} else {
			sendDataToParent([{ description: editorTextContent }]);
		}
	};
	return (
		<div className={classes.editor}>
			<Editor
				init={{
					height: 288,
					selector: '#myTextarea',
					id: '#myTextarea',
					browser_spellcheck: true,
					contextmenu: false,
					content_css: '../../styles/index.scss',
					setup: function (editor) {
						editor.on('init', function () {
							description;
						});
					},
					content_style:
						"@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap'); body { font-family: Poppins; color: white; line-height:1  }; ",

					branding: false,
					statusbar: true,
					skin: false,
                    ...formatAndStyle,
					menubar: 'edit insert format',
					menu: Menu,
					plugins: [
						'lists advlist link image anchor',
						'searchreplace  hr fullscreen',
						'insertdatetime paste wordcount  charmap textcolor colorpicker'
					]
				}}
				onEditorChange={() => handleEditorChange()}
				onMouseEnter={() => setDisableDropdown(false)}
				onBlur={() => setDisableDropdown(true)}
				id={`text-${item.sortOrder}`}
			/>
		</div>
	);
};

export default TextEditor;
