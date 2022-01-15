import clsx from 'clsx';

export default function Heading({
	level,
	children,
	className,
}: {
	level: 1 | 2 | 3 | 4 | 5 | 6;
	children: React.ReactNode;
	className?: string;
}) {
	const Component = `h${level}` as const;

	const headingClass = {
		1: 'text-3xl',
		2: 'text-2xl',
		3: 'text-xl',
		4: 'text-lg',
		5: 'text-base',
		6: 'text-sm',
	}[level];

	return <Component className={clsx(className, 'font-bold', headingClass)}>{children}</Component>;
}
