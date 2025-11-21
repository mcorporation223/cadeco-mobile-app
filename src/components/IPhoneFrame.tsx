import React from "react";
import { Signal, Wifi, Battery } from "lucide-react";

interface IPhoneFrameProps {
  children: React.ReactNode;
}

export const IPhoneFrame: React.FC<IPhoneFrameProps> = ({ children }) => {
  return (
    <div className="relative mx-auto w-[390px] h-[844px] bg-black rounded-[60px] p-3 shadow-2xl">
      {/* Phone outer frame */}
      <div className="w-full h-full bg-white rounded-[48px] overflow-hidden relative">
        {/* Dynamic Island / Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150px] h-[35px] bg-black rounded-b-[20px] z-50">
          <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[60px] h-[5px] bg-gray-900 rounded-full"></div>
        </div>

        {/* Status bar icons */}
        <div className="absolute top-0 left-0 right-0 h-[44px] px-8 flex justify-between items-center z-40 text-white text-xs font-semibold">
          <span className="text-[15px]">9:40</span>
          <div className="flex gap-1.5 items-center">
            {/* Network Signal - Lucide icon */}
            <Signal className="w-4 h-4" color="white" strokeWidth={3} />

            {/* WiFi Icon - Lucide icon */}
            <Wifi className="w-4 h-4" color="white" strokeWidth={3} />

            {/* Battery Icon - Lucide icon */}
            <Battery
              className="w-5 h-5"
              color="white"
              strokeWidth={3}
              fill="#34c759"
            />
          </div>
        </div>

        {/* Screen content */}
        <div className="w-full h-full">{children}</div>
      </div>
    </div>
  );
};
