import React, { useEffect, useRef, useState } from "react";
import isValidImageURL from "../utils/isValidImageUrl";
import useLocalStorage from "../hooks/useLocalStorage";
import { GalleryDataType, ImageUrlType } from "../types/GalleryTypes";
import SAMPLE_GALLERY from "../fake-data/sample-gallery";

/**
 * Grup each 3 images into single array
 * @param images
 * @returns grouped images
 *
 **/
const groupImagesByThree = (images: ImageUrlType[]) => {
  const groupedImages = [];
  for (let i = 0; i < images.length; i += 3) {
    groupedImages.push(images.slice(i, i + 3));
  }
  return groupedImages;
};

/**
 * Custom hook for handling  browsing pictures business logic
 * @returns
 */
const useFavoritesGalleryDB = () => {
  const [importableImage, setImportableImage] = useState<string>("");

  const searchRef = useRef<HTMLInputElement>(null);

  const [images, setImages] = useState<GalleryDataType>([]);

  const { getLocalStorageItem, setLocalStorageItem } = useLocalStorage();

  const [validationError, setValidationError] = useState("");

  //save images to local storage
  const saveImageToLocalStorage = () => {
    if (!isValidImageURL(importableImage)) {
      setValidationError("Invalid image URL ");
      setImportableImage("");
      searchRef.current?.focus();
      return;
    }
    setValidationError("");
    const previousImages = getLocalStorageItem("images") || [];
    const images = [...previousImages, importableImage];
    setLocalStorageItem("images", images);
    setImages(groupImagesByThree(images));
    setImportableImage("");
  };

  //executes when the input value changes
  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImportableImage(e.target.value);
  };

  //get images from local storage on component mount
  useEffect(() => {
    const dbImages = getLocalStorageItem("images");
    setImages(groupImagesByThree(dbImages));
  }, []);

  //on user press enter key save the input image to local storage
  const onKeyUpInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log("enter key pressed");
      saveImageToLocalStorage();
    }
  };

  const importSampleGallery = () => {
    const dbImages = SAMPLE_GALLERY;
    setImages(groupImagesByThree(dbImages));
    setLocalStorageItem("images", dbImages);
  };
  return {
    onChangeImage,
    onKeyUpInput,
    saveImageToLocalStorage,
    importableImage,
    searchRef,
    images,
    validationError,
    importSampleGallery,
  };
};
export default useFavoritesGalleryDB;
// Path: src/business-logic/useBrowsePicturesDB.ts
