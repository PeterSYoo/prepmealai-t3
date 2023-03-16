import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { PT_Sans_Narrow } from "next/font/google";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const ptSansNarrow = PT_Sans_Narrow({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-ptSansNarrow",
});

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { useRouter } from "next/router";
import { MenuDrawer } from "~/components/MenuDrawer.components";
import { useState } from "react";
import { FiChevronsDown, FiChevronsUp, FiMenu } from "react-icons/fi";
import { ImMenu3 } from "react-icons/im";
import { GiHamburger } from "react-icons/gi";
import { HiOutlineSwitchVertical } from "react-icons/hi";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState<boolean>(false);

  const router = useRouter();

  const excludedRoutes = ["/"];
  const shouldRenderHeader = !excludedRoutes.includes(router.pathname);

  const openMenuDrawer = () => {
    setIsMenuDrawerOpen(true);
  };

  const closeMenuDrawer = () => {
    setIsMenuDrawerOpen(false);
  };

  return (
    <SessionProvider session={session}>
      <div
        className={`${inter.variable} ${ptSansNarrow.variable} h-screen bg-[#FFF9F5] font-inter`}
      >
        <div
          className={`absolute top-0 left-0 flex h-screen w-full transform flex-col items-center justify-center transition-all duration-300 ${
            isMenuDrawerOpen
              ? "h-[55px] translate-y-0"
              : "h-8 -translate-y-full"
          }`}
        >
          {shouldRenderHeader && <MenuDrawer />}
        </div>
        <div className="flex justify-center">
          <button
            className={`absolute transition-all duration-300 ${
              isMenuDrawerOpen ? "top-[80px]" : "top-6"
            }`}
            onClick={isMenuDrawerOpen ? closeMenuDrawer : openMenuDrawer}
          >
            {shouldRenderHeader && (
              <>
                {isMenuDrawerOpen ? (
                  <div className="rounded-full bg-[#FFF9F5] p-2">
                    <FiChevronsUp className="text-xl hover:hover:text-[#4e565f]" />
                  </div>
                ) : (
                  <div className="rounded-full bg-[#FFF9F5] p-2">
                    <HiOutlineSwitchVertical className="text-xl hover:hover:text-[#4e565f]" />
                  </div>
                )}
              </>
            )}
          </button>
        </div>
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
