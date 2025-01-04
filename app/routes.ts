import { type RouteConfig, index, layout, prefix } from '@react-router/dev/routes';

export default [
	index('routes/unsupported-lang.tsx'),
	...prefix(':lang', [index('routes/home.tsx')]),
] satisfies RouteConfig;
