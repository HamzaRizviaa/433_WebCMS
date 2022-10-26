export interface MediaPreviewerProps {
	fileName: string;
	fileHeight: number;
	fileWidth: number;
	mediaUrl: string;
	thumbnailUrl?: string;
	showSlidesIcon?: boolean;
	noOfSlides?: number;
}

/**
 * This `MediaPreviewer` component is specifically made for use in table columns. Its responsibility is to
 * render media and preview them on hover.
 */
export default function MediaPreviewer(props: MediaPreviewerProps): JSX.Element;
