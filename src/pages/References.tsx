import ExternalLink from '../components/ExternalLink';
import Heading from '../components/Heading';
import List, { ListItem } from '../components/List';

export default function References() {
	return (
		<div className="space-y-8">
			<Heading level={1}>References</Heading>

			<p>Some helpful links for additional research</p>

			<List className="space-y-4">
				<ListItem>
					<ExternalLink href="https://reactjs.org/docs/getting-started.html">
						React Docs
					</ExternalLink>{' '}
					- focus on using functional components and hooks and not on class components.
				</ListItem>
				<ListItem>
					<ExternalLink href="https://reactjs.org/docs/hooks-reference.html">
						Hooks API Reference
					</ExternalLink>{' '}
					- covers all the hooks that I did not cover in this repo. I recommend the new docs (below)
					when they are fully published.
				</ListItem>

				<ListItem>
					<ExternalLink href="https://beta.reactjs.org/">React Docs Rewrite</ExternalLink> - React
					is rewriting its docs to teach using hooks instead of classes. This is still a WIP.
				</ListItem>

				<ListItem>
					<ExternalLink href="https://www.youtube.com/watch?v=wXLf18DsV-I&ab_channel=ReactConf">
						Ryan Florence's talk on React hooks
					</ExternalLink>{' '}
					- teaches you how to think in hooks and the problems they solve.
				</ListItem>

				<ListItem>
					<ExternalLink href="https://react-typescript-cheatsheet.netlify.app/docs/basic/setup/">
						React TypeScript Cheatsheet
					</ExternalLink>{' '}
					- shows common cases and how to correctly type them in TypeScript (I really recommend the{' '}
					<ExternalLink href="https://react-typescript-cheatsheet.netlify.app/docs/advanced/patterns_by_usecase">
						Useful Patterns by Use Case
					</ExternalLink>{' '}
					page).
				</ListItem>
				<ListItem>
					<ExternalLink href="https://wiki.proofpoint.com/wiki/display/DEV/Jason+Addleman+Transition+plan#JasonAddlemanTransitionplan-ReactTransitionPlan">
						React Transition Plan
					</ExternalLink>{' '}
					- the POCs that I went over in the dev chat
				</ListItem>
			</List>
		</div>
	);
}
