import { BsFillCheckCircleFill } from "react-icons/bs";

export const SuccessModal = ({
  setIsSuccessModal,
  setIsLogin,
}: {
  setIsSuccessModal: (arg0: boolean) => void;
  setIsLogin: (arg0: boolean) => void;
}) => {
  const handleGoLogin = () => {
    setIsSuccessModal(false);
    setIsLogin(true);
  };

  return (
    <>
      <div className="fixed top-0 left-0 z-50 flex h-screen w-full justify-center bg-black bg-opacity-60 px-20 pt-[200px]">
        <div className="max-h-[250px] w-full max-w-[500px] bg-white">
          <div className="flex flex-col items-center justify-center gap-12 pt-7">
            <BsFillCheckCircleFill className="text-4xl text-green-600" />
            <h1 className="text-2xl font-bold">Successfully Registered!</h1>
            <button
              onClick={handleGoLogin}
              className="border border-black px-2 py-1 hover:bg-[#6a6967] hover:text-white"
            >
              Login!
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
