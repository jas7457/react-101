import CodeBlock, { CodeBlockViewer } from '../../components/CodeBlock';
import Heading from '../../components/Heading';
import ExternalLink from './ExternalLink';

export default function ComponentConditionals() {
	return (
		<div className="space-y-8">
			<Heading level={1}>Components - Conditionals</Heading>

			<section className="space-y-4">
				<p>
					Learning React forces you to learn JavaScript a bit better as well. React does not have
					its own <code>if/else if/else</code> statements or special syntax to loop over arrays.
					Instead, it greatly relies on{' '}
					<ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#expressions">
						JavaScript expressions
					</ExternalLink>{' '}
					to do conditional logic.
				</p>
			</section>

			<section className="space-y-4">
				<Heading level={2}>If Statements</Heading>

				<p>
					Again, React/JSX does not have its own "if statements". Instead it relies on the fact
					that, in JavaScript, <code>true && "something"</code> is an expression that evaluates to{' '}
					<code>"something"</code> whereas <code>false && "something"</code> evaluates to{' '}
					<code>false</code>. If you recall, React will not render booleans, and this is how if
					statements are handled in JSX.
				</p>

				<CodeBlock>
					{`
					export default function App() {
						const shouldShow = true;
					
						return (
							<div>
								<div>{shouldShow && "Hello"}</div>
								<div>{shouldShow && <SomeComponent />}</div>
							</div>
						);
					}
					
					function SomeComponent() {
						return <div>Rendering SomeComponent</div>;
					}
					`}
				</CodeBlock>
			</section>

			<section className="space-y-4">
				<Heading level={2}>If/Else Statements</Heading>

				<p>To achieve an if/else statement in JSX, you need to use a ternary operator.</p>

				<CodeBlock>
					{`
					export default function App() {
						const isEnabled = true;
					
						return (
							<div>
								{isEnabled ? "This component is enabled." : "This component is disabled."}
							</div>
						);
					}
					`}
				</CodeBlock>

				<p>
					Since all JSX is actually JavaScript under the hood, you can put any React Element into a
					JavaScript variable. This could be as simple as a string, an inline JSX statement, or
					rendering another component. This is similar to the <code>let</code> helper in Ember, but
					just handled in normal JavaScript.
				</p>

				<CodeBlock>
					{`
					export default function App() {
						const flip = false;
					
						const top = "Top";
						const middle = <div>I am the middle</div>;  
						const bottom = <Bottom />;
					
						return (
							<div>
								{flip ? (
									<div>
										{bottom}
										{middle}
										{top}
									</div>
								) : (
									<div>
										{top}
										{middle}
										{bottom}
									</div>
								)}
							</div>
						);
					}
					
					function Bottom() {
						return <div>I am the bottom!</div>;
					}`}
				</CodeBlock>
			</section>

			<section className="space-y-4">
				<Heading level={2}>If/Else If/Else Statements</Heading>

				<p>
					Similar to the if/else, you typically either use ternaries to accomplish this, or use
					early returns, depending on the case.
				</p>

				<CodeBlock>
					{`
					export default function App() {
						return (
							<div>
								<Ternaries />
						  		<EarlyReturns />
							</div>
						);
					}
					
					function Ternaries() {
						const state = "loading";
					
						return (
							<div>
								{state === "loading" ? (
									<div>Loading!</div>
								) : state === "error" ? (
									<div>Error!</div>
								) : (
									<div>Finished loading data.</div>
								)}
							</div>
						);
					}
					
					function EarlyReturns() {
						const state = "loading";
					
						if (state === "loading") {
							return <div>Loading!</div>;
						}
					
						if (state === "error") {
							return <div>Error!</div>;
						}
					
						return <div>Finished loading data.</div>;
					}
					
					`}
				</CodeBlock>
			</section>
		</div>
	);
}
