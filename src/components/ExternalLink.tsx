import clsx from 'clsx';

export default function ExternalLink({
	className,
	children,
	...rest
}: {
	className?: string;
	children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
	return (
		<a className={clsx(className, 'text-blue-800 hover:underline')} {...rest} target="_blank">
			{children}
		</a>
	);
}
