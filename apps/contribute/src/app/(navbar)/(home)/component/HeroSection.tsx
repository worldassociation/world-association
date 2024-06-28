import BtnHeroSection from "./BtnHeroSection";
import header from "@/public/static/homepage/config.json";
export default function HeroSection() {
  return (
    <div className="justify-center grid grid-cols-1 md:grid-cols-8 items-center gap-8 sm:gap-16 md:gap-24 lg:gap-32 xl:gap-40 ">
      {/* lg:max-w-[30rem] xl:max-w-[36rem] */}
      <div className="flex flex-col text-center md:col-span-5 md:text-left animate-slideleft duration-200">
        <h6 className="text-slate-900 text-5xl font-semibold font-rubik ">
          {header["welcome-message"]}
        </h6>
        <p className="text-slate-600 text-base font-normal mx-4 md:mx-0 my-6 max-w-[45em]">
          {header["welcome-desc"]}
        </p>
        <div className="mt-2">
          <BtnHeroSection text={header["button-text"]} />
        </div>
      </div>
    </div>
  );
}
