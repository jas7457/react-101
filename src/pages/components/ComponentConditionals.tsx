import CodeBlock from '../../components/CodeBlock';
import Heading from '../../components/Heading';
import ExternalLink from '../../components/ExternalLink';

export default function ComponentConditionals() {
	return (
		<div className="space-y-8">
			<Heading level={1}>Components - Conditionals & Loops</Heading>

			<section className="space-y-4">
				<p>
					Learning React forces you to learn JavaScript a bit better as well. React does not have
					its own <code>if/else</code> statements or special syntax to loop over arrays. Instead, it
					greatly relies on{' '}
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
						// change me to true!
						const shouldShow = false;
					
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

			<section className="space-y-4">
				<Heading level={2}>Loops</Heading>

				<p>
					Again, there is no special syntax for template looping in JSX/React. Instead, you rely on{' '}
					<code>Array.prototype.map</code> to loop over elements and print them out. This also
					allows easy inline filtering of elements.
				</p>

				<CodeBlock>
					{`
					export default function App() {
						const people = [
							{ id: 1, name: "Eleanor Shellstrop", good: true },
							{ id: 2, name: "Chidi Anagonye", good: true },
							{ id: 3, name: "Vicky", good: false },
							{ id: 4, name: "Shawn", good: false }
						];
					
						return (
							<div>
								<h1>Good People</h1>
					
								{people
									.filter((person) => person.good === true)
									.map((person) => {
										return <div key={person.id}>{person.name}</div>;
									})}
					
									{/* Or use implicit return if there isn't much logic to your inner map callback
									{people
										.filter((person) => person.good === true)
										.map((person) => <div key={person.id}>{person.name}</div>)
									}
									*/}
							</div>
						);
					}
					`}
				</CodeBlock>

				<p>
					You might notice that I used a <code>key</code> on each item in the map. The one caveat of
					iterating over lists in React is you should supply a <b>unique</b> key to each child. This
					key only has to be unique amongst its siblings, it does <b>not</b> have to be globally
					unique. This helps with performance and lets React know if things were
					added/removed/altered. Generally speaking, you should try to use a unique id or other
					property that is unique for that item set. If no such value is available, you can use the
					array index as a last resort, but if that index can change for an item (such as sorting,
					filtering, etc), you can have a negative performance impact. React more about keys{' '}
					<ExternalLink href="https://reactjs.org/docs/lists-and-keys.html#keys">here</ExternalLink>
					.
				</p>

				<p>
					Since you can put any JSX into a variable, the same is true for mapped lists. Although
					this isn't as common and I'd recommend putting it directly in the return value, it's worth
					pointing out.
				</p>

				<CodeBlock>
					{`
					export default function App() {
						const people = [
							{ id: 1, name: "Eleanor Shellstrop", good: true },
							{ id: 2, name: "Chidi Anagonye", good: true },
							{ id: 3, name: "Vicky", good: false },
							{ id: 4, name: "Shawn", good: false }
						];
					
						const goodPeople = people
							.filter((person) => person.good === true)
							.map((person) => <div key={person.id}>{person.name}</div>);
					
						return (
							<div>
								<h1>Good People</h1>
					
								{goodPeople}
							</div>
						);
					}
					
					`}
				</CodeBlock>
			</section>
		</div>
	);
}
