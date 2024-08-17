import React from "react";

const LoadingAnimation: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <svg height="90px" width="110px">
        {" "}
        {/* Increased size */}
        <polyline
          id="back"
          points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
          className="fill-none stroke-gray-800"
          style={{ strokeWidth: 8 }}
        ></polyline>
        <polyline
          id="front"
          points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
          className="fill-none stroke-red-700"
          style={{
            strokeDasharray: "48, 144",
            strokeWidth: 8,
            strokeDashoffset: 192,
            animation: "dash_682 2.1s linear infinite",
          }}
        ></polyline>
      </svg>

      <style>{`
        @keyframes dash_682 {
          72.5% {
            opacity: 0;
          }

          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingAnimation;
