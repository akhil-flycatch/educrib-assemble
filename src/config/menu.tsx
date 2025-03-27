import {
  BarChart,
  DollarSign,
  Edit3,
  File,
  Home,
  Mail,
  MessageSquare,
  Power,
  Settings,
  ShoppingBag,
} from "lucide-react";

export const MENU_DEFAULT_COLLAPSED = true;

const MENU_ITEMS = [
  {
    title: "Dashboard",
    icon: <Home />,
    link: "/dashboard",
  },
  {
    title: "Reviews",
    icon: <MessageSquare />,
    link: "/reviews",
  },
  {
    title: "Analytics",
    icon: <BarChart />,
  },
  {
    title: "Enquiries",
    icon: <Mail />,
  },
  {
    title: "Finance",
    icon: <DollarSign />,
  },
  {
    title: "Jobs",
    icon: <File />,
  },
  {
    title: "Internships",
    icon: <File />,
  },
  {
    title: "Articles",
    icon: <Edit3 />,
  },
  {
    title: "Store",
    icon: <ShoppingBag />,
  },
  {
    title: "Preferences",
    icon: <Settings />,
  },
  {
    title: "Sign Out",
    icon: <Power />,
  },
];

export default MENU_ITEMS;
