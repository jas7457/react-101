import React from 'react';

const PageContext = React.createContext<{ addHeading: (header: string) => void }>({
	addHeading: () => {},
});

export default PageContext;
