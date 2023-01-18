import { DropzoneOptions } from 'react-dropzone';

export type FileObject = {
	id: string;
	file_name: string;
	type: 'image' | 'video' | 'audio';
	mime_type: string;
	fileExtension: string;
	media_url: string;
	height?: number;
	width?: number;
	duration?: number;
	file: File;
};

export type DropzoneFieldProps = DropzoneOptions & {
	name: string;
	value: FileObject[];
	formatMessage: string | JSX.Element;
	fileSizeMessage: string;
	label?: string;
	error?: string;
	onBlur?: React.FocusEventHandler<HTMLInputElement>;
	requiredDimension?: string;
	required?: boolean;
	onDelete?: (file: FileObject) => void;
	onPreview?: (file: FileObject) => void;
	showPreview?: boolean;
	hidePreviewIcon?: boolean;
	hideDeleteIcon?: boolean;
	readOnly?: boolean;
};

/**
 * `DropzoneField` is a wrapper over `React-Dropzone` package. This field is used to upload files by simply
 * clicking on field or by drag and drop file.
 */
export default function DropzoneField(props: DropzoneFieldProps): JSX.Element;
