const ParallaxBG = ({ url, children = "MERNCAMP" }) => {
  return (
    <div className="w-full flex justify-center items-center h-[300px]">
      <div
        style={{
          backgroundImage: `url(${url})`,
        }}
        className={`flex h-full w-full flex-col justify-center items-center gap-4 bg-fixed bg-no-repeat bg-cover bg-center`}>
        <h1 className="text-[30px] font-semibold">{children}</h1>
      </div>
    </div>
  );
};

export default ParallaxBG;
