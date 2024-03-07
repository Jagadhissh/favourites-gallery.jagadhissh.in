import { DownloadIcon, ExclamationTriangleIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import { memo } from "react";

interface ISearchBoxProps {
  importableImage: string;
  onChangeImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyUpInput: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  saveImageToLocalStorage: () => void;
  searchRef: React.RefObject<HTMLInputElement>;
  validationError: string;
}

/*eslint-disable react-refresh/only-export-components*/
const SearchBox = ({
  importableImage,
  onChangeImage,
  onKeyUpInput,
  saveImageToLocalStorage,
  searchRef,
  validationError,
}: ISearchBoxProps) => {
  return (
    <>
      <section
        className={classNames(
          "w-full border flex flex-row  items-center bg-accent rounded-full",
          {
            "border-destructive  ": validationError,
          }
        )}
      >
        <input
          placeholder="Search images"
          className=" flex-1 p-4 w-full focus:outline-none  bg-transparent"
          onChange={onChangeImage}
          value={importableImage}
          ref={searchRef}
          onKeyUp={onKeyUpInput}
        />
        <div className=" me-3 ">
          <button
            disabled={!importableImage}
            onClick={saveImageToLocalStorage}
            className=" px-4 py-2  flex items-center gap-2 hover:bg-primary focus:bg-primary outline-none focus:outline-primary shadow-sm outline-2  text-white  bg-primary/90 hover:text-white rounded-full"
          >
            <DownloadIcon /> <span>Import </span>
          </button>
        </div>
      </section>
      {validationError && (
        <div className=" px-6 py-2  items-center gap-1 flex-row  bg-red-700/10 rounded-lg inline-flex w-auto">
          <ExclamationTriangleIcon color="#ef4444" />
          <span className="text-destructive text-xs">
            Invalid image URL
            <br />
            Allowed formats are:{" "}
            <b>.jpg, .jpeg, .png, .gif, .bmp, .webp, .svg</b>
          </span>
        </div>
      )}
    </>
  );
};

export default memo(SearchBox);
