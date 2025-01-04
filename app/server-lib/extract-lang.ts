import { DEFAULT_LANG, supportedLanguages, type SupportedLanguages } from '../i18n/supported';
import ar from '../i18n/ar.json';
import en from '../i18n/en.json';

const langs = { ar, en };

export async function extractLang(request: Request) {
	const lang = new URL(request.url).pathname.split('/')[1] as SupportedLanguages;
	if (supportedLanguages.includes(lang)) {
		const t = langs[lang];
		return { lang: lang, t };
	}
	const t = langs[DEFAULT_LANG];
	return { lang: DEFAULT_LANG, t };
}
