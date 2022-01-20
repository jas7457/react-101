import CodeBlock from '../../components/CodeBlock';
import Heading from '../../components/Heading';

export default function UseState() {
	return (
		<div className="space-y-8">
			<Heading level={1}>State in React</Heading>

			<section className="space-y-4">
				<p>
					We've talked about props in React, the next thing to talk about is state. This is how a
					component can change over its lifecycle. There are two main ways for local state in React:{' '}
					<code>useState</code> which we will talk about here and <code>useReducer</code> which is a
					bit more complex and, I've found, mainly unneeded. For this repo, we'll only focus on{' '}
					<code>useState</code>.
				</p>
			</section>

			<section className="space-y-4">
				<Heading level={2}>Simple Case</Heading>

				<p>
					React provides a "useState" hook that allows you to, well, use state. Think of this as
					analogous to the <code>@tracked</code> decorator in Ember. There are a few rules of hooks
					and syntax that are important to learn for the useState hook. Let's start with a simple
					example.
				</p>

				<CodeBlock>
					{`
					import { useState } from "react";

					export default function App() {
						const [count, setCount] = useState(0);
					
						return (
							<div>
								<div>Clicks: {count}</div>
					
								<button onClick={() => setCount(count + 1)}>Click me!</button>
							</div>
						);
					}`}
				</CodeBlock>

				<p>
					You pass an initial value to the useState function and useState will return a tuple. The
					tuple is just an array with the [0]th element being the state and the [1]st being a state
					updater function. This is the same as doing{' '}
					<code>const val = useState(0); const count = val[0]; const setCount = val[1];</code>
				</p>

				<p>
					State updates in React are asynchronous. That means that after calling a state setter
					function, the local state variable is the "old" value. It will be updated on the next
					render of this function, but not available immediately. For example, let's add a few logs
					to the previous example.
				</p>

				<CodeBlock>
					{`
					import { useState } from "react";

					export default function App() {
						const [count, setCount] = useState(0);
					
						return (
							<div>
								<div>Clicks: {count}</div>
					
								<button
									onClick={() => {
										console.log("before", count);
										setCount(count + 1);
										console.log("after", count);
									}}
								>
									Click me!
								</button>
							</div>
						);
					}`}
				</CodeBlock>

				<p>
					Additionally, updating the state will also rerender that function component completely.
					This is how React's declarative nature works, especially in function components vs class
					components. Let's update the previous example to see this in action.
				</p>

				<CodeBlock>
					{`
					import { useState } from "react";

					export default function App() {
						const [count, setCount] = useState(0);
					
						console.log('Rendering...');
					
						return (
							<div>
								<div>Clicks: {count}</div>
					
								<button onClick={() => setCount(count + 1)}>Click me!</button>
							</div>
						);
					}
					
					`}
				</CodeBlock>
			</section>

			<section className="space-y-4">
				<Heading level={2}>Lazy Initial State</Heading>

				<p>
					React has a notion of a "lazy initial state". Instead of passing a simple string, boolean,
					number, etc, you can provide a function to the useState call. This function will only be
					ran once for that component and should return the initial state value. Generally, you'd
					want to use this if the initialization logic is expensive to compute or requires some
					logic to figure out what the initial state should be. Additionally, as noted above, React
					will rerender the component in its entirety on any state update. This can help for
					performance reasons as well.
				</p>

				<CodeBlock>
					{`
					import { useState } from "react";

					export default function App() {
						const [count, setCount] = useState(() => {
							console.log("Figuring out initial state..."); // will only be ran on initial render
					
							let count = 0;
							for (let i = 0; i < 10000; i++) {
								count += i;
							}
					
							return count;
						});
					
						return (
							<div>
								<div>Clicks: {count}</div>
					
								<button onClick={() => setCount(count + 1)}>Click me!</button>
							</div>
						);
					}
					`}
				</CodeBlock>
			</section>

			<section className="space-y-4">
				<Heading level={2}>Functional State Updates</Heading>

				<p>
					In our previous examples we've been updating count based on the previous count variable (
					<code>setCount(count + 1)</code>). Although this will <em>mainly</em> work, there is a
					caveat to doing things this way. As previously mentioned, React state updates are
					asynchronous. If the user happened to click the button two times before React had a chance
					to rerender (improbable, but possible), the count variable will only increment by one.
				</p>

				<p>
					Imagine <code>count</code> is 3, and if in the same render the button is clicked, you're
					effectively just doing <code>setCount(3 + 1);</code> twice. I've never seen this manifest
					as actual bug in the wild, but React provides another way to call the state setter
					function. Instead of passing a value, you can pass in a callback function that receives
					the "previous" value for the state as its argument and you can use that. Generally
					speaking, this is the preferred method if your new value depends on the previous value.
				</p>

				<CodeBlock>
					{`
					import { useState } from "react";

					export default function App() {
						const [count, setCount] = useState(0);
					
						return (
							<div>
								<div>Clicks: {count}</div>
					
								<button onClick={() => {
									setCount(function (prevCount) {
										return prevCount + 1;
									});
								}}>
									Click me!
								</button>
							</div>
						);
					}
					`}
				</CodeBlock>
			</section>

			<section className="space-y-4">
				<Heading level={2}>Forms & Multiple State Values</Heading>

				<p>
					React does not do any type of auto-binding of form values and state updates are
					uni-directional. There are two ways to handle inputs in React: controlled and uncontrolled
					components. We will focus on controlled inputs, and I recommend that that's the only way
					one should do form inputs.
				</p>

				<p>
					A controlled input means it is entirely controlled by React's internal state. You need to
					provide both the value to the <code>input</code> and an <code>onChange</code> callback to
					update the state. This is preferred because it allows you to easily keep the state of the
					input in sync with React, and additionally update it from anywhere else in your code.
				</p>

				<CodeBlock>
					{`
					import { useState } from "react";

					export default function App() {
						const [name, setName] = useState("");
						const [age, setAge] = useState(40);
					
						return (
							<div>
								<form onSubmit={(e) => e.preventDefault()}>
									<label>
										Name:
										<input
											value={name}
											onChange={(e) => {
												setName(e.target.value);
											}}
										/>
									</label>
					
									<label>
										Age:
										<input
											type="number"
											value={age}
											onChange={(e) => {
												setAge(parseInt(e.target.value, 10));
											}}
										/>
									</label>
								</form>
					
								<div>
									Your name is "{name}" and you are {age} years old
								</div>
							</div>
						);
					}
					
					`}
				</CodeBlock>
			</section>
		</div>
	);
}
