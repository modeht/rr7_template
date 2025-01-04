import { Flex, Text } from '@radix-ui/themes';
import { usePersistedStore } from '../../store/store';
import { useContext } from 'react';
import { LanguageContext } from '../../contexts/languageContext';
import { Button } from '~/components/ui/button';

export function Welcome() {
	const toggleTheme = usePersistedStore((state) => state.toggle);
	const lang = useContext(LanguageContext);
	return (
		<Flex
			direction='column'
			gap='2'
		>
			<Text>{lang.t.hello}</Text>
			{/* <Button onClick={() => toggleTheme()}>Let's go</Button> */}
			<Button variant='outline'>Button</Button>
		</Flex>
	);
}
