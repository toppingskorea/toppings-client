import type { types } from "~/constants/data/common";

export interface PostUploadInitialState {
  id?: number; // id가 존재한다면 수정입니다. 추후 사용합니다.
  images: string[];
  description: string;
  type?: Util.ElementType<typeof types>["label"];
  instagramId?: string;
}

export interface PostUploadState extends PostUploadInitialState {
  dispatchImages: (images: PostUploadInitialState["images"]) => void;
  dispatchDescription: (
    description: PostUploadInitialState["description"]
  ) => void;
  dispatchInstagramId: (
    instagramId: PostUploadInitialState["instagramId"]
  ) => void;
  dispatchType: (type: PostUploadInitialState["type"]) => void;
  dispatchInitialize: VoidFunction;
}
