/* eslint-disable jsx-a11y/label-has-associated-control */
import { css } from "@emotion/react";
import { flex, gutter, touchable } from "@toss/emotion-utils";
import Image from "next/image";
import { useId } from "react";
import { avatar } from "~/assets/images/profile";
import { OrangePlus } from "~/assets/svgs/common";
import { useEditState } from "~/recoil/atoms/edit";
import { imageUploader } from "~/utils";

const ProfileImage = () => {
  const id = useId();

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
          src={edit.profile ?? avatar}
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
          const base64 = await imageUploader(e);
          setEdit({ ...edit, profile: base64 });
        }}
        css={css`
          display: none;
        `}
      />
    </div>
  );
};

export default ProfileImage;
