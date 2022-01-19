import clsx from 'clsx';
import React from 'react';
import { CodeBlockViewer } from '../components/CodeBlock';
import ExternalLink from '../components/ExternalLink';
import Heading from '../components/Heading';
import InternalLink from '../components/InternalLink';
import List, { ListItem } from '../components/List';

export default function EmberToReact() {
	return (
		<div className="space-y-8">
			<Heading level={1}>Ember to React</Heading>

			<p>
				Ember has a lot of different paradigms, which is why it's generally a larger learning curve
				than React. Most concepts in Ember can be translated to the three concepts I outlined in
				this repository. I will break down the translation below.
			</p>

			<List className="space-y-4">
				<ListItem>
					<b>Explicit file structure → Wild West</b>
					<p>
						Ember works by having a very explicit file structure and things only work if they are in
						certain named folders. React doesn't care. Put your files anywhere, you just have to
						explicitly <code>import</code> anything that you want to use.
					</p>

					<p>
						That being said, it's pretty common to see folders for components, hooks, context, and
						maybe a utils/utilities/helpers folder as well. I'd also recommend that the "components"
						folder has a folder per component instead of individual files. That way you can put any
						related files in the same folder (component, styles, tests, etc)
					</p>
				</ListItem>

				<ListItem>
					<b>"Global" Styles → CSS Modules</b>
					<p>
						As far as I know, you can't do local css file imports in Ember (for example,{' '}
						<code>import styleSheet from './styles.css';</code> - this really breaks full
						encapsulation for components. For instance, if you delete a component it won't
						automatically remove its styles. In React there are a lot of options.
						<List>
							<ListItem>
								Import a normal{' '}
								<ExternalLink href="https://vitejs.dev/guide/features.html#css">
									<code>.css</code>
								</ExternalLink>{' '}
								file at the top of your component - when you delete the component, your imported css
								will no longer be bundled
							</ListItem>
							<ListItem>
								Import a{' '}
								<ExternalLink href="https://vitejs.dev/guide/features.html#css-modules">
									<code>.module.css</code>
								</ExternalLink>{' '}
								file at the top of your component - preferred over normal css because it is scoped
								css by default
							</ListItem>
							<ListItem>
								Just use tailwind classes. These are automatically purged if no longer used in your
								project, so there's no worry about state styles.
							</ListItem>
						</List>
					</p>
				</ListItem>

				<ListItem>
					<b>Engines → ESM / Suspense &amp; React.lazy</b>
					<p>
						Ember engines provide lazy loading / code splitting. React relies more on
						JavaScript/EcmaScript Modules and their ability to be lazy loaded via{' '}
						<ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#dynamic_imports">
							JavaScript dynamic imports
						</ExternalLink>
						. This repo has a <code>Routes.tsx</code> file for an example of this in the context of{' '}
						<code>react-router-dom</code>, or{' '}
						<ExternalLink href="https://reactjs.org/docs/react-api.html#reactlazy">
							React docs
						</ExternalLink>{' '}
						has a simple example as well.{' '}
						<b>
							Note: You can lazy load <em>any</em> component in React, it does not have to be on a
							per-page basis
						</b>{' '}
						(although there might not be a good use case to do any more granular than page-level).
					</p>
				</ListItem>

				<ListItem>
					<b>Routes → react-router-dom</b>
					<p>
						React does not have any concepts of routes built in. react-router is the gold standard
						for <em>client-side</em> routing. Alternatively,{' '}
						<ExternalLink href="https://nextjs.org/">next.js</ExternalLink> is the gold standard for
						using <em>server-side</em> rendered React and has its own routing built in. The v6
						version of react-router-dom was just released and is pretty different from previous
						versions, so be careful when looking at stack overflows / documentation. View their docs{' '}
						<ExternalLink href="https://reactrouter.com/">here</ExternalLink>.
					</p>
				</ListItem>

				<ListItem>
					<b>Models → useEffect for data fetching</b>
					<p>
						As mentioned, React does not have a concept of routes built in. Therefor, you generally
						fetch data directly in the component that needs it. There is an{' '}
						<InternalLink to="/hooks/useEffect">example</InternalLink> on this page with the "Data
						Fetching" section.
					</p>

					<p>
						One down-side to this is that the each component then needs to handle logic for loading
						states, errors, etc. There is a large change coming known as{' '}
						<ExternalLink href="https://reactjs.org/docs/concurrent-mode-suspense.html">
							Suspense for Data Fetching
						</ExternalLink>{' '}
						which is currently experimental. This will allow for a more consistent way of fetching
						data while, from the component's perspective, be able to handle the data as if it were
						retrieved synchronously. For now, I'd recommend creating a <code>Page</code> component
						or <code>usePage</code> hook or some such that can handle the logic for loading states,
						errors, etc in one place.
					</p>
				</ListItem>

				<ListItem>
					<b>Adapters → ?</b>
					<p>
						These are pretty unnecessary in React. Since it is not opinionated about the data you
						are fetching, it will not perform any mutations to the fetch call (or other way of
						retrieving data) you make. If you want mutations to the data, you do that yourself.
					</p>
				</ListItem>

				<ListItem>
					<b>Serializers → ?</b>
					<p>
						These are similarly unnecessary in React. Mutate the data you fetch directly in the
						fetch call. If you find yourself repeating yourself a lot, either put the logic in a
						function or a hook if it makes sense.
					</p>
				</ListItem>

				<ListItem>
					<b>@tracked → useState</b>
					<p>
						@tracked is usually just a local state variable. That has a fairly 1-to-1 with the{' '}
						<InternalLink to="/hooks/useState">
							<code>useState</code>
						</InternalLink>{' '}
						hook conceptually, but has a different way to interact with the variables.
					</p>

					<SplitView
						className="my-4"
						ember={
							<CodeBlockViewer>
								{`
								class MyComponent extends Component {
									@tracked firstName = 'Joe';
								}
								`}
							</CodeBlockViewer>
						}
						react={
							<CodeBlockViewer>
								{`
								function MyComponent() {
									const [firstName, setFirstName] = useState('Joe');
								}
								`}
							</CodeBlockViewer>
						}
					/>
				</ListItem>

				<ListItem>
					<b>Template hbs files &amp; Controller js → Components</b>
					<p>
						Pretty 1-to-1, should be self-explanatory. <b>Components are not singletons</b> unlike
						Ember controllers.
					</p>

					<SplitView
						className="my-4"
						ember={
							<CodeBlockViewer
								customSetup={{ main: '/my-component.js' }}
								files={{
									'/my-component.js': `
										import Component from '@glimmer/component';
										import { action } from '@ember/object';
										import { tracked } from '@glimmer/tracking';

										export default class MyComponent extends Component {
											@tracked clicks = 0;

											@action
											handleClick() {
												this.clicks++;
											}
										}
									`,
									'/my-component.hbs': `
										<div>You have clicked {{this.clicks}} times</div>
										<button {{on 'click' this.handleClick}}>Click Me</button>
									`,
								}}
							>
								Ignore
							</CodeBlockViewer>
						}
						react={
							<CodeBlockViewer
								customSetup={{ main: '/MyComponent.tsx' }}
								files={{
									'/MyComponent.tsx': `
										import { useState } from 'react';
										
										export default function MyComponent() {
											const [clicks, setClicks] = useState(0);
											return (
												<>
													<div>You have clicked {clicks} times</div>
													<button onClick={() => setClicks(clicks + 1)}>
														Click Me
													</button>
												</>
											);
										}
									`,
								}}
							>
								Ignore
							</CodeBlockViewer>
						}
					/>
				</ListItem>

				<ListItem>
					<b>Component hbs &amp; Component js → Components</b>
					<p>Pretty 1-to-1, should be self-explanatory</p>
				</ListItem>

				<ListItem>
					<b>Services → Hooks and/or Context</b>
					<p>
						This one is not as black-and-white. Depending on the service, it could be a mixture of
						Hooks and/or Context.
					</p>
					<p>
						Services are singletons - there is <em>nothing</em> that is a singleton inside of React.
						A Context is only shared between its children, so the same Context can have multiple
						values inside of an application, although it's pretty commonplace that a Context is
						wrapped globally (effectively acting as a singleton).
					</p>
					<p>
						Additionally, services collect bits of related data and functions to be consumable
						anywhere in the application. You could imagine a <code>useUser</code> custom hook that
						has plain JSON data about the signed in user, but also methods to sign in and sign out.
						This would likely utilize Context to provide that user to the application, but would use
						hooks to get/set state, provide the login/logout methods, etc.
					</p>
				</ListItem>

				<ListItem>
					<b>Mixins → Custom Hooks</b>
					<p>
						This has a pretty good parallel to custom hooks. Mixins have been deprecated in Ember,
						but the notion of a "mixin" is almost exactly what a custom hook does. It provides a way
						to fully encapsulate business logic for a certain thing into a simple callable function.
					</p>
				</ListItem>

				<ListItem>
					<b>Modifiers → JavaScript function</b>
					<p>
						Since you have full access to anything JavaScript when writing a React component,
						modifiers aren't really necessary. Just put the logic in an exported JavaScript function
						and import it anywhere you want to use it.
					</p>
				</ListItem>

				<ListItem>
					<b>getters → variables / derived state</b>
					<p>
						Ember uses getters a lot, and a lot of the time it's to figure out derived state (ex a
						fullName getter that combines firstName and lastName). In React, you just have a
						variable in your function component body with firstName and lastName being state,
						therefore fullName is always up to date.
					</p>

					<SplitView
						className="my-4"
						ember={
							<CodeBlockViewer>
								{`
								class MyComponent extends Component {
									@tracked firstName = 'Joe';
									@tracked lastName = 'Dirt';

									get fullName() {
										return \`\${this.firstName} \${this.lastName}\`
									}
								}
								`}
							</CodeBlockViewer>
						}
						react={
							<CodeBlockViewer>
								{`
								function MyComponent() {
									const [firstName, setFirstName] = useState('Joe');
									const [lastName, setLastName] = useState('Dirt');
	
									const fullName = \`\${firstName} \${lastName}\`;
	
									return <div>{fullName}</div>;
								}
								`}
							</CodeBlockViewer>
						}
					/>

					<p>
						If the getter equivalent is computationally expensive, you can instead use the{' '}
						<InternalLink to="/hooks/useMemo">useMemo</InternalLink> hook to only recompute if the
						dependencies change.
					</p>
				</ListItem>

				<ListItem>
					<b>Splattributes → JavaScript Spread Syntax</b>
					<p>
						Ember has the notion of "spattributes" to spread the attributes to an HTML element.
						React just uses the{' '}
						<ExternalLink href="https://reactjs.org/docs/jsx-in-depth.html#spread-attributes">
							JS spread operator
						</ExternalLink>{' '}
						to accomplish the same thing, but can also pass spread properties to other components.{' '}
						<b>Note that React will not automatically combine classes like Ember does.</b> I
						recommend using <ExternalLink href="https://github.com/lukeed/clsx">clsx</ExternalLink>{' '}
						to combine classes along with its ability to do conditional classes.
					</p>
				</ListItem>

				<ListItem>
					<b>QUnit → Jest &amp; React Testing Library</b>
					<p>
						React does not have a testing library built in, but typically comes bundled with{' '}
						<ExternalLink href="https://jestjs.io/">jest</ExternalLink> for the test runner. Jest
						also has some purely JavaScript (non-DOM) related utilities built in for testing, but
						jest is typically coupled with{' '}
						<ExternalLink href="https://testing-library.com/docs/react-testing-library/intro/">
							React Testing Library
						</ExternalLink>{' '}
						for testing DOM interactions. Also, Kent C. Dodd's (main author or React Testing Library
						and test guru) has a{' '}
						<ExternalLink href="https://kentcdodds.com/blog/write-tests">aood article</ExternalLink>{' '}
						on writing tests.
					</p>
				</ListItem>
			</List>
		</div>
	);
}

function SplitView({
	ember,
	react,
	className,
}: {
	ember: React.ReactNode;
	react: React.ReactNode;
	className?: string;
}) {
	return (
		<div className={clsx(className, 'grid grid-cols-2 gap-4 bg-gray-200 px-4 py-2 rounded')}>
			<div>
				<b className="mb-2 block text-center">Ember</b>
				<div>{ember}</div>
			</div>

			<div>
				<b className="mb-2 block text-center">React</b>
				<div>{react}</div>
			</div>
		</div>
	);
}
