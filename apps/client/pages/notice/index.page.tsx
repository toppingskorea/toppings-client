import { useSetNavigation } from "~/hooks";

const Notice = () => {
  useSetNavigation({ bottom: true });
  return <div>notice</div>;
};

export default Notice;
