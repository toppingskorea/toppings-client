import { css } from "@emotion/react";
import {
  flex,
  gutter,
  padding,
  SafeArea,
  touchable
} from "@toss/emotion-utils";
import Image from "next/image";
import { avatar } from "@images/profile";
import { Exit, OrangePlus } from "@svgs/common";
import { useSetNavigation } from "~/hooks";

const ProfileEdit = () => {
  useSetNavigation({
    top: {
      title: undefined,
      right: <Exit />,
      marginBottom: 56
    },
    bottom: true
  });
  return (
    <SafeArea>
      <section
        css={css`
          ${flex({ direction: "column", align: "center" })}
          ${padding({ left: 30, right: 20 })}
        `}
      >
        <button
          type="button"
          css={css`
            ${flex({ direction: "column", align: "center" })}
            ${gutter({ direction: "vertical", space: 9 })}
            ${touchable}
          `}
        >
          <Image src={avatar} alt="dummy" width={88} height={88} />
          <OrangePlus />
        </button>
      </section>
    </SafeArea>
  );
};

export default ProfileEdit;
