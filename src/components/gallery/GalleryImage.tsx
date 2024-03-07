import { DownloadIcon } from "@radix-ui/react-icons";
import { memo, useCallback, useState } from "react";
import { DialogContent, Dialog } from "../../ui/dialog";

/*eslint-disable react-refresh/only-export-components*/
const GalleryImage = ({ image }: { image: string }) => {
  const [isOpen, setOpen] = useState(false);
  const [largerViewImage, setLargerViewImage] = useState("");

  // Download image
  const downloadImage = useCallback(async (imageUrl: string) => {
    const imageName = imageUrl.split("/").pop() || "";
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = imageName;
      document.body.appendChild(a); // Append the anchor to document
      a.click();
      document.body.removeChild(a); // Clean up
      URL.revokeObjectURL(blobUrl); // Free up memory
    } catch (error) {
      console.error("Error downloading image: ", error);
    }
  }, []);

  // toggle image between larger view
  const toggleLargerView = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  // Open selected image larger view
  const openLargerView = useCallback(() => {
    setLargerViewImage(image);
    toggleLargerView();
    /*eslint-disable react-hooks/exhaustive-deps*/
  }, [image]);

  // Close larger view
  const closeLargeView = useCallback(() => {
    setLargerViewImage("");
    toggleLargerView();
  }, []);
  return (
    <>
      <Dialog open={isOpen} onOpenChange={closeLargeView}>
        <DialogContent className=" max-h-screen bg-transparent border-0">
          <img
            src={largerViewImage}
            alt="random"
            className=" max-w-full h-full object-cover rounded-lg shadow-sm cursor-pointer"
          />
        </DialogContent>
      </Dialog>
      <div
        className=" relative  border  overflow-hidden flex flex-col rounded-lg"
        onClick={openLargerView}
      >
        <img
          src={image}
          alt="random"
          className=" max-w-full h-full object-cover rounded-lg shadow-sm cursor-pointer"
        />

        {/* <div className=" px-3 py-2 flex flex-col items-start">
        <button className=" w-7 h-6 rounded-full">
          <DownloadIcon color="red" width={26} height={26} />
        </button>
      </div> */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            downloadImage(image);
          }}
          className=" absolute right-3 top-3 w-8 h-8 inline-flex justify-center items-center rounded-full full bg-white/60 hover:bg-white/90 "
        >
          <DownloadIcon color="red" width={24} height={24} />
        </button>
      </div>
    </>
  );
};
export default memo(GalleryImage);
