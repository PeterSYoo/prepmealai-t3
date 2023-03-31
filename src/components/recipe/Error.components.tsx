export const Error = ({
  setIsError,
  setIsForm,
}: {
  setIsError: (arg0: boolean) => void;
  setIsForm: (arg0: boolean) => void;
}) => {
  // Custom Functions ---------------------------------------------------- ***
  const handleFormReturn = () => {
    setIsError(false);
    setIsForm(true);
  };

  // JSX ------------------------------------------------------------------ ***
  return (
    <>
      <section className="flex h-full w-full max-w-[700px] items-center justify-center">
        <p className="pb-[200px] text-center text-xl">
          The AI failed to generate the recipe, sorry for the inconvenience, you
          can go back to the&nbsp;
          <button
            className="font-bold text-orange-400"
            onClick={handleFormReturn}
          >
            recipe generator page and try again.
          </button>
        </p>
      </section>
    </>
  );
};
