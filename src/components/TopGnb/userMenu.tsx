// components/TopGNB/UserMenu.tsx
import ProfileButton from "./ProfileButton";
import AlarmButton from "./AlarmButton";

export default function UserMenu() {
  return (
    <div className="relative flex items-center space-x-6 mr-2">
      <AlarmButton />
      <ProfileButton />
    </div>
  );
}
