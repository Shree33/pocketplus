// Page to catch the redirect from Pocket's auth page
//

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';


export default function AuthRedirect() {
    const router = useRouter();
    const { code } = router.query;
    
    const [accessToken, setAccessToken] = useState('');
    
    const getAccessToken = async () => {
        const response = await fetch('/api/pocketAccessToken', {
        method: 'POST',
        body: JSON.stringify(code),
        });
        const data = await response.json();
        setAccessToken(data);
    };
    
    useEffect(() => {
        getAccessToken();
    }, []);
    
    return (
        <>
        <Head>
            <title>PocketPlus</title>
            <meta name="description" content="A better read it later experience" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="flex">
            <div className="container md mx-auto w-full items-center justify-center">
            <p>Access Token: {accessToken}</p>
            </div>
        </main>
        </>
    );
    }
