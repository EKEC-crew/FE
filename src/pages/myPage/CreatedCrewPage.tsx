// pages/myPage/CreatedCrewPage.tsx
import CreatedCrewList from "../../components/myPage/created/CreatedCrewList";

export default function CreatedCrewPage() {
  return (
    <div className="px-10 py-6">
      <div className="text-[2.25rem] font-semibold mb-5">내가 만든 크루</div>
      <CreatedCrewList />
    </div>
  );
}
