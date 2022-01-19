import { CodeBlockViewer } from '../../components/CodeBlock';
import ExternalLink from '../../components/ExternalLink';
import Heading from '../../components/Heading';
import List, { ListItem } from '../../components/List';

export default function HooksIntro() {
	return (
		<div className="space-y-8">
			<Heading level={1}>Introduction to Hooks</Heading>

			<section className="space-y-4">
				<p>
					Hooks were added to React in 2018 to help get function components more in line with the
					feature set of class components. Up until that point, function components were often
					called "stateless function components" as they couldn't have their own state or lifecycle
					methods. If you needed either, you had to use a class component.
				</p>

				<p>
					Introducing hooks: a way for function components to have their own state and to reuse
					stateful logic between components. It also helps colocate related code into a single,
					condensed function. I think the{' '}
					<ExternalLink href="https://reactjs.org/docs/hooks-intro.html">React docs</ExternalLink>{' '}
					does a good job describing the types of problems that hooks solve:
				</p>

				<blockquote className="ml-4 p-4 bg-blue-200">
					<q>
						For example, components might perform some data fetching in{' '}
						<code>componentDidMount</code> and <code>componentDidUpdate</code>. However, the same{' '}
						<code>componentDidMount</code> method might also contain some unrelated logic that sets
						up event listeners, with cleanup performed in <code>componentWillUnmount</code>.
						Mutually related code that changes together gets split apart, but completely unrelated
						code ends up combined in a single method. This makes it too easy to introduce bugs and
						inconsistencies.
					</q>
				</blockquote>

				<p>
					Hooks make reading, understanding, and sharing related functionality much easier. Before,
					components were the most atomic structure in React, but hooks allows for a new layer of
					atomicity. They encourage you to not think in terms of component "life cycle", but instead
					in terms of a single render of a component and what that single render needs.
				</p>

				<p>
					The 2018 React conf goes more into details about the motivation behind hooks. I'd
					recommend, at the very least, watching Ryan Florence's talk (starts at the 1 hour mark) to
					really see practical cases of how hooks solve imperative code and open the door to more
					succinct and declarative code.
				</p>

				<div>
					<iframe
						src="https://www.youtube.com/embed/dpw9EHDh2bM"
						title="YouTube video player"
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
						style={{ aspectRatio: '16/9', width: '100%', maxWidth: '640px', margin: '0 auto' }}
					></iframe>
				</div>
			</section>

			<section className="space-y-4">
				<Heading level={2}>Rules of hooks</Heading>
				<p>There are a few rules of hooks that need to be followed.</p>

				<List className="space-y-2">
					<ListItem>
						<b>Only call hooks inside of function components or other hooks</b>
						<p>
							You cannot call hooks inside of class components. Additionally, you cannot call hooks
							inside of normal JavaScript functions that aren't hooks themselves.
						</p>
					</ListItem>

					<ListItem>
						<b>You (likely) don't know better than the eslint plugin</b>
						<p>
							There is an{' '}
							<ExternalLink href="https://www.npmjs.com/package/eslint-plugin-react-hooks">
								eslint plugin
							</ExternalLink>{' '}
							that helps enforce the rules of hooks. I highly recommend adding this, and if it is
							complaining about something you're doing, it's (probably) right.
						</p>
					</ListItem>

					<ListItem>
						<b>Don't conditionally call hooks</b>
						<p>
							The order in which hooks are called is how hooks work under the hood. Because of that,
							you cannot call 2 hooks in one render and 1 in the next. Never put calling hooks
							behind some type of condition.
						</p>

						<CodeBlockViewer>
							{`
								function Bad({ showCount }) {
									if(!showCount) {
										return null;
									}

									const [count, setCount] = useState(0);
									return <p>{count}</p>;
								}

								function Good({ showCount }) {
									const [count, setCount] = useState(0);
									return showCount ? <p>{count}</p> : null;
								}
							`}
						</CodeBlockViewer>
					</ListItem>

					<ListItem>
						<b>Don't call hooks in a loop</b>
						<p>
							This is very similar to the point above. Calling hooks in a loop is effectively
							conditionally calling hooks conditionally because the loop size can change. The same
							reason applies as above.
						</p>

						<CodeBlockViewer>
							{`
								function Bad({ items }) {
									return (
										<div>
											{items.map((item) => {
												const [clicks, setClicks] = useState(0);
												return (
													<button key={item.id} onClick={() => setClicks(clicks + 1)}>
														{item.name}, clicks: {clicks}
													</button>
												);
											})}
										</div>
									);
								}
								
								function Good({ items }) {
									return (
										<div>
											{items.map((item) => (
												<Item key={item.id} item={item} />
											))}
										</div>
									);
								}
								
								function Item({ item }) {
									const [clicks, setClicks] = useState(0);
									return (
										<button onClick={() => setClicks(clicks + 1)}>
											{item.name}, clicks: {clicks}
										</button>
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
