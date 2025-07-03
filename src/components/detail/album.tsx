interface AlbumItem {
  id: string;
  src: string;
}

const albumData: AlbumItem[] = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1601758125946-3c45cbb6f8d0',
  },
];

const Album: React.FC = () => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="font-semibold py-4 text-xl px-0 text-gray-800">
          앨범
        </span>
      </div>

      <div className="bg-[#f8f9fb] p-4 grid grid-cols-3 gap-4 rounded-2xl">
        {albumData.map((img) => (
          <div
            key={img.id}
            className="relative w-full h-40 bg-gray-100 overflow-hidden"
          >
            <img
              src="/DefaultCrewProfile.png"
              alt="앨범 사진"
              className="w-full h-full object-cover rounded-2xl transition-transform duration-200 hover:scale-105"
            />
          </div>
        ))}

        {[...Array(2)].map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-center w-full h-40 cursor-pointer
                       transition-all duration-200
                       border border-gray-300 hover:border-2 hover:border-gray-500
                       text-gray-400 text-6xl font-light bg-gray-100 rounded-2xl"
          >
            +
          </div>
        ))}
      </div>
    </div>
  );
};

export default Album;
