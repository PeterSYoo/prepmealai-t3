import { BsBook } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { IoFastFoodOutline } from "react-icons/io5";

export const MenuDrawer = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="flex h-[65px] items-center justify-between gap-16 rounded-b-xl bg-white px-10 text-2xl shadow-[0_3px_9px_1px] shadow-black/50">
          <Link href="/recipe">
            <IoFastFoodOutline className="mb-1 cursor-pointer" />
          </Link>
          <Link href="/recipe-board">
            <BsBook className="cursor-pointer" />
          </Link>
          <AiOutlineLogout
            className="cursor-pointer"
            onClick={() => void signOut()}
          />
        </div>
      </div>
    </>
  );
};
