import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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
import { formatAndStyle, Menu } from '../../../../data/helpers/textFieldHelpers';
import { useTextEditorStyles } from './index.style';

const RichTextEditor = ({
    name,
	id,
	initialData,
    onBlur,
    onChange,
    error
}) => {
	const classes = useTextEditorStyles();
	const [description, setDescription] = useState('');

	useEffect(() => {
		if (initialData?.description) {
			setTimeout(() => {
				let editorbyId =
					window.tinymce?.get(`text-${id}_ifr`) ||
					window.tinymce?.get(`text-${id}`);
				setDescription(editorbyId?.setContent(initialData?.description));
			}, 1000);
		}
	}, [initialData]);

	const handleEditorChange = () => {
		const editorTextContent = window.tinymce
			?.get(`text-${id}`)
			?.getContent();
		setDescription(editorTextContent);
        if(onChange){
            onChange(editorTextContent)
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
				onEditorChange={handleEditorChange}
                onBlur={onBlur}
				id={`text-${id}`}
                name={name}
			/>
            <span>{error}</span>
		</div>
	);
};

RichTextEditor.propTypes = {
    name: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
	initialData: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    error: PropTypes.string
}

export default RichTextEditor;
