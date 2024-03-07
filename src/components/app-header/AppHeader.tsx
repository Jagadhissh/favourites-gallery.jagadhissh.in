import { ImageIcon } from "@radix-ui/react-icons";

const AppHeader = () => {
  return (
    <header className=" border-border  h-16 w-full border-b flex flex-row">
      <section className=" w-full md:w-8/12 h-full mx-auto flex flex-row items-center px-6 py-4 justify-between">
        <div className=" flex flex-row items-center gap-2">
          <ImageIcon width={38} height={38} color="#16a34a" />
          <div className="">
            <h1 className="flex items-center  leading-none font-bold text-primary text-xl">
              Favorites Gallery
            </h1>
          </div>
        </div>
      </section>
    </header>
  );
};
export default AppHeader;
