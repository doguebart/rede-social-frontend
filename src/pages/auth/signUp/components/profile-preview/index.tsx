export const ProfilePreview = () => {
  return (
    <div className="w-full flex gap-4">
      <div className="min-w-14 max-w-14 min-h-14 max-h-14 rounded-full p-0.5 border border-dark-blue/50">
        <div className="rounded-full w-full h-full flex items-center justify-center bg-dark-blue">
          <span className="text-base font-medium text-white">DW</span>
        </div>
      </div>
      <div className="w-full flex flex-col">
        <p className="text-lg font-medium text-dark-blue">Douglas Welber</p>
        <p className="max-w-[90%] text-sm text-dark-blue/70 truncate">
          douglas.welber@outlook.com
        </p>
      </div>
    </div>
  );
};
