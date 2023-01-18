export interface RichTextEditorProps {
	name: string;
	id: number;
	initialData: string;
	onBlur: () => void;
	onChange: () => void;
	error: string;
	disabled?: boolean;
}

/** The Rich Text Editor is a component to be used for text editing.
 * It contains formatters that format the title and the body with respect to the styles.
 * It contains menu with options of edit, copy, cut, paste, and insert.
 */

export default function RichTextEditor(props: RichTextEditorProps): JSX.Element;
