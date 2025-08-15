import ProfileHeader from "./ProfileHeader";
import SidebarButtons from "./SidebarButtons";

export default function SidebarLayout() {
  return (
    <aside
      className="bg-[#F7F7FB] rounded-2xl flex flex-col items-center px-6 pt-8 justify-start w-[20.3125rem]
 min-h-screen gap-y-6"
    >
      <ProfileHeader />
      <SidebarButtons />
    </aside>
  );
}
