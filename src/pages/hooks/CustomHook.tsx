import CodeBlock from '../../components/CodeBlock';
import ExternalLink from '../../components/ExternalLink';
import Heading from '../../components/Heading';

export default function CustomHook() {
	return (
		<div className="space-y-8">
			<Heading level={1}>Custom Hooks</Heading>

			<section className="space-y-4">
				<p>
					Until this point we've been looking at React's built-in hooks. There are more hooks than
					what we've covered and you can read more about them{' '}
					<ExternalLink href="https://reactjs.org/docs/hooks-intro.html">
						on React's documentation
					</ExternalLink>
					, but the ones we covered will get you most of the way there. There's also the notion of
					custom hooks that are sharable between components.
				</p>

				<p>
					Let's say you have a component that wants to use localStorage to load and save a piece of
					data. This will require both state and an effect to accomplish. Let's write this in a
					component.
				</p>

				<CodeBlock>
					{`
					import { useState, useEffect } from "react";

					const STORAGE_KEY = "user-first-name";
					
					export default function App() {
						const [firstName, setFirstName] = useState(
							localStorage.getItem(STORAGE_KEY) ?? "Walter"
						);
					
						useEffect(() => {
							localStorage.setItem(STORAGE_KEY, firstName);
						}, [firstName]);
					
						return (
							<div>
								<div>
									<label>
										First Name:
										<input
											value={firstName}
											onChange={(e) => setFirstName(e.target.value)}
										/>
									</label>
								</div>

								Name: {firstName}
							</div>
						);
					}
					`}
				</CodeBlock>

				<p>
					This code will save the item to localStorage any time the <code>firstName</code> changes.
					Now let's imagine that you later want to start storing the last name in localStorage as
					well. You could duplicate this logic, or pull it into its own custom hook.
				</p>

				<CodeBlock>
					{`
					import { useState, useEffect } from "react";

					function useLocalStorage(key, initialValue) {
						const [state, setState] = useState(
							localStorage.getItem(key) ?? initialValue
						);
					
						useEffect(() => {
							localStorage.setItem(key, state);
						}, [key, state]);
					
						return [state, setState];
					}
					
					export default function App() {
						const [firstName, setFirstName] = useLocalStorage(
							"user-first-name-2",
							"Walter"
						);
					
						const [lastName, setLastName] = useLocalStorage(
							"user-last-name-2",
							"White"
						);
					
						return (
							<div>
								<div>
									<label>
										First Name:
										<input
											value={firstName}
											onChange={(e) => setFirstName(e.target.value)}
										/>
									</label>
								</div>
					
								<div>
									<label>
										Last Name:
										<input
											value={lastName}
											onChange={(e) => setLastName(e.target.value)}
										/>
									</label>
								</div>
								
								Name: {firstName} {lastName}
							</div>
						);
					}
					`}
				</CodeBlock>
			</section>
		</div>
	);
}
