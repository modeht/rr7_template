import { useLoaderData, useParams } from 'react-router';
import { DEFAULT_LANG, type SupportedLanguages } from '../i18n/supported';

export function useLang() {
	const url = useParams();
	const t = useLoaderData()?.t || { error: 'No translation file found' };
	return { lang: (url.lang as SupportedLanguages) || DEFAULT_LANG, t };
}
