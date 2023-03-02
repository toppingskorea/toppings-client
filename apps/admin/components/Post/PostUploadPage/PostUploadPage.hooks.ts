import type { ChangeEvent } from "react";
import type { types } from "~/constants/data/common";
import { usePostUploadStore } from "~/stores/post";

export const useImages = () => {
  const [images, dispatchImages] = usePostUploadStore(state => [
    state.images,
    state.dispatchImages
  ]);

  return {
    images,
    setImages: dispatchImages
  };
};

export const useDescription = () => {
  const [description, dispatchDescription] = usePostUploadStore(state => [
    state.description,
    state.dispatchDescription
  ]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    dispatchDescription(e.target.value);

  return {
    value: description,
    onChange
  };
};

export const useInstagramId = () => {
  const [instagramId, dispatchInstagramId] = usePostUploadStore(state => [
    state.instagramId,
    state.dispatchInstagramId
  ]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    dispatchInstagramId(e.target.value);

  return {
    value: instagramId ?? "",
    onChange
  };
};

export const useType = () => {
  const [type, dispatchType] = usePostUploadStore(state => [
    state.type,
    state.dispatchType
  ]);

  const onChange = (e: ChangeEvent<HTMLSelectElement>) =>
    dispatchType(
      e.currentTarget.value as Util.ElementType<typeof types>["label"]
    );

  return {
    value: type,
    onChange
  };
};
