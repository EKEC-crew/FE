// components/homepage/HomeBackground.tsx
const HomeBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <div
        className="absolute top-[-250px] right-[-300px] w-[750px] h-[800px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(163, 238, 255, 0.6) 0%, rgba(163, 238, 255, 0.0) 70%)",
        }}
      />
      <div
        className="absolute top-[100px] right-[-300px] w-[600px] h-[600px] rounded-full -z-8"
        style={{
          background:
            "radial-gradient(circle, rgba(200, 186, 244, 0.6) 0%, rgba(200, 186, 244, 0.0) 70%)",
        }}
      />
      <div
        className="absolute top-[-300px] left-[-100px] w-[600px] h-[600px] rounded-full -z-8"
        style={{
          background:
            "radial-gradient(circle, rgba(200, 186, 244, 0.6) 0%, rgba(200, 186, 244, 0.0) 70%)",
        }}
      />
    </div>
  );
};

export default HomeBackground;
