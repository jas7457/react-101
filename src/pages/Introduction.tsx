import Heading from '../components/Heading';
import InternalLink from '../components/InternalLink';
import List, { ListItem } from '../components/List';

export default function Introduction() {
	return (
		<div className="space-y-8">
			<Heading level={1}>Introduction</Heading>
			<p>
				React is a JavaScript library for building user interfaces. It has a few main ideas that
				will get you pretty far along with your understanding of React, but also allows for advanced
				patterns later. We will just focus on the main concepts in this 101 that will get you 90% of
				the way.
			</p>

			<List>
				<ListItem>
					<InternalLink to="/components/intro">Components</InternalLink>
				</ListItem>
				<ListItem>
					<InternalLink to="/hooks/intro">Hooks</InternalLink>
				</ListItem>
				<ListItem>
					<InternalLink to="/context">Context</InternalLink>
				</ListItem>
			</List>
		</div>
	);
}
