import Heading from '../components/Heading';
import List, { ListItem } from '../components/List';

export default function Introduction() {
	return (
		<>
			<Heading level={1}>Introduction</Heading>
			<p>
				React is a JavaScript library for building user interfaces. It has a few main ideas that
				will get you pretty far along with your understanding of React, but also allows for advanced
				patterns later. We will just focus on a few in this 101.
			</p>

			<List>
				<ListItem>Components</ListItem>
				<ListItem>Hooks</ListItem>
				<ListItem>Context</ListItem>
			</List>
		</>
	);
}
