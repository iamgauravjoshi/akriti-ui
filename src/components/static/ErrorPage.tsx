import React from "react";
import {Link} from "react-router-dom";
import {ArrowLeft} from "lucide-react";

function ErrorPage() {
    return (
        <main className='min-h-screen justify-center bg-white flex flex-col items-center text-center'>
            <h1 className='mb-4 text-8xl font-bold text-neutral-900'>404</h1>
            <h1 className='mb-4 text-4xl font-bold text-neutral-900'>Page not found</h1>
            <div className='animate-bounce mt-10'>
                <svg
                    className='mx-auto h-16 w-16 text-violet-700'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'>
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8'/>
                </svg>
            </div>
            <p className='text-neutral-900 mt-2'>
                Sorry, we couldn’t find the page you’re looking for.
            </p>
            <Link
                to={'/'}
                className='mt-2 flex items-center text-violet-700 hover:text-violet-800 font-semibold'>
                <ArrowLeft className='fill-violet-700 mr-2'/>
                Back to Home
            </Link>
        </main>
    );
}

export default ErrorPage;
