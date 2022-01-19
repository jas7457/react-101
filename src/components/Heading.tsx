import clsx from 'clsx';
import { useContext, useEffect } from 'react';
import PageContext from '../contexts/PageContext';

export default function Heading({
	level,
	children,
	className,
}: {
	level: 1 | 2 | 3 | 4 | 5 | 6;
	children: string;
	className?: string;
}) {
	const pageContext = useContext(PageContext);

	const Component = `h${level}` as const;

	useEffect(() => {
		pageContext.addHeading(children);
	}, [level, pageContext]);

	const headingClass = {
		1: 'text-3xl',
		2: 'text-2xl',
		3: 'text-xl',
		4: 'text-lg',
		5: 'text-base',
		6: 'text-sm',
	}[level];

	return (
		<Component
			id={headingTranslation(children)}
			className={clsx(className, 'font-bold', headingClass)}
		>
			{children}
		</Component>
	);
}

export function headingTranslation(text: string) {
	return text
		.replace(/\s+/g, '-')
		.replace(/[^\d\w-]/gi, '')
		.toLowerCase();
}
