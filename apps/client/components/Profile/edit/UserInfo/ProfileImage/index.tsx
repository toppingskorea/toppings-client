/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEditState } from "@atoms/index";
import { css } from "@emotion/react";
import { grayAvatar } from "@images/common";
import { OrangePlus } from "@svgs/common";
import { flex, gutter, touchable } from "@toss/emotion-utils";
import Image from "next/image";
import { useId } from "react";
import { useFetchUserInfo } from "~/server/profile";
import { imageUploader } from "~/utils";

const ProfileImage = () => {
  const id = useId();

  const { data: userInfo } = useFetchUserInfo();
  const [edit, setEdit] = useEditState();

  return (
    <div
      css={css`
        display: inherit;
        margin: 0 auto;
      `}
    >
      <label
        htmlFor={id}
        css={css`
          ${flex({ direction: "column", align: "center" })}
          ${gutter({ direction: "vertical", space: 9 })}
          ${touchable}
        `}
      >
        <Image
          src={edit.profile ?? userInfo?.profile ?? grayAvatar}
          alt="dummy"
          width={88}
          height={88}
          css={css`
            border-radius: 50%;
          `}
        />
        <OrangePlus />
      </label>
      <input
        id={id}
        type="file"
        accept="image/*"
        onChange={async e => {
          const base64 = await imageUploader(e, true);
          if (base64) setEdit({ ...edit, profile: base64 });
        }}
        css={css`
          display: none;
        `}
      />
    </div>
  );
};

export default ProfileImage;
