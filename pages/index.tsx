import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react';
import { sortBy } from 'lodash'



const inter = Inter({ subsets: ['latin'] })

// Nav Component
const NavComponent = (props) => {
  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <a href="#" className="flex items-center">
            <img src="https://flowbite.com/docs/images/logo.svg" className="h-6 mr-3 sm:h-9" alt="PocketPlus Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">PocketPlus</span>
        </a>
        <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <button onClick={props.getList} className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">Get list</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )}


// List Component
const ListComponent = (props) => {
  const [articles, setArticles] = useState([])
  const [sortBy, setSortBy] = useState('')
  const [filterBy, setFilterBy] = useState('')

  useEffect(() => {
    setArticles(Object.values(props.articles));
  }, [props.articles]);

  const handleSort = (e) => {
    setSortBy(e.target.value);
  };

  const handleFilter = (e) => {
    setFilterBy(e.target.value);
  };
  

  const sortArticles = () => {
    switch (sortBy) {
      case 'title':
        setArticles([...articles].sort((a, b) => a.resolved_title.localeCompare(b.resolved_title)));
        break;
      case 'word_count':
        setArticles([...articles].sort((a, b) => a.word_count - b.word_count));
        break;
      case 'date':
        setArticles([...articles].sort((a, b) => a.time_added - b.time_added));
        break;
      default:
        break;
    }
  };
  const filterArticles = () => {
    if (!filterBy) {
      return articles;
    }
    return articles.filter(article => {
      const titleMatch = article.resolved_title.toLowerCase().includes(filterBy.toLowerCase());
      const excerptMatch = article.excerpt.toLowerCase().includes(filterBy.toLowerCase());
      //const tagsMatch = article.tags.some(tag => tag.toLowerCase().includes(filterBy.toLowerCase()));
      const urlMatch = article.resolved_url.toLowerCase().includes(filterBy.toLowerCase());
      return titleMatch || excerptMatch || urlMatch;
    });
  };

  useEffect(() => {
    sortArticles();
  }, [sortBy]);
  return (
    <>
    <div>
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <div className="sort-container">
        <select className="w-full p-2 text-sm rounded" value={sortBy} onChange={handleSort}>
          <option value="">Sort By</option>
          <option value="title">Title</option>
          <option value="date">Date Added</option>
          <option value="word_count">Word Length</option>
        </select>
        </div>
        <div className="filter-container ">
          <input
            type="text"
            placeholder="Search"
            value={filterBy}
            onChange={handleFilter}
            className="w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
      <ul className="flex flex-col bg-gray-300 p-4">
        {filterArticles().map((article, i) => (
          <ListItem article={article} key={i} />
        ))}
      </ul>
      </div>
    </>
  );
};


const ListItem = (props) => {
  const { article } = props;

  function getImage() {
    if (article.has_image == 1) {
      return <img className="flex flex-col rounded-md w-10 h-10 bg-gray-300 justify-center items-center mr-4" width={100} height={100} src={article.image.src} />;
    } else {
      return <div className="flex flex-col rounded-md w-10 h-10 bg-gray-300 justify-center items-center mr-4">?</div>;
    }
  }

  function getTime() {
    const date = new Date(article.time_added * 1000);
    return date.toLocaleString();
  }

  return (
    <li className="border-gray-400 flex flex-row mb-2">
      <div className="select-none cursor-pointer bg-gray-200 rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
        {getImage()}
        <div className="flex-1 pl-1 mr-16">
          <a href={`https://getpocket.com/read/${article.item_id}`}>
            <div className="font-medium text-black" >{article.resolved_title}</div>
          </a>
          <div className="text-gray-600 text-sm">{article.word_count} words</div>
          <div className="text-gray-600 text-sm">{Math.round(article.word_count / 300)} minutes</div>
          <a className="text-black" href={article.resolved_url}> Link to article</a>
        </div>
        <div className="text-gray-600 text-xs">{getTime()}</div>
      </div>
    </li>
  );
};

export default function Home() {
  const [apiOutput, setApiOutput] = useState('');

  async function getList() {
    // const requestRequestToken= await fetch('/api/pocketRequestToken', {
    //   method: 'POST',
    // });
    // const reqToken = await requestRequestToken.json();
    // window.open(reqToken.url);
    // const requestToken = reqToken.token
    // const requestAccessToken = await fetch('/api/pocketAccessToken', {
    //   method: 'POST',
    //   body: requestToken,
    // });
    // const accessToken = await requestAccessToken.json();
    // console.log("access token", accessToken);

    const requestList = await fetch('/api/getPocketList', {
      method: 'GET',
    });
    const data = await requestList.json();
    console.log("data____", data.data);
    setApiOutput(data.data);
  }

  return (
    <>
      <Head>
        <title>PocketPlus</title>
        <meta name="description" content="A better read it later experience" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavComponent getList={getList}/>
      <main className= "flex">
        {apiOutput && (
          <div className="container md mx-auto w-full items-center justify-center">
            <ListComponent articles={apiOutput} />
          </div>
        )}
      </main>
      </>
  );
}

  // {/* // flex-direction: column;
  // // justify-content: space-between;
  // // align-items: center;
  // // padding: 6rem;
  // // min-height: 100vh;"> */}
  //       {/* <div className= "flex"> */}
  //         {/* <p>Your Pocket List</p>
  //         <button className="btn btn-blue" onClick={getList}>
  //           Get list
  //         </button>
  //       </div> */}