"use client";
export default function BtnHeroSection({ text }: { text: string }) {
  const handleClickBtn = () => {
    window.scrollTo({
      top: 504,
      behavior: "smooth",
    });
  };

  return (
    <button
      className="hidden lg:block -48 border px-8 py-4 bg-[#1a1a1d] text-white rounded-full shadow-md hover:opacity-90 transition ease-linear duration-300 hover:bg-[#1a1a1d]/90"
      onClick={handleClickBtn}
    >
      <div className=" font-semibold">{text} &darr;</div>
    </button>
  );
}
