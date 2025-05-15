import type { NextPage } from 'next';
import PostsGallery from './PostsGallery';
import Head from 'next/head';

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Social Gallery | Share Your Moments</title>
                <meta name="description" content="A beautiful gallery of shared moments" />
            </Head>

            <main>
                <PostsGallery />
            </main>
        </>
    );
};

export default Home;