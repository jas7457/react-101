import CodeBlock, { CodeBlockViewer } from '../../components/CodeBlock';
import Heading from '../../components/Heading';
import List, { ListItem } from '../../components/List';
import ExternalLink from './ExternalLink';

import tsExample from './ts-example.png';

export default function ComponentProps() {
	return (
		<div className="space-y-8">
			<Heading level={1}>Components - Props</Heading>

			<section className="space-y-4">
				<p>
					Very similar to <code>args</code> in Ember, React uses <code>props</code> to pass data
					into a component. Any JavaScript value can be passed as a prop (strings, booleans,
					functions, etc). If a prop does not have a value (disabled) below it is assumed to be the{' '}
					<code>true</code> boolean
				</p>

				<CodeBlockViewer>
					{`
					export default function App() {
						return (
							<SomeComponent
								name="Jake"
								age={38}
								obj={{ some: "prop" }}
								onClick={() => alert("you clicked it!")}
								active={false}
								disabled
							/>
						);
					}
					`}
				</CodeBlockViewer>

				<p>
					A few values will not be rendered to the DOM. These values include{' '}
					<code>null undefined true false</code>. This is useful if you want to return early from
					rendering a component when something is not available.
				</p>

				<CodeBlockViewer>
					{`
					function SomeComponent(props) {
						if(!props.name) {
							return null;
						}
					
						return (
							<div>{props.name}</div>
						);
					}`}
				</CodeBlockViewer>

				<p>
					Props are simply passed as a single parameter to the function component. It's pretty
					commonplace to destructure the prop names in the function. This has two benefits: to
					easily see all of the props that a certain component takes and allows for easy default
					values if a prop is not passed in.
				</p>

				<CodeBlock>
					{`
					export default function App() {
						return (
							<div>
								<Normal name="Jack" />
								<Destructure name="Jill" />
							</div>
						);
					}
					
					function Normal(props) {
						return (
							<div style={{ color: props.color ?? "red" }}>Hello {props.name}</div>
						);
					}
					
					function Destructure({ name, color = "blue" }) {
						return <div style={{ color }}>Hello {name}</div>;
					}
					`}
				</CodeBlock>
			</section>

			<section className="space-y-4">
				<Heading level={2}>React Props with TypeScript</Heading>

				<p>
					You can fully type your React component using TypeScript and get live feedback in your
					editor for any missing or incorrect props. There are two ways to do this: inline the prop
					types in the component declaration or have a separate interface and use that instead.
					Separate interfaces are especially useful if you need to export the types to share with
					another component.
				</p>

				<CodeBlock>
					{`
					export default function App() {
						return (
							<div>
								<NormalInline name="Jack" />
								<DestructureInline name="Jill" />
					
								<NormalSeparate name="Jack" />
								<DestructureSeparate name="Jill" />
							</div>
						);
					}
					
					/* Inlining props */
					function NormalInline(props: { name: string; color?: "red" | "blue" }) {
						return (
							<div style={{ color: props.color ?? "red" }}>Hello {props.name}</div>
						);
					}
					
					function DestructureInline({
						name,
						color = "blue"
					}: {
						name: string;
						color?: "red" | "blue";
					}) {
						return <div style={{ color }}>Hello {name}</div>;
					}
					
					/* Prop types separate */
					interface NormalSeparateProps {
						name: string;
						color?: "red" | "blue";
					}
					
					function NormalSeparate(props: NormalSeparateProps) {
						return (
							<div style={{ color: props.color ?? "red" }}>Hello {props.name}</div>
						);
					}
					
					function DestructureSeparate({ name, color = "blue" }: NormalSeparateProps) {
						return <div style={{ color }}>Hello {name}</div>;
					}
					`}
				</CodeBlock>

				<p>
					VSCode has TypeScript support built in and you'll see errors in your editor if some prop
					is missing or the incorrect type.
				</p>
				<img src={tsExample} className="block" />
			</section>

			<section className="space-y-4">
				<Heading level={2}>Spreading Props</Heading>
				<p>
					Sometimes you might want to grab certain props but forward the rest to a component. You
					can use JavaScript's rest and spread operators to accomplish this.
				</p>

				<CodeBlockViewer>
					{`
					interface ButtonProps {
						children: React.ReactNode;
						disabled?: boolean;
					}
					
					function Button({ children, disabled }: ButtonProps) {
						return <button disabled={disabled}>{children}</button>;
					}
					
					function HideableButton({
						isHidden,
						...rest
					}: ButtonProps & { isHidden: boolean }) {
						if (isHidden) {
							return null;
						}
					
						return <Button {...rest} />;
					}`}
				</CodeBlockViewer>
			</section>

			<section className="space-y-4">
				<Heading level={2}>Special Props</Heading>
				<p>There are a few special props in React that you should be aware of.</p>

				<List>
					<ListItem>
						<code>
							<ExternalLink href="https://reactjs.org/docs/lists-and-keys.html#gatsby-focus-wrapper">
								key
							</ExternalLink>
						</code>{' '}
						- mainly used for iterating over lists. This will be undefined in the component you pass
						it to. More on that later.
					</ListItem>
					<ListItem>
						<code>
							<ExternalLink href="https://reactjs.org/docs/forwarding-refs.html">ref</ExternalLink>
						</code>{' '}
						- generally used to get a DOM reference to the main element in a component
					</ListItem>
					<ListItem>
						<code>
							<ExternalLink href="https://reactjs.org/docs/jsx-in-depth.html#children-in-jsx">
								children
							</ExternalLink>
						</code>{' '}
						- the DOM that is inbetween the opening and closing component tags
						<CodeBlockViewer>
							{`
							function ComponentWithChildren({children}) {
								return (
									<div className="some-wrapper-class">
										{children}
									</div>
								);
							})
							
							function App() {
								return (
									<ComponentWithChildren>
										Hello
									</ComponentWithChildren>
								);
							}
							`}
						</CodeBlockViewer>
					</ListItem>
				</List>
			</section>
		</div>
	);
}
