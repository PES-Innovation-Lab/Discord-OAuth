import type { NextPage } from 'next';
import Head from 'next/head';
import { logOut } from '../db/db';
import { useState } from 'react';
import Login from '../components/Login/Login.component';
import Password from '../components/Password/Password.component';

const Home: NextPage = () => {
  const [displayState, setDisplayState] = useState<string>("loading");
  const [password, setPassword] = useState<string>("");

  const display = () => {
    if (displayState == "loading") {
      return (
        <Login setPassword={setPassword} setDisplayState={setDisplayState}/>
      );
    } else if (displayState == "user") {
      return (
        <Password password={password}/>
      );
    }
  }

  return (
    <div>
      <Head>
        <title>PIL Discord OAuth2</title>
        <meta name="description" content="Generate password to validate on discord server" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {display()}
    </div>
  )
}

export default Home
