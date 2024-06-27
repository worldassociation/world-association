"use client";
export default function BtnHeroSection({ text }: { text: string }) {
  const handleClickBtn = () => {
    window.scrollTo({
      top: 450,
      behavior: "smooth",
    });
  };

  return (
    <button
      className="hidden lg:block -48 border px-8 py-4 bg-[#020306] text-white rounded-full  shadow-md hover:opacity-90 transition ease-linear duration-300 hover:bg-white hover:text-[#020306] hover:border-[#020306]"
      onClick={handleClickBtn}
    >
      <div className=" font-semibold">{text} &darr;</div>
    </button>
  );
}
