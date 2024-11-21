import {
  BarChart,
  GraduationCap,
  UserCircle,
  Settings,
  MessageCircle,
  UserCircle2Icon,
} from "lucide-react";

const cards = [
  {
    Icon: GraduationCap,
    Label: "Courses",
    value: "courses",
    content: "View and manage your courses.",
    action: "Go to Courses",
    link: "/instructor/courses/new",
  },
  {
    Icon: UserCircle2Icon,
    Label: "Students",
    value: "students",
    content: "Manage your students.",
    action: "View Students",
    link: "/instructor/students",
  },
  {
    Icon: BarChart,
    Label: "Analytics",
    value: "analytics",
    content: "Track your course performance.",
    action: "View Analytics",
    link: "/instructor/analytics",
  },
  {
    Icon: MessageCircle,
    Label: "Messages",
    value: "messages",
    content: "Check messages from students.",
    action: "Go to Messages",
    link: "/instructor/messages",
  },
  {
    Icon: Settings,
    Label: "Settings",
    value: "settings",
    content: "Update your account ",
    action: "Edit Settings",
    link: "/instructor/settings",
  },
];

export default cards;
