export interface MediaPreviewerProps {
	thumbnailUrl: string;
	mediaUrl: string;
	fileName: string;
	fileHeight: number;
	fileWidth: number;
	showSlidesIcon?: boolean;
	noOfSlides?: number;
}

/**
 * This `MediaPreviewer` component is specifically made for use in table columns. Its responsibility is to
 * render media and preview them on hover.
 */
export default function MediaPreviewer(props: MediaPreviewerProps): JSX.Element;
