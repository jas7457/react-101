import {
	CodeEditorProps,
	SandpackCodeEditor,
	CodeViewerProps,
	SandpackCodeViewer,
	SandpackLayout,
	SandpackPreview,
	SandpackProps,
	SandpackProvider,
} from '@codesandbox/sandpack-react';
import { useMemo } from 'react';

import '@codesandbox/sandpack-react/dist/index.css';

export default function CodeBlock({
	children,
	editable = true,
	showPreview = true,
	files = { '/App.tsx': stripIndentation(children) },
	customSetup,
	...rest
}: {
	children: string;
	editable?: boolean;
	showPreview?: boolean;
} & Pick<SandpackProps, 'files' | 'customSetup'>) {
	const editorPart = showPreview ? 70 : 100;
	const previewPart = 100 - editorPart;

	const codeProps: CodeEditorProps | CodeViewerProps = {
		wrapContent: true,
		showLineNumbers: true,
		customStyle: {
			height: 'auto',
			maxHeight: '500px',
			flexGrow: editorPart,
			flexShrink: editorPart,
		},
		...rest,
	};

	const formattedFiles = useMemo(() => {
		return Object.entries(files).reduce((acc, [path, content]) => {
			return { ...acc, [path]: stripIndentation(content as string) };
		}, {} as Record<string, string>);
	}, [files]);

	return (
		<SandpackProvider template="react-ts" customSetup={{ ...customSetup, files: formattedFiles }}>
			<SandpackLayout theme="night-owl">
				{editable ? <SandpackCodeEditor {...codeProps} /> : <SandpackCodeViewer {...codeProps} />}
				{showPreview && (
					<SandpackPreview
						customStyle={{
							height: 'auto',
							maxHeight: 'auto',
							minHeight: 'auto',
							flexGrow: previewPart,
							flexShrink: previewPart,
						}}
					/>
				)}
			</SandpackLayout>
		</SandpackProvider>
	);
}

export function CodeBlockViewer({
	children,
	...rest
}: {
	children: string;
} & Pick<SandpackProps, 'files' | 'customSetup'>) {
	return (
		<CodeBlock editable={false} showPreview={false} {...rest}>
			{children}
		</CodeBlock>
	);
}

function stripIndentation(text: string) {
	let numberOfTabs: number | undefined = undefined;

	return text
		.split(/\n/)
		.map((line) => {
			if (numberOfTabs === undefined) {
				if (line.match(/^\s*$/)) {
					return null;
				} else {
					numberOfTabs = line.match(/^\t*/)?.[0].length ?? 0;
					return line.trim();
				}
			}
			return line.replace(new RegExp(`^\\t{${numberOfTabs}}`), '');
		})
		.filter((line) => line !== null)
		.join('\n')
		.trim();
}
