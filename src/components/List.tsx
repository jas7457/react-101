import clsx from 'clsx';

export default function List({
	type = 'unordered',
	className,
	...rest
}: { type?: 'ordered' | 'unordered' } & React.HTMLAttributes<HTMLUListElement>) {
	const Component = type === 'ordered' ? 'ol' : ('ul' as const);

	return (
		<Component
			className={clsx('list-outside pl-4', {
				'list-decimal': type === 'ordered',
				'list-disc': type === 'unordered',
			})}
			{...rest}
		/>
	);
}

export function ListItem({ ...rest }: React.HTMLAttributes<HTMLLIElement>) {
	return <li {...rest} />;
}
