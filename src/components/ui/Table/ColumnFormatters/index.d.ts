import { StatusBadgeProps } from '../../StatusBadge';
import { MediaPreviewerProps } from '../../../common/MediaPreviewer';

interface OptionsFormatterProps {
	title: string;
	styledClass?: string;
}

interface TextMarkupProps {
	content: string;
}

interface TextWrapperProps {
	content: string;
}

interface TextWithMultiIconProps {
	content: string;
	showIcon: boolean;
}

interface Formatters {
	status: StatusBadgeProps;
	options: OptionsFormatterProps;
	media: MediaPreviewerProps;
	markup: TextMarkupProps;
	wrapper: TextWrapperProps;
	textWithIcon: TextWithMultiIconProps;
}

export function getFormatter<T extends keyof Formatters>(
	type: T,
	props: Formatters[T]
): JSX.Element;
