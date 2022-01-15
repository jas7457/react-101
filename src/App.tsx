import React from 'react';
import { Link } from 'react-router-dom';
import Routes, { ROUTES } from './Routes';

export default function App() {
	return (
		<>
			<div className="flex h-screen">
				<div className="flex-shrink-0 h-full bg-gray-800 text-white px-8">
					{ROUTES.map((route) => {
						if ('children' in route) {
							return (
								<React.Fragment key={route.title}>
									<div>{route.title}</div>
									<div className="pl-4">
										{route.children.map((child) => (
											<SidebarLink key={child.path} to={child.path}>
												{child.title}
											</SidebarLink>
										))}
									</div>
								</React.Fragment>
							);
						}

						return (
							<SidebarLink key={route.path} to={route.path}>
								{route.title}
							</SidebarLink>
						);
					})}
				</div>
				<div className="flex-grow h-full overflow-y-auto">
					<div className="max-w-[1800px] mx-auto p-6">
						<Routes />
					</div>
				</div>
			</div>
		</>
	);
}

function SidebarLink({ to, children }: { to: string; children: React.ReactNode }) {
	return (
		<Link to={to} className="block">
			{children}
		</Link>
	);
}
