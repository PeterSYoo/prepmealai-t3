import { BsBook, BsBookFill, BsBookHalf } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { GiApothecary } from "react-icons/gi";
import { RiLogoutCircleRFill } from "react-icons/ri";

export const MenuDrawer = () => {
  const recipeRouteReload = () => {
    window.location.href = "/recipe";
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="flex h-[55px] items-center justify-between gap-16 rounded-b-lg bg-[#FFF9F5] px-10 text-2xl shadow-[0_3px_9px_1px] shadow-black/50">
          <Link onClick={recipeRouteReload} href="#">
            <GiApothecary className="mb-1 cursor-pointer hover:text-[#32383F]" />
          </Link>
          <Link href="/recipe-board">
            <BsBookHalf className="cursor-pointer hover:text-[#4e565f]" />
          </Link>
          <AiOutlineLogout
            className="cursor-pointer hover:text-[#4e565f]"
            onClick={() => void signOut()}
          />
        </div>
      </div>
    </>
  );
};
