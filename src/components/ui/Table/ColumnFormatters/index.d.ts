import React from 'react';
import { StatusBadgeProps } from '../../StatusBadge';
import { MediaPreviewerProps } from '../../../common/MediaPreviewer';

interface OptionsFormatterProps {
	title: string;
	notificationTitle?: string;
	contentType?: string;
	contentId?: string;
	notificationId?: string;
	notificationStatus?: string;
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

interface TextWithIconProps {
	content: string;
	Icon: React.ReactNode;
}

interface Formatters {
	status: StatusBadgeProps;
	options: OptionsFormatterProps;
	media: MediaPreviewerProps;
	markup: TextMarkupProps;
	wrapper: TextWrapperProps;
	textWithIcon: TextWithMultiIconProps;
	textAndIcon: TextWithIconProps;
}

export function getFormatter<T extends keyof Formatters>(
	type: T,
	props: Formatters[T]
): JSX.Element;
