/**
 * RESUEABILITY & SCALABILITY
 *
 * Same notification content which is being used by multiple components/pages can be place in this file.
 */

/**
 * TOAST notifications will be populated inside these objects.
 */

// Below code could be un-commented when needed.

// export const ToastNotifications = {
//     itemCreatedSuccesfully : "Item has been created successfully"
// }

/**
 * All TOAST ERROR notifications will be populated inside this object.
 */

export const ToastErrorNotifications = {
	deleteBannerItemText:
		'This item cannot be deleted because it is inside the top banners.',
	stopQuestionBannerItemText:
		'This question cannot be stopped because it is inside the top banners.'
};
