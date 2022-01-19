import clsx from 'clsx';

import { Link, LinkProps } from 'react-router-dom';

export default function InternalLink({ className, ...rest }: LinkProps) {
	return <Link className={clsx(className, 'text-blue-800 hover:underline')} {...rest} />;
}
