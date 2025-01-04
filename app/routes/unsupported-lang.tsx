import { data, redirect, type LoaderFunctionArgs } from 'react-router';
import { DEFAULT_LANG, supportedLanguages } from '../i18n/supported';

export async function loader({ request }: LoaderFunctionArgs) {
	const isLang = request.url.split('/')[1];
	console.log(isLang);
	if (!supportedLanguages.includes(isLang)) {
		return redirect(`/${DEFAULT_LANG}`);
	}
	throw data("This shouldn't happen", { status: 404 });
}

export default function UnsupportedLangRedirect() {
	return null;
}
