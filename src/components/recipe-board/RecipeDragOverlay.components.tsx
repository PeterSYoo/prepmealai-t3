import { forwardRef } from "react";

export const RecipeDragOverlay = forwardRef(
  ({ id, recipe, i, ...props }, ref) => {
    return (
      <section
        className="bg-start z-20 mb-[50px] grid min-h-[380px] w-[260px] rotate-6 grid-rows-[80px_1fr_130px] rounded-[25px] border border-[#D9CCC3] bg-white bg-[url('https://res.cloudinary.com/dryh1nvhk/image/upload/v1679034955/PrepMeal%20AI/Recipe%20Board/Ellipse_4_2_zoytb3.png')] bg-no-repeat px-[24px] pt-[19px] pb-[27px] shadow-[3px_3px_10px_1px] shadow-black/30"
        {...props}
        ref={ref}
        onClick={() => console.log("Clicked event triggered ")}
      >
        {/* Row 1 */}
        <div className="flex gap-[17px]">
          <div className="flex h-[29px] w-full max-w-[29px] items-center justify-center rounded-full bg-white">
            {i + 1}
          </div>
          <p className="text-[14px] font-bold">{recipe?.name}</p>
        </div>
        {/*  */}
        {/* Row 2 */}
        <div className="flex justify-center">
          <p className="text-[14px]">{recipe?.description}</p>
        </div>
        {/*  */}
        {/* Row 3 */}
        <div className="bg-[url('https://res.cloudinary.com/dryh1nvhk/image/upload/v1679030364/PrepMeal%20AI/Recipe%20Board/salmon-circle_fboiai.png')] bg-center bg-no-repeat"></div>
        {/*  */}
      </section>
    );
  }
);
