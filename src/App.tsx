import clsx from 'clsx';
import React from 'react';
import { NavLink } from 'react-router-dom';
import Routes, { ROUTES } from './Routes';

export default function App() {
	return (
		<>
			<div className="flex h-screen">
				<div className="flex-shrink-0 bg-gray-800 text-white px-8 space-y-4 py-6 fixed h-screen w-60">
					{ROUTES.map((route) => {
						if ('children' in route) {
							return (
								<div key={route.title}>
									<div className="text-xl">{route.title}</div>
									<div className="pl-4">
										{route.children.map((child) => (
											<SidebarLink key={child.path} to={child.path}>
												{child.title}
											</SidebarLink>
										))}
									</div>
								</div>
							);
						}

						return (
							<SidebarLink key={route.path} className="text-xl" to={route.path}>
								{route.title}
							</SidebarLink>
						);
					})}
				</div>
				<div className="flex-grow ml-60">
					<div className="max-w-[1800px] mx-auto p-6">
						<Routes />
					</div>
				</div>
			</div>
		</>
	);
}

function SidebarLink({
	to,
	children,
	className,
}: {
	to: string;
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<NavLink
			to={to}
			className={({ isActive }) => {
				return clsx('block', className, { 'text-orange-500': isActive });
			}}
		>
			{children}
		</NavLink>
	);
}
