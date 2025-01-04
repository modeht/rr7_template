import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from 'react-router';

import type { Route } from './+types/root';
import stylesheet from './app.css?url';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { usePersistedStore } from './store/store';
import type { ThemeSlice } from './store/themeSlice';
import { extractLang } from './server-lib/extract-lang';
import { DEFAULT_LANG } from './i18n/supported';
import { useLang } from './hooks/useLang';
import { LanguageContext } from './contexts/languageContext';

export const links: Route.LinksFunction = () => [
	{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
	{
		rel: 'preconnect',
		href: 'https://fonts.gstatic.com',
		crossOrigin: 'anonymous',
	},
	{
		rel: 'stylesheet',
		href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
	},
	{ rel: 'stylesheet', href: stylesheet },
];

export async function loader({ request }: Route.LoaderArgs) {
	const { lang, t } = await extractLang(request);
	const theme =
		request.headers
			.get('cookie')
			?.split(';')
			.find((c) => c.trim().startsWith('theme='))
			?.split('=')[1] || 'inherit';

	return {
		theme: theme as ThemeSlice['mode'],
		lang,
		t,
	};
}

export function Layout({ children }: { children: React.ReactNode }) {
	const serverData = useLoaderData<typeof loader>();
	//for whatever reason server data is sometimes undefined in dev mode
	const theme = usePersistedStore((state) => state.mode) || serverData?.theme;
	const lang = serverData?.lang;

	return (
		<html
			lang={lang}
			dir={lang === 'ar' ? 'rtl' : 'ltr'}
		>
			<head>
				<meta charSet='utf-8' />
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1'
				/>
				<Meta />
				<Links />
			</head>
			<body>
				<Theme appearance={theme}>{children}</Theme>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	const d = useLang();
	return (
		<LanguageContext.Provider value={d}>
			<Outlet />
		</LanguageContext.Provider>
	);
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	console.log('fromerror', useLoaderData());
	let message = 'Oops!';
	let details = 'An unexpected error occurred.';
	let stack: string | undefined;

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? '404' : 'Error';
		details = error.status === 404 ? 'The requested page could not be found.' : error.statusText || details;
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message;
		stack = error.stack;
	}

	return (
		<main className='pt-16 p-4 container mx-auto'>
			<h1>{message}</h1>
			<p>{details}</p>
			{stack && (
				<pre className='w-full p-4 overflow-x-auto'>
					<code>{stack}</code>
				</pre>
			)}
		</main>
	);
}
