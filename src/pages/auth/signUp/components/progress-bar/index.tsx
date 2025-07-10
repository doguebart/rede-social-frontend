type ProgressBarProps = {
  step: number;
};

export const ProgressBar = ({ step }: ProgressBarProps) => {
  return (
    <div className="grid grid-cols-3 gap-1">
      <div
        className={`w-full h-2 rounded-tl rounded-bl ${
          step >= 1 ? "bg-dark-blue" : "bg-gray-300"
        }`}
      />
      <div
        className={`w-full h-2 ${step >= 2 ? "bg-dark-blue" : "bg-gray-300"}`}
      />
      <div
        className={`w-full h-2 rounded-tr rounded-br ${
          step === 3 ? "bg-dark-blue" : "bg-gray-300"
        }`}
      />
    </div>
  );
};
