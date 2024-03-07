import { memo } from "react";
import GalleryImage from "./GalleryImage";

/*eslint-disable react-refresh/only-export-components*/
const GalleryImagesGroup = ({ group }: { group: string[] }) => {
  return (
    <div className="grid  gap-4">
      {group &&
        group?.map?.((img: string, imageIndex: number) => (
          <GalleryImage image={img} key={imageIndex} />
        ))}
    </div>
  );
};
export default memo(GalleryImagesGroup);
// Path: src/components/gallery/GalleryImagesGroup.tsx
