import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { AuthProviders } from "~/components/AuthProviders.components";
import { LoginForm } from "~/components/LoginForm.components";
import { useState } from "react";
import { SignupForm } from "~/components/SignupForm.components";

const Home: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  const [isLogin, setIsLogin] = useState<boolean>(true);

  return (
    <>
      <Head>
        <title>PropMeal AI</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gradient-to-b from-[#abd1d9] to-[#ffffff]">
        {/* Login Form */}
        {isLogin && <LoginForm setIsLogin={setIsLogin} />}
        {/*  */}
        {/* Signup Form */}
        {!isLogin && <SignupForm setIsLogin={setIsLogin} />}
        {/*  */}
        <div className="grid w-full max-w-[400px] grid-cols-[1fr_50px_1fr]">
          <div className="mb-2.5 border-b border-black"></div>
          <p className="text-center">or</p>
          <div className="mb-2.5 border-b border-black"></div>
        </div>
        <AuthProviders />
      </main>
    </>
  );
};

export default Home;
