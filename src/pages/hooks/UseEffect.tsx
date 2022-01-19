import CodeBlock, { CodeBlockViewer } from '../../components/CodeBlock';
import Heading from '../../components/Heading';
import List, { ListItem } from '../../components/List';

export default function UseEffect() {
	return (
		<div className="space-y-8">
			<Heading level={1}>Effects in React</Heading>

			<section className="space-y-4">
				<p>
					This is by far the most confusing hook and will take the longest to master, but arguably
					one of the most powerful. Since components rerender often and frequently and there's
					really no notion of "onMount" / "onDestroy", effects are a good way to escape from React's
					purely functional and declarative world into the imperative world.
				</p>
			</section>

			<section className="space-y-4">
				<Heading level={2}>Dependency arrays</Heading>

				<p>
					There are a lot of concepts to learn in a very concise API for <code>useEffect</code>. The
					simplest, albeit useless, example is to console.log the count1 variable.
				</p>

				<CodeBlock>
					{`
					import { useEffect, useState } from "react";

					export default function App() {
						const [count1, setCount1] = useState(0);
						const [count2, setCount2] = useState(0);
					
						useEffect(() => {
							console.log("count1: " + count1);
						});
					
						return (
							<div>
								<div>
									<div>count1: {count1}</div>
									<button onClick={() => setCount1(count1 + 1)}>
										Update count1
									</button>
								</div>
					
								<div>
									<div>count2: {count2}</div>
									<button onClick={() => setCount2(count2 + 1)}>
										Update count2
									</button>
								</div>
							</div>
						);
					}
					`}
				</CodeBlock>

				<p>
					You might notice that the log <em>always</em> happens. What if we only want that code to
					run when <code>count1</code> changes? That's what the second parameter to{' '}
					<code>useEffect</code> is - a <em>dependency array</em>. React uses this array to know if
					it should rerun the effect. It will always run it the first time, but on subsequent
					rerender it will only run the effect if the new values are different from the previous
					values. We can update our code accordingly.
				</p>

				<CodeBlock>
					{`
					import { useEffect, useState } from "react";

					export default function App() {
						const [count1, setCount1] = useState(0);
						const [count2, setCount2] = useState(0);
					
						useEffect(() => {
							console.log("count1: " + count1);
						}, [count1]);
					
						return (
							<div>
								<div>
									<div>count1: {count1}</div>
									<button onClick={() => setCount1(count1 + 1)}>
										Update count1
									</button>
								</div>
					
								<div>
									<div>count2: {count2}</div>
									<button onClick={() => setCount2(count2 + 1)}>
										Update count2
									</button>
								</div>
							</div>
						);
					}
					
					`}
				</CodeBlock>
			</section>

			<section className="space-y-4">
				<Heading level={2}>Cleanup functions</Heading>

				<p>
					The other part of the <code>useEffect</code> API that is worth noting is the "cleanup
					function". Let's imagine there is a pub/sub API in your app that you need to create
					subscriptions, but ensure that you remove the subscription when this component is
					unmounted. To accomplisht this, you can return a function from your effect that will React
					will run.
				</p>

				<CodeBlockViewer>
					{`
					import { useEffect } from "react";

					export default function App() {
						useEffect(() => {
							const subscription = PubSub.subscribe();
					
							return function cleanup() { // or simply return () => {...};
								subscription.unsubscribe();
							};
						}, []);
					}
					`}
				</CodeBlockViewer>

				<p>
					You'll notice that I passed an empty array as the dependency array. This signifies that
					the effect should <code>not</code> run on every render (which would happen if no dep array
					was passed), but also has no dependencies. This effectively means its equivalent to an
					"onMount" lifecycle event, although React tries not to have you think in terms of
					lifecycle.
				</p>

				<p>
					I've returned a "cleanup" function. This will not be ran automatically, but at the
					approriate time. In this case, since the effect is only ran once, the cleanup will only
					happen when this component unmounts.
				</p>

				<p>
					Now imagine that the pub/sub requires a user id to set up the subscription. Also, maybe
					that user id can change over time. This is where the full API of <code>useEffect</code>{' '}
					can really shine.
				</p>

				<CodeBlockViewer>
					{`
					import { useState, useEffect } from "react";

					export default function App() {
						const [userId, setUserId] = useState('1234');
						
						useEffect(() => {
							const subscription = PubSub.subscribe(userId);
							return () => subscription.unsubscribe();
						}, [userId]);
					}
					`}
				</CodeBlockViewer>

				<p>There's a lot to unpack here. Let's go through it step-by-step:</p>
				<List type="ordered">
					<ListItem>
						We are using an effect to subscribe specifically for <em>userId</em>
					</ListItem>
					<ListItem>We are returning a cleanup function which will unsubscribe</ListItem>
					<ListItem>
						We are putting the <code>userId</code> into the dependency array. This has two effects:
						<List>
							<ListItem>
								The callback passed to useEffect will run on mount and again any type the{' '}
								<code>userId</code> changes.
							</ListItem>
							<ListItem>
								The cleanup function returned from the useEffect callback will run any time{' '}
								<code>userId</code> changes and <em>additionally</em> when the component unmounts.
							</ListItem>
						</List>
					</ListItem>
				</List>
			</section>

			<section className="space-y-4">
				<Heading level={2}>Data fetching</Heading>

				<p>
					The typical way to fetch data for a component is to use the <code>useEffect</code> hook
					combined with the <code>useState</code> hook. It is very important to use the dependency
					array correctly here. If there are no dependencies, you'd typically want to use an empty
					array so it is only ran once.
				</p>

				<CodeBlock>
					{`
					import { useState, useEffect } from "react";

					export default function App() {
						const [pokemon, setPokemon] = useState([]);
					
						useEffect(() => {
							async function fetchPokemon() {
								const poke = await fetch(
									"https://pokeapi.co/api/v2/pokemon?limit=10"
								).then((resp) => resp.json());
								
								setPokemon(poke.results);
							}
							fetchPokemon();
						}, []);
					
						return (
							<div>
								<h1>Pokemon</h1>
								<ul>
									{pokemon.map((p) => (
										<li key={p.url}>{p.name}</li>
									))}
								</ul>
							</div>
						);
					}
					
					`}
				</CodeBlock>
			</section>
		</div>
	);
}
