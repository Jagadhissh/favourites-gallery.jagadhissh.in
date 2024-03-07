import GalleryImagesGroup from "../components/gallery/GalleryImagesGroup";
import { ImageGroupType } from "../types/GalleryTypes";
import useFavoritesGalleryDB from "../business-logic/useFavoritesGalleryDB";
import { useEffect } from "react";
import AppHeader from "../components/app-header/AppHeader";
import SearchBox from "../components/searchbox/SearchBox";
import { ArrowRightIcon } from "@radix-ui/react-icons";

const FavoritesGallery = () => {
  const {
    importableImage,
    onChangeImage,
    onKeyUpInput,
    saveImageToLocalStorage,
    searchRef,
    images,
    validationError,
    importSampleGallery,
  } = useFavoritesGalleryDB();
  useEffect(() => {}, [images]);
  return (
    <main>
      <AppHeader />
      <section>
        <main className="flex flex-col w-full md:w-8/12 px-6 py-4 mx-auto gap-4">
          <div className="  flex flex-col justify-start items-start gap-2">
            <SearchBox
              validationError={validationError || ""}
              saveImageToLocalStorage={saveImageToLocalStorage}
              onKeyUpInput={onKeyUpInput}
              searchRef={searchRef}
              importableImage={importableImage}
              onChangeImage={onChangeImage}
            />
          </div>

          {/* main content */}
          {(images.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-2 w-full">
              <h2 className="text-center text-lg font-bold text-primary">
                No images found
              </h2>
              <p className="text-center   text-gray-400">
                Start importing images by pasting the image URL in the search
                bar
              </p>
              <button
                onClick={importSampleGallery}
                className=" text-blue-600 underline inline-flex  gap-2 items-center animate-bounce"
              >
                <ArrowRightIcon /> Click here to import the sample gallery.
              </button>
            </div>
          )) || (
            <section className=" grid  md:grid-cols-4 gap-4">
              {images.map((image: ImageGroupType, groupIndex: number) => (
                <GalleryImagesGroup group={image} key={groupIndex} />
              ))}
            </section>
          )}
          {/* main content ends */}
        </main>
      </section>
    </main>
  );
};
export default FavoritesGallery;
