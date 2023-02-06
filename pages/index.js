import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [apiOutput, setApiOutput] = useState('');
  // async function callRequestToken() {
  //   console.log("Making Rquest")
  //   const requestToken = await fetch('/api/getPocketAccess', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  //   const token = await requestToken.json();
  //   console.log("requestToken____", token)
  // }

  async function getList() {
    const response = await fetch('/api/getPocketList', {
      method: 'GET',
    }
    );
    const data = await response.json();
    console.log("data____", data.data)
    const { output } = data;
    setApiOutput(data.data);
  }
  function getImage(props) {
    console.log("props____", props.article)
    if (props.article.has_image==1) {
      return <img className="flex flex-col rounded-md w-10 h-10 bg-gray-300 justify-center items-center mr-4" width={100} height={100} src={props.article.image.src}></img>}
    else {
      return <div className="flex flex-col rounded-md w-10 h-10 bg-gray-300 justify-center items-center mr-4">?</div>
    }
  }
  return (
    <>
      <Head>
        <title>PocketPlus</title>
        <meta name="description" content="A better read it later experience" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>Your Pocket List</p>
          <button className="btn btn-blue" onClick={getList}>
            Get list
          </button>
        </div>
        {apiOutput && (
              <div className="container flex mx-auto w-full items-center justify-center">
                  <ul className="flex flex-col bg-gray-300 p-4">
                   {Object.keys(apiOutput).map((key, i) => (
                    <li className="border-gray-400 flex flex-row mb-2" key={key}>
                      <div className="select-none cursor-pointer bg-gray-200 rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                      {getImage({article: apiOutput[key]})}
                        <div className="flex-1 pl-1 mr-16">
                        {/* need some way to create a link for pocket article by taking getpocket.com/read/ + key */}
                        <Link href="{apiOutput[key].resolved_url}">
                          <div className="font-medium">{apiOutput[key].resolved_title}</div>
                          </Link>
                          <div className="text-gray-600 text-sm">{apiOutput[key].word_count} words</div>
                          <div className="text-gray-600 text-sm">{Math.round(apiOutput[key].word_count/300)} minutes</div>
                        </div>
                        {/* Add function to convert unix time into date time */}
                        <div className="text-gray-600 text-xs">{apiOutput[key].time_added}</div>
                      </div>
                    </li>
                    ))}
                  </ul>
              </div>
            )}
           <div></div>
      </main>
    </>
  )
}