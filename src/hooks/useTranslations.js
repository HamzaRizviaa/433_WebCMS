import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { merge, isEmpty } from 'lodash';
import { useLazyGetTranslationQuery } from '../data/features/translation/translationQueries';
import { ToastErrorNotifications } from '../data/constants';

const defaultPrefix = 'slide';

const defaultLanguage = {
	name: 'English',
	prefix: 'ENG',
	shortName: 'en'
};

const useTranslations = ({
	customPrefix,
	customBaseLanguage,
	setData,
	rootData,
	slidesData,
	specificItem
} = {}) => {
	let prefix = customPrefix || defaultPrefix;
	let baseLanguage = customBaseLanguage || defaultLanguage;
	const prefix_plural = `${prefix}s`;
	// short name destructuring
	const { shortName: defaultLanguageShortName } = baseLanguage;

	//default State of translations
	const defaultTranslationsState = { [prefix_plural]: {} };

	// reference for storing base data
	const extractField = useRef(defaultTranslationsState);

	//translations
	const [rawTranslations, setRawTranslations] = useState(
		defaultTranslationsState
	);
	//Retranslation flag
	const [reTranslate, setRetranslate] = useState(false);
	// if translations changes or edited flad
	const [isTranslationChange, setIsTranslationChange] = useState(false);
	// translations available
	const [translationsAvailable, setTranslationsAvailable] = useState(false);
	// currently selected language
	const [currentLanguage, setCurrentLanguage] = useState(baseLanguage);

	// query for get translations from api
	const [getTranslations, { isFetching, isError, ...translationResponse }] =
		useLazyGetTranslationQuery();

	/**
	 * Hooks for mutating data & handling behaviour
	 */

	// on successfull response, update the translations state
	useEffect(() => {
		if (translationResponse.isSuccess) {
			setRawTranslations(translationResponse.data);
			setRetranslate(false);
			setIsTranslationChange(false);
		}
	}, [translationResponse.data]);

	// set parsed translations in state for further manipulation

	useEffect(() => {
		if (translationsAvailable) return; // to avoid again & again parsing on every field first time
		const parsedTranslations = parseTranslationsFromItem(specificItem || {});
		parsedTranslations && setRawTranslations(parsedTranslations);
	}, [specificItem]);

	// reset translations when change in base language
	useEffect(() => {
		if (reTranslate) {
			setRawTranslations({ en: rawTranslations['en'] });
		}
	}, [reTranslate]);

	// to check if the translations are available or not.
	useEffect(() => {
		let status = Object.keys(rawTranslations).length > 1;
		setTranslationsAvailable(status);
	}, [rawTranslations, reTranslate]);

	// if error show toast notification
	useEffect(() => {
		if (isError) {
			toast.error(ToastErrorNotifications.translationsFailed);
		}
	}, [isError]);

	/**
	 * Methods for manipulating translations
	 */

	// getTranslations from api
	const fetchTranslations = () => {
		let mergedObject = merge(
			extractField.current,
			rawTranslations[defaultLanguageShortName]
		);
		if (isEmpty(mergedObject[prefix_plural])) {
			delete mergedObject[prefix_plural];
		}
		getTranslations(mergedObject);
	};

	// Set field value in translations object and in root object as well
	const setField = (
		fieldName,
		value,
		translate = false,
		slideIndex,
		slideId
	) => {
		// debugger
		let isBaseLanguage = currentLanguage.shortName === defaultLanguageShortName;
		let slideIdIndicator = slideId === 0 ? true : slideId;
		if (slideIdIndicator) {
			// slides change in real array
			if (isBaseLanguage) {
				let allSlides = [...slidesData];
				let currentSlide = { ...allSlides[slideIndex] };
				currentSlide['data'][0] = {
					...currentSlide['data']?.[0],
					[fieldName]: value
				};
				allSlides[slideIndex] = currentSlide;
				slidesData = allSlides;
				setData({ slidesData });
			}
		} else {
			if (isBaseLanguage) {
				rootData = {
					...rootData,
					[fieldName]: value
				};
				setData({ rootData });
			}
		}

		if (translate) {
			if (isBaseLanguage) {
				!reTranslate && setRetranslate(true);
				extractField.current = defaultTranslationsState;
			} else {
				setIsTranslationChange(true);
			}

			if (slideIdIndicator) {
				let translations = JSON.parse(JSON.stringify(rawTranslations));

				translations[currentLanguage.shortName] = {
					...translations[currentLanguage.shortName]
				};
				translations[currentLanguage.shortName][`${prefix_plural}`] = {
					...translations[currentLanguage.shortName][`${prefix_plural}`]
				};
				translations[currentLanguage.shortName][`${prefix_plural}`][
					`${prefix}_${slideId}`
				] = {
					...translations[currentLanguage.shortName][`${prefix_plural}`][
						`${prefix}_${slideId}`
					]
				};
				translations[currentLanguage.shortName][`${prefix_plural}`][
					`${prefix}_${slideId}`
				][fieldName] = value;
				if (isBaseLanguage) {
					setRawTranslations(translations[defaultLanguageShortName]);
				} else {
					setRawTranslations(translations);
				}
			} else {
				let translations = JSON.parse(JSON.stringify(rawTranslations));
				translations[currentLanguage.shortName] = {
					...translations[currentLanguage.shortName]
				};
				translations[currentLanguage.shortName][fieldName] = value;
				if (isBaseLanguage) {
					setRawTranslations(translations[defaultLanguageShortName]);
				} else {
					setRawTranslations(translations);
				}
			}
		}
	};

	// Get field value from translations & root

	const getField = (fieldName, translate, slideIndex, slideId) => {
		let slideIdIndicator = slideId === 0 ? true : slideId;

		if (!translate) {
			if (slideIdIndicator) {
				return slidesData[slideIndex]?.['data']?.[0]?.[fieldName];
			} else {
				return rootData[fieldName];
			}
		}

		if (slideIdIndicator) {
			if (currentLanguage.shortName === defaultLanguageShortName) {
				let fieldFromTranslations =
					rawTranslations[currentLanguage.shortName]?.[`${prefix_plural}`]?.[
						`${prefix}_${slideId}`
					]?.[fieldName];
				let fieldFromSlide = slidesData[slideIndex]?.['data']?.[0]?.[fieldName];
				if (fieldFromTranslations) {
					return fieldFromTranslations;
				} else {
					if (fieldFromSlide) {
						// setField(fieldName,fieldFromSlde,true,slideIndex,slideId)
						extractField.current = {
							...extractField.current,
							[prefix_plural]: {
								...extractField.current?.[prefix_plural],
								[`${prefix}_${slideId}`]: {
									...extractField.current?.[prefix_plural]?.[
										`${prefix}_${slideId}`
									],
									[fieldName]: fieldFromSlide
								}
							}
						};
					}
					return fieldFromSlide || '';
				}
			} else {
				return (
					rawTranslations[currentLanguage.shortName]?.[`${prefix_plural}`]?.[
						`${prefix}_${slideId}`
					]?.[fieldName] || ''
				);
			}
		} else {
			if (currentLanguage.shortName === defaultLanguageShortName) {
				let fieldFromTranslation =
					rawTranslations[currentLanguage.shortName]?.[fieldName];
				if (fieldFromTranslation) {
					return fieldFromTranslation;
				} else {
					let fieldFromRoot = rootData[fieldName];
					if (fieldFromRoot) {
						extractField.current = {
							...extractField.current,
							[fieldName]: rootData[fieldName]
						};
					}
					return fieldFromRoot || '';
				}
			} else {
				return rawTranslations[currentLanguage.shortName]?.[fieldName] || '';
			}
		}
	};

	/**
	 * Parser & Setter
	 */

	// Parse languages and translations from an item eg: news

	const parseTranslationsFromItem = (obj) => {
		let transObj = {};
		transObj = JSON.parse(JSON.stringify(obj.translations || {})); //

		let languages = Object.keys(transObj); //['en','fr']

		languages.forEach((lan) => {
			obj.slides.forEach((slide) => {
				transObj[lan][prefix_plural] = { ...transObj[lan][prefix_plural] };
				transObj[lan][prefix_plural][`${prefix}_${slide.id}`] =
					slide.translations[lan];
			});
		});
		return transObj;
	};

	// Set Translations to payload (Compile item payload with loaded translations)

	const compilePayloadWithTranslations = (itemPayload) => {
		let translationsObject = JSON.parse(JSON.stringify(rawTranslations || {}));
		if (Object.entries(translationsObject).length <= 1) return itemPayload;
		let segrigatedTranslations = {};
		let langs = Object.keys(translationsObject);
		langs.forEach((lan) => {
			let internalKeys = Object.keys(translationsObject[lan]);
			internalKeys.forEach((internalKey) => {
				let current = translationsObject[lan][internalKey];

				if (internalKey === prefix_plural) {
					let slideKeys = Object.keys(current);
					slideKeys.forEach((slide) => {
						let c = translationsObject[lan][prefix_plural][slide];
						segrigatedTranslations[prefix_plural] = {
							...segrigatedTranslations[prefix_plural]
						};
						segrigatedTranslations[prefix_plural][slide] = {
							...segrigatedTranslations[prefix_plural][slide]
						};
						segrigatedTranslations[prefix_plural][slide][lan] = {
							...segrigatedTranslations[prefix_plural][slide][lan]
						};
						segrigatedTranslations[prefix_plural][slide][lan] = c;
					});
				} else {
					segrigatedTranslations['root'] = {
						...segrigatedTranslations['root']
					};
					segrigatedTranslations['root'][lan] = {
						...segrigatedTranslations['root'][lan]
					};
					segrigatedTranslations['root'][lan][internalKey] = current;
				}
			});
		});
		itemPayload = {
			...itemPayload,
			translations: { ...segrigatedTranslations.root }
		};
		itemPayload.slides.forEach((slide, i) => {
			if (segrigatedTranslations.slides?.[`${prefix}_${slide.translationId}`]) {
				itemPayload.slides[i] = {
					...slide,
					translations:
						segrigatedTranslations.slides[`${prefix}_${slide.translationId}`]
				};
			}
		});

		return itemPayload;
	};

	const resetTranslations = () => {
		setRawTranslations(defaultTranslationsState);
		setRetranslate(false);
		setIsTranslationChange(false);
		setCurrentLanguage(baseLanguage);
		extractField.current = defaultTranslationsState;
	};
	return [
		//trigger
		fetchTranslations,
		//basic methods and data
		{
			isFetching,
			isError,
			compilePayload: compilePayloadWithTranslations,
			getField,
			setField,
			setCurrentLanguage,
			currentLanguage,
			resetTranslations
		},
		// basic validation flags of translations
		{
			reTranslate,
			translationsAvailable,
			isTranslationChange
		}
	];
};

export default useTranslations;
