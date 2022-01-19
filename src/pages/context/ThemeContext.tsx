import CodeBlock, { CodeBlockViewer } from '../../components/CodeBlock';
import Heading from '../../components/Heading';

export default function ThemeContext() {
	return (
		<div className="space-y-8">
			<Heading level={1}>Context</Heading>

			<section className="space-y-4">
				<p>
					One of the other concepts that you might come across with React is the notion of React
					context. Before explaining what it is, let's look at a problem you might have in React
					first.
				</p>

				<p>
					Imagine you have an app-level variable that you want to be able to share across the entire
					component tree. Until now, we've only talked about props and state. For this example,
					we'll have a "theme" variable that is simply a color (but this could be any variable type,
					including a deeply nested theme object that has colors for primary, secondary, etc).
				</p>

				<CodeBlock
					files={{
						'/App.tsx': `
						import { useState } from "react";

						import { GreatGrandparent } from "./Parents";

						export default function App() {
							const [theme, setTheme] = useState("#0000FF");

							return (
								<div>
									<label>
										Choose your color
										<input
											type="color"
											value={theme}
											onChange={(e) => setTheme(e.target.value)}
										/>
									</label>
									<GreatGrandparent theme={theme} />
								</div>
							);
						}

					`,
						'/Parents.tsx': `
						export function GreatGrandparent({ theme }) {
							return <GrandParent theme={theme} />;
						}
						
						export function GrandParent({ theme }) {
							return <Parent theme={theme} />;
						}
						
						export function Parent({ theme }) {
							return <Child theme={theme} />;
						}
						
						export function Child({ theme }) {
							return (
								<div style={{ backgroundColor: theme, color: "white" }}>
									The theme color is {theme}
								</div>
							);
						}
					`,
					}}
				>
					Does not matter
				</CodeBlock>

				<p>
					You'll notice that to get the theme to the Child component, you have to pass it down to
					all of the components above it. Those components don't use the theme, they simply pass it
					down to their children. This is known as "prop drilling" in React, and there's a better
					way to handle this.
				</p>

				<p>
					React has a notion of "context" - it is a way to house some type of data and have it
					retrievable <em>anywhere in the Provider's tree.</em> Typically, it houses global state by
					wrapping a <code>Provider</code> around some of your app's components. You can, however,
					have multiple <code>Providers</code> which all have their own value. We'll just look at a
					single Provider.
				</p>

				<CodeBlock
					customSetup={{
						main: '/ThemeContext.ts',
					}}
					files={{
						'/ThemeContext.ts': `
							import React from "react";

							const ThemeContext = React.createContext("#0000FF");
							
							export default ThemeContext;
						`,
						'/App.tsx': `
							import { useState } from "react";
							import ThemeContext from "./ThemeContext";
							import { GreatGrandparent } from "./Parents";

							export default function App() {
								const [theme, setTheme] = useState("#0000FF");

								return (
									<ThemeContext.Provider value={theme}>
										<label>
											Choose your color
											<input
												type="color"
												value={theme}
												onChange={(e) => setTheme(e.target.value)}
											/>
										</label>

										<GreatGrandparent />
									</ThemeContext.Provider>
								);
							}
					`,
						'/Parents.tsx': `
							import { useContext } from "react";
							import ThemeContext from "./ThemeContext";

							export function GreatGrandparent() {
								return <GrandParent />;
							}

							export function GrandParent() {
								return <Parent />;
							}

							export function Parent() {
								return <Child />;
							}

							export function Child() {
								const theme = useContext(ThemeContext);

								return (
									<div style={{ backgroundColor: theme, color: "white" }}>
										The theme color is {theme}
									</div>
								);
							}
					`,
					}}
				>
					Does not matter
				</CodeBlock>

				<p>
					The <code>ThemeContext.ts</code> file creates a context and sets an initial value. The{' '}
					<code>App.tsx</code> file then pulls that context in, which has a <code>.Provider</code>{' '}
					and <code>.Consumer</code> properties, but only uses the <code>Provider</code>. It then
					sets the value property on the <code>Provider</code> to the current color. Note that we no
					longer pass <code>theme</code> to the <code>GreatGrandparent</code> component.
				</p>

				<p>
					The <code>Parents.tsx</code> file is then updated to pull in the same context from{' '}
					<code>ThemeContext.ts</code>. There is no more prop-drilling from GreatGrandParent -&gt;
					GrandParent -&gt; Parent -&gt; Child, instead the Child component can access the value
					directly. Simply pull in the <code>useContext</code> hook from React and pass the Context
					to it.
				</p>

				<p>
					<strong>Note:</strong> a lot of the time it's handy to create a custom hook for context
					values as well. This helps in abstracting <em>how</em> the value is gathered and allows
					for easily adding to or changing things on the context.
				</p>

				<CodeBlockViewer
					customSetup={{
						main: '/hooks/useTheme.ts',
					}}
					files={{
						'/hooks/useTheme.ts': `
							import { useContext } from "react";
							import ThemeContext from "../ThemeContext";

							export default function useTheme() {
								return useContext(ThemeContext);
							}
						`,
						'/Parents.tsx': `
							import useTheme from "./hooks/useTheme";

							export function Child() {
								const theme = useTheme();

								return (
									<div style={{ backgroundColor: theme, color: "white" }}>
										The theme color is {theme}
									</div>
								);
							}
					`,
					}}
				>
					Does not matter
				</CodeBlockViewer>
			</section>
		</div>
	);
}
