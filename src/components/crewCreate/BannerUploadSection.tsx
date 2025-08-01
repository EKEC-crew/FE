import cameraIcon from "../../assets/icons/ic_line_Camera.svg";
import defaultBanner from "../../assets/logo/img_crew_banner.svg";

interface BannerUploadSectionProps {
  bannerImage: File | null;
  setBannerImage: (file: File) => void;
}

const BannerUploadSection = ({
  bannerImage,
  setBannerImage,
}: BannerUploadSectionProps) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setBannerImage(file);
  };

  return (
    <div className="flex flex-col pb-8">
      <label
        htmlFor="crewBanner"
        className="font-semibold text-[1.375rem] pb-2"
      >
        크루 배너
      </label>
      <div className="flex items-center gap-16">
        <div className="relative w-34 h-34">
          <img
            src={bannerImage ? URL.createObjectURL(bannerImage) : defaultBanner}
            alt="크루 배너"
            className="w-full h-full rounded-md object-cover"
          />
          <div
            onClick={() => document.getElementById("bannerUpload")?.click()}
            className="absolute -bottom-4 -right-4 w-12 h-12 bg-[#3A3ADB] border-[4px] border-white rounded-full flex items-center justify-center cursor-pointer"
          >
            <img src={cameraIcon} />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-[#93959D] text-xl font-medium">
            크루를 잘 나타낼 수 있는 크루 배너 사진을 등록해주세요!
          </p>
          <p className="text-[#93959D] text-xl font-medium">
            이후에도 크루 배너는 수정할 수 있습니다.
          </p>
        </div>
      </div>
      <input
        type="file"
        accept="image/*"
        id="bannerUpload"
        className="hidden"
        onChange={handleImageUpload}
      />
    </div>
  );
};

export default BannerUploadSection;
