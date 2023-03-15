import { type GetServerSidePropsContext, type NextPage } from "next";
import Head from "next/head";
import { AuthProviders } from "~/components/root/AuthProviders.components";
import { LoginForm } from "~/components/root/login/LoginForm.components";
import { useState } from "react";
import { SignupForm } from "~/components/root/signup/SignupForm.components";
import { getServerAuthSession } from "~/server/auth";
import { FiChevronsDown } from "react-icons/fi";
import { RxDividerVertical } from "react-icons/rx";

const Home: NextPage = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const openLoginDrawer = () => {
    setIsDrawerOpen(true);
    setIsLogin(true);
  };

  const openSignupDrawer = () => {
    setIsDrawerOpen(true);
    setIsLogin(false);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <Head>
        <title>PrepMeal AI</title>
      </Head>
      <main className="h-screen w-full bg-[#FFF4EC] bg-[url('https://res.cloudinary.com/dryh1nvhk/image/upload/v1678680244/PrepMeal%20AI/Landing%20Page/landing-page-kitchen_ggawmx.png')] bg-cover bg-center bg-no-repeat">
        {/* Landing Page */}
        <div className="flex h-full w-full flex-col items-center justify-center gap-10 pb-32">
          <h1 className="text-center font-ptSansNarrow text-[60px] font-bold tracking-[.045em] text-[#13171c]">
            PrepMeal AI.
          </h1>
          <p className="mx-auto max-w-[355px] rounded-lg bg-white/80 py-5 px-5 text-center text-[20px] font-medium text-[#32383F] md:max-w-[652px]">
            Discover a smarter way to create recipes tailored to your exact
            caloric and macronutrient requirements.
          </p>
        </div>
        <div className="absolute bottom-28 mx-auto w-full">
          <div className="mx-auto flex max-w-[280px] items-center justify-center gap-8 rounded-lg bg-[#32383F] py-3">
            <button
              onClick={openLoginDrawer}
              className="font-bold tracking-[.035em] text-white hover:text-[#a2acb9]"
            >
              LOGIN
            </button>
            <div>
              <RxDividerVertical className="text-[#a2acb9]" />
            </div>
            <button
              onClick={openSignupDrawer}
              className="font-bold tracking-[.035em] text-white hover:text-[#a2acb9]"
            >
              SIGNUP
            </button>
          </div>
        </div>
        {/*  */}
        {/* Drawer Opened */}
        <div
          className={`fixed bottom-0 left-0 flex h-screen w-full transform flex-col items-center justify-center bg-white transition-all duration-300 ${
            isDrawerOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <button className="absolute top-5" onClick={closeDrawer}>
            <FiChevronsDown className="text-xl hover:hover:text-[#a2acb9]" />
          </button>
          {/* Login Form */}
          {isLogin && <LoginForm setIsLogin={setIsLogin} />}
          {/*  */}
          {/* Signup Form */}
          {!isLogin && <SignupForm setIsLogin={setIsLogin} />}
          {/*  */}
          <div className="grid w-full max-w-[400px] grid-cols-[1fr_50px_1fr] px-5 pt-6">
            <div className="mb-2.5 border-b border-black"></div>
            <p className="text-center font-bold">or</p>
            <div className="mb-2.5 border-b border-black"></div>
          </div>
          <AuthProviders />
        </div>
        {/*  */}
      </main>
    </>
  );
};

export default Home;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(ctx);

  if (session) {
    return {
      redirect: {
        destination: "/recipe",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
