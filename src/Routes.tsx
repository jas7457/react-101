import clsx from 'clsx';
import React, { Suspense, useEffect, useMemo, useState } from 'react';
import {
	Link,
	Navigate,
	Route,
	RouteProps,
	Routes as DOMRoutes,
	useLocation,
} from 'react-router-dom';
import { headingTranslation } from './components/Heading';
import PageContext from './contexts/PageContext';

const Introduction = React.lazy(() => import('./pages/Introduction'));
const ComponentsIntro = React.lazy(() => import('./pages/components/ComponentsIntro'));
const ComponentProps = React.lazy(() => import('./pages/components/ComponentProps'));
const ComponentConditionals = React.lazy(() => import('./pages/components/ComponentConditionals'));
const HooksIntro = React.lazy(() => import('./pages/hooks/HooksIntro'));
const UseState = React.lazy(() => import('./pages/hooks/UseState'));
const UseEffect = React.lazy(() => import('./pages/hooks/UseEffect'));
const UseMemo = React.lazy(() => import('./pages/hooks/UseMemo'));
const CustomHook = React.lazy(() => import('./pages/hooks/CustomHook'));
const ThemeContext = React.lazy(() => import('./pages/context/ThemeContext'));
const EmberToReact = React.lazy(() => import('./pages/EmberToReact'));
const References = React.lazy(() => import('./pages/References'));

export default function Routes() {
	const routes = useMemo(() => {
		return ROUTES.flatMap((route) => ('children' in route ? route.children : route));
	}, [ROUTES]);

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<DOMRoutes>
				{/* Navigate the user from / to /intro */}
				<Route path="/" element={<Navigate to="/intro" replace />} />

				{routes.map(({ path, element }) => (
					<Route key={path} path={path} element={<Page key={path} element={element} />} />
				))}
			</DOMRoutes>
		</Suspense>
	);
}

function Page({ element }: Pick<RouteProps, 'element'>) {
	// There's probably a much better way to do this - don't ever actually do anything like this, there's probably a lot of unnecessary rerenders.
	const [headings, setHeadings] = useState<string[]>([]);

	const [isVisible, setIsVisible] = useState(false);
	useEffect(() => {
		const timeout = setTimeout(() => {
			window.scrollTo({ top: 0, behavior: 'smooth' });
			setIsVisible(true);
		}, 100);

		return () => clearInterval(timeout);
	}, []);

	const location = useLocation();

	const { nextRoute, prevRoute } = useMemo(() => {
		const routes = ROUTES.flatMap((route) =>
			'children' in route
				? route.children.map((child) => ({ ...child, title: `${route.title} / ${child.title}` }))
				: route,
		);
		const currentRouteIndex = routes.findIndex(({ path }) => path === location.pathname);
		const prevRoute = currentRouteIndex > 0 ? routes[currentRouteIndex - 1] : null;
		const nextRoute = currentRouteIndex < routes.length - 1 ? routes[currentRouteIndex + 1] : null;

		return { nextRoute, prevRoute };
	}, [location]);

	return (
		<PageContext.Provider
			value={{
				addHeading: (heading) => {
					if (!headings.includes(heading)) {
						setHeadings([heading, ...headings]);
					}
				},
			}}
		>
			<div
				className={clsx('flex divide-x-2 gap-4 transition-opacity', {
					'opacity-0': !isVisible,
					'opacity-100': isVisible,
				})}
			>
				<div>
					{element}
					<div className="flex justify-between mt-20">
						{prevRoute ? (
							<Link className="text-gray-500" to={prevRoute.path}>
								Previous: {prevRoute.title}
							</Link>
						) : (
							<div />
						)}

						{nextRoute ? (
							<Link className="text-gray-500" to={nextRoute.path}>
								Next: {nextRoute.title}
							</Link>
						) : (
							<div />
						)}
					</div>
				</div>
				<div className="w-96 flex-shrink-0 pl-4">
					<b>Table of Contents</b>

					{headings.map((heading) => (
						<div key={heading}>
							<a className="text-blue-400 hover:underline" href={`#${headingTranslation(heading)}`}>
								{heading}
							</a>
						</div>
					))}
				</div>
			</div>
		</PageContext.Provider>
	);
}

type RouteType = { title: string; path: string; element: React.ReactElement };
export const ROUTES: Array<
	{
		title: string;
	} & (
		| {
				path: string;
				element: React.ReactElement;
		  }
		| {
				children: Array<RouteType>;
		  }
	)
> = [
	{
		title: 'Introduction',
		path: '/intro',
		element: <Introduction />,
	},

	{
		title: 'Components',
		children: [
			{
				title: 'Introduction',
				path: '/components/intro',
				element: <ComponentsIntro />,
			},
			{
				title: 'Props',
				path: '/components/props',
				element: <ComponentProps />,
			},
			{
				title: 'Conditionals & Loops',
				path: '/components/conditionals',
				element: <ComponentConditionals />,
			},
		],
	},

	{
		title: 'Hooks',
		children: [
			{
				title: 'Introduction',
				path: '/hooks/intro',
				element: <HooksIntro />,
			},
			{
				title: 'useState',
				path: '/hooks/useState',
				element: <UseState />,
			},
			{
				title: 'useEffect',
				path: '/hooks/useEffect',
				element: <UseEffect />,
			},
			{
				title: 'useMemo',
				path: '/hooks/useMemo',
				element: <UseMemo />,
			},
			{
				title: 'Custom Hook',
				path: '/hooks/customHook',
				element: <CustomHook />,
			},
		],
	},

	{
		title: 'Context',
		path: '/context',
		element: <ThemeContext />,
	},

	{
		title: 'Ember to React',
		path: '/ember-to-react',
		element: <EmberToReact />,
	},

	{
		title: 'References',
		path: '/References',
		element: <References />,
	},
];
