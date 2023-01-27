import { css, useTheme } from "@emotion/react";
import { Logout } from "@svgs/profile";
import { flex, gutter, padding, position } from "@toss/emotion-utils";
import { useOverlay } from "@toss/use-overlay";
import { MotionButton, SuccessModal } from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import { OpenGraph } from "~/components/Util";
import { useInternalRouter, useSetNavigation, useTokenCookie } from "~/hooks";
import { useLogout } from "~/server/profile";

const ProfileMenu = () => {
  const { colors, weighs, dimensions } = useTheme();
  const cookie = useTokenCookie();
  const { push, replace } = useInternalRouter();
  useSetNavigation({
    top: {
      marginBottom: 34
    },
    bottom: true
  });

  const overlay = useOverlay();

  const { mutate: logoutMutate } = useLogout({
    onSuccess: () => {
      overlay.open(() => <SuccessModal />);
      setTimeout(() => {
        overlay.close();
        cookie.remove();
        replace("/");
      }, 3000);
    }
  });

  return (
    <section
      css={css`
        ${padding({ x: 22 })}
      `}
    >
      <OpenGraph title="Menu" />
      <Text _fontSize={22} _color={colors.secondary[62]} weight={weighs.bold}>
        Menu
      </Text>
      <div>
        <button type="button" onClick={() => push("/about")}>
          go About
        </button>
      </div>

      <MotionButton
        onClick={() => logoutMutate()}
        css={css`
          ${position("fixed", {
            bottom: dimensions.bottomNavigationHeight,
            right: 22
          })};
          ${flex({ align: "center" })}
          ${gutter({ direction: "horizontal", space: 2 })}
        `}
      >
        <Text
          _fontSize={15}
          weight={weighs.semiBold}
          _color={colors.secondary["6D"]}
        >
          Sign out
        </Text>
        <Logout />
      </MotionButton>
    </section>
  );
};

export default ProfileMenu;
