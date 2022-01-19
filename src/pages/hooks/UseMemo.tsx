import CodeBlock from '../../components/CodeBlock';
import Heading from '../../components/Heading';

export default function UseMemo() {
	return (
		<div className="space-y-8">
			<Heading level={1}>React Memoization</Heading>

			<section className="space-y-4">
				<p>
					The <code>useMemo</code> hook is a good way to memoize values so they are not recomputed
					on every render. You pass it a function which will return a value and it takes a second
					argument of the dependency array, similar to the <code>useEffect</code> hook. This is
					typically done if the computation of the value is expensive and doesn't need to be ran on
					each render.
				</p>

				<CodeBlock>
					{`
					import { useState, useMemo } from "react";

					export default function App() {
						const [num, setNum] = useState(2);
					
						const fibNum = useMemo(() => {
							function fibonacci(n) {
								if (n <= 1) {
									return 1;
								}
					
								return fibonacci(n - 1) + fibonacci(n - 2);
							}
					
							return fibonacci(num);
						}, [num]);
					
						return (
							<div>
								<div>
									Fib num for {num}: {fibNum}
								</div>
					
								<input
									type="number"
									value={num}
									onChange={(e) => setNum(parseInt(e.target.value, 10))}
								/>
							</div>
						);
					}
					`}
				</CodeBlock>

				<p>
					This will return the fibonacci number based on the number passed in. We supply a
					dependency array so that it is only ran when the state value for <code>num</code> changes.
				</p>

				<p>
					Another good use case for <code>useMemo</code> is to calculate derived state. Derived
					state is some variable that gets its value based on other state/props.
				</p>

				<CodeBlock>
					{`
					import { useState, useMemo } from "react";

					export default function App() {
						const [firstName, setFirstName] = useState("Jason");
						const [lastName, setLastName] = useState("Brubaker");
					
						const fullName = useMemo(() => {
							return firstName + " " + lastName;
						}, [firstName, lastName]);
					
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
					
								<div>Full name: {fullName}</div>
							</div>
						);
					}
					`}
				</CodeBlock>
			</section>
		</div>
	);
}
