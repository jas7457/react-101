import CodeBlock, { CodeBlockViewer } from '../../components/CodeBlock';
import Heading from '../../components/Heading';
import List, { ListItem } from '../../components/List';

export default function ComponentsIntro() {
	return (
		<div>
			<Heading level={1}>Components - An Introduction</Heading>
			<div className="space-y-8">
				<p>
					Components are the building blocks for just about everything in React. They handle not
					only the UI (think hbs files), but also the business logic (think Ember controller).
				</p>

				<section>
					<Heading level={2}>What does a component do?</Heading>
					<List>
						<ListItem>
							Uses JSX as a templating language to render to the "Virtual DOM" - just think of it
							like html and the DOM
						</ListItem>
						<ListItem>
							Can use <b>any</b> JavaScript inside of its function (no need for template modifiers,
							helpers, etc) - it is simply JavaScript under the hood.
						</ListItem>
						<ListItem>
							Things like fetching data from the server happen in a component (or hook), there
							aren't separate paradigms for routes, models, adapters, authenticators, controllers,
							etc. It all happens in components &amp; hooks
						</ListItem>
						<ListItem>
							File structure does not matter. You have to explicitly import a component to use it.
							This also means that you can have multiple components per file.
						</ListItem>
					</List>

					<CodeBlockViewer
						files={{
							'/App.tsx': `
								import List, { ListItem } from "./List";

								export default function App() {
									return (
										<List>
											<ListItem>Item 1</ListItem>
											<ListItem>Item 2</ListItem>
										</List>
									);
								}
							`,
							'/List.tsx': `
								export default function List({ children }) {
									return <ul>{children}</ul>;
								}
								
								export function ListItem({ children }) {
									return <li>{children}</li>;
								}
							`,
						}}
					>
						a
					</CodeBlockViewer>
				</section>

				<section className="space-y-4">
					<Heading level={2}>Component Hello World!</Heading>
					<p>
						There are two types of components: Class Components and Function Components. I'd
						recommend <b>only</b> learning function components and always use them. That is what we
						will explore in this repo.
					</p>

					<p>At its base, a component just needs to return some JSX (html)</p>

					<CodeBlock>
						{`
						export default function HelloWorld() {
							return <div>Hello World</div>;
						}`}
					</CodeBlock>
				</section>

				<section className="space-y-4">
					<p>
						Anything written in {`{}`} braces will be executed as a JavaScript expression. Anything
						that JavaScript can run is valid.
					</p>
					<CodeBlock>
						{`
						export default function HelloWorld() {
							const name = 'World';
						
							return (
								<div>
									Hello {name.toLowerCase()} it is{' '}
									{new Date().toLocaleDateString(undefined, {
										month: 'short',
										day: 'numeric',
										year: 'numeric',
									})}
								</div>
							);
						}`}
					</CodeBlock>
				</section>

				<section className="space-y-4">
					<Heading level={2}>Component Gotchas</Heading>
					<p>There are a few gotchas with components that might catch you off guard.</p>

					<List type="ordered">
						<ListItem>
							Components need to start with a capital letter so React knows if it's rendering a
							component or an html tag
						</ListItem>
						<ListItem>You have to use "className" instead of "class" on any html tags</ListItem>
						<ListItem>
							When rendering lists, it is important to use the "key" attribute on each item (more on
							that later).
						</ListItem>
						<ListItem>
							Attaching event listeners uses camel-cased props prefixed with "on". For example, if
							you wanted to attach a click listener you would use <code>onClick</code>.
						</ListItem>
						<ListItem>
							A component must return at most one element. If it wants to return multiple, it needs
							to wrap it in <code>{`<React.Fragment></React.Fragment>`}</code> or simply {`<></>`}{' '}
							for a shorthand
						</ListItem>
					</List>

					<CodeBlock>
						{`
						export default function GotchaExample() {
							return (
								<>
									<div className="bg-blue-500">I am some text that is inside of a fragment</div>
									<button onClick={() => alert("hello")}>
										Click me!
									</button>
								</>
							);
						}`}
					</CodeBlock>
				</section>
			</div>
		</div>
	);
}
