import { Marker, Plus, Bell, User } from "@svgs/common";

const navList = [
  {
    icon: <Marker />,
    href: "/map"
  },
  {
    icon: <Plus />,
    href: "/post/add"
  },
  {
    icon: <Bell />,
    href: "/notice"
  },
  {
    icon: <User />,
    href: "/profile"
  }
] as const;
export default navList;
