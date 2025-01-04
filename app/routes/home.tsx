import type { Route } from './+types/home';
import { Welcome } from '../components/welcome/welcome';
// import { data } from 'react-router';

export function meta({}: Route.MetaArgs) {
	return [{ title: 'MyDeen AI' }, { name: 'description', content: 'MyDeen AI Agent' }];
}

// export async function loader() {
// 	throw data({ name: 'error', status: 404 });
// }

export default function Home() {
	return <Welcome />;
}
