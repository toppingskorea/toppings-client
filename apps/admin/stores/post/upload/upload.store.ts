import { create } from "zustand";
import type { PostUploadInitialState, PostUploadState } from "./upload.types";

const initialState: PostUploadInitialState = {
  images: [],
  description: ""
};

export const usePostUploadStore = create<PostUploadState>(set => ({
  ...initialState,
  dispatchImages: images => set({ images }),
  dispatchDescription: description => set({ description }),
  dispatchInstagramId: instagramId => set({ instagramId }),
  dispatchType: type => set({ type }),
  dispatchInitialize: () => {
    set({ ...initialState });
  }
}));
