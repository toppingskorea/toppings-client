import { useOverlay } from "@toss/use-overlay";
import { SuccessModal } from "~/components/Common";
import { useInternalRouter, useSetNavigation, useTokenCookie } from "~/hooks";
import { useLogout } from "~/server/profile";

const ProfileMenu = () => {
  const cookie = useTokenCookie();
  const router = useInternalRouter();
  useSetNavigation({
    top: {
      marginBottom: 34
    },
    bottom: true
  });

  const overlay = useOverlay();

  const { mutate } = useLogout({
    onSuccess: () => {
      overlay.open(() => <SuccessModal />);
      setTimeout(() => {
        overlay.close();
        cookie.remove();
        router.replace("/");
      }, 3000);
    }
  });

  return (
    <div>
      <button type="button" onClick={() => mutate()}>
        일단 로그아웃
      </button>
    </div>
  );
};

export default ProfileMenu;
