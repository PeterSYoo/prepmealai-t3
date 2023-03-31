import { RiCloseFill } from "react-icons/ri";
import { BsFillExclamationCircleFill } from "react-icons/bs";

export const EmailExistsModal = ({
  setIsEmailExistsModal,
}: {
  setIsEmailExistsModal: (arg0: boolean) => void;
}) => {
  // JSX ------------------------------------------------------------------ ***
  return (
    <>
      <div className="fixed top-0 left-0 z-50 flex h-screen w-full justify-center bg-black bg-opacity-60 px-20 pt-[200px]">
        <div className="max-h-[250px] w-full max-w-[500px] rounded-xl bg-white">
          <div className="flex w-full justify-end py-2 pr-4">
            <button onClick={() => setIsEmailExistsModal(false)}>
              <RiCloseFill className="text-3xl" />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center gap-12 pt-3">
            <BsFillExclamationCircleFill className="text-4xl text-red-600" />
            <h1 className="text-2xl font-bold">That Email Already Exists!</h1>
          </div>
        </div>
      </div>
    </>
  );
};
