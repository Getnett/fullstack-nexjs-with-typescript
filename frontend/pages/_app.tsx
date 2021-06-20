import type { AppProps /*, AppContext */ } from 'next/app';
import React from 'react';
import Layout from '../components/Layout';
import '../styles/index.css';

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
}
