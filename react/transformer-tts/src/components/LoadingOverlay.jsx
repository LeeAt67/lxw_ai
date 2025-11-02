// 加载遮罩层组件 - 优化进度显示
import Progress from "./Progress";

const LoadingOverlay = ({ isLoading, progressItems }) => {
  return (
    <div
      className="absolute z-50 top-0 left-0 w-full h-full transition-all 
      px-8 flex flex-col justify-center text-center"
      style={{
        opacity: isLoading ? 1 : 0,
        pointerEvents: isLoading ? "all" : "none",
        background: "rgba(0,0,0,0.9)",
        backdropFilter: "blur(8px)",
      }}
    >
      {isLoading && (
        <>
          <div className="mb-4">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto"></div>
            <label className="text-white text-xl p-3 block mt-4">
              Loading models... (only run once)
            </label>
          </div>
          <div className="space-y-2 w-full max-w-md mx-auto">
            {progressItems.map((data) => (
              <div key={`${data.name}/${data.file}`} className="mb-2">
                <Progress
                  text={`${data.name}/${data.file}`}
                  percentage={data.progress}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LoadingOverlay;

