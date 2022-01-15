import React, { Suspense } from 'react';
import { Routes as DOMRoutes, Route, Navigate } from 'react-router-dom';

const Introduction = React.lazy(() => import('./pages/Introduction'));
const ComponentsIntro = React.lazy(() => import('./pages/components/ComponentsIntro'));
const ComponentProps = React.lazy(() => import('./pages/components/ComponentProps'));
const ComponentConditionals = React.lazy(() => import('./pages/components/ComponentConditionals'));

export default function Routes() {
	const routes = ROUTES.flatMap((route) => ('children' in route ? route.children : route));

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<DOMRoutes>
				<Route path="/" element={<Navigate to="/intro" replace />} />
				{routes.map(({ path, element }) => (
					<Route key={path} path={path} element={element} />
				))}
			</DOMRoutes>
		</Suspense>
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
				title: 'Conditionals',
				path: '/components/conditionals',
				element: <ComponentConditionals />,
			},
		],
	},
];
