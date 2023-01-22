import { Marker, Plus, Bell, User, ActivatedBell } from "@svgs/common";

const navList = [
  {
    icon: <Marker />,
    activatedIcon: null,
    href: "/map"
  },
  {
    icon: <Plus />,
    activatedIcon: null,
    href: "/post/add"
  },
  {
    icon: <Bell />,
    activatedIcon: <ActivatedBell />,
    href: "/notice"
  },
  {
    icon: <User />,
    activatedIcon: null,
    href: "/profile"
  }
] as const;
export default navList;
