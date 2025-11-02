// 进度条组件
const Progress = ({ text, percentage = 0 }) => {
  return (
    <div className="relative text-black bg-white rounded-lg text-left overflow-hidden border border-gray-200">
      <div
        className="px-2 h-8 bg-gradient-to-r from-blue-500 to-blue-600 whitespace-nowrap flex items-center"
        style={{ width: `${percentage}%` }}
      >
        <span className="text-white text-sm font-medium">
          {text} - {percentage.toFixed(1)}%
        </span>
      </div>
    </div>
  );
};

export default Progress;
