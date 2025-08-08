import type { Bulletin } from "../../../../types/bulletin/types";

interface BulletinAboutProps {
  bulletin: Bulletin;
}

const BulletinAbout: React.FC<BulletinAboutProps> = ({ bulletin }) => {
  return (
    <div className="border-t pt-4">
      <div className="text-gray-800 whitespace-pre-wrap leading-relaxed">
        {bulletin.content}
      </div>

      {bulletin?.images && bulletin.images.length > 0 && (
        <div className="mt-4 space-y-2">
          {bulletin.images.map((imageUrl, index) => (
            <img
              key={index}
              src={imageUrl}
              alt={`첨부 이미지 ${index + 1}`}
              className="max-w-full h-auto rounded-lg"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BulletinAbout;
