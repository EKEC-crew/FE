import TypeSelector from "./TypeSelector";
import DateSelector from "./DateSelector";
import PermissionSelector from "./PermissionSelector";
import TitleInput from "./TitleInput";
import ContentInput from "./ContentInput";
import FeeSection from "./FeeSection";
import SubmitButton from "./SubmitButton";
import Header from "../../header";
import Notice from "../../notice";
import Tabs from "../../tabs";

const PostScheduleForm = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="mt-12 shadow-none">
        <Header />
        <Tabs />
      </div>

      <div className="flex justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-[1200px] space-y-6 py-6">
          <Notice />

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-2xl font-bold mb-7 mt-4 px-2 lg:px-6">
              크루 일정 등록하기
            </div>

            <div className="space-y-6 px-2 lg:px-6">
              <TypeSelector />
              <DateSelector />
              <PermissionSelector />
              <TitleInput />
              <ContentInput />
              <FeeSection />
              <SubmitButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostScheduleForm;
