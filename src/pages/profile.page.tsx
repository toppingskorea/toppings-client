import { Text } from "~/constants";
import { useSetNavigation } from "~/hooks";

const Profile = () => {
  useSetNavigation({
    top: {
      right: <Text _fontSize={18}>skip</Text>,
      title: <Text _fontSize={24}>Profile</Text>
    },
    bottom: true
  });

  return <div>Profile</div>;
};

export default Profile;
