import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Hour({hour}) {
  return (
    <div className="w-[70px] h-[155px] rounded-[20px] flex flex-col py-[13px] items-center justify-between" style={{ background: "rgba(255, 255, 255, 0.3)" }}>
      <p className="text-white font-overpass font-normal text-[18px]">
      26°C
      </p>
      <img src="/cloud_two.png" alt="cloud_two" className="w-[34px] h-auto" />
      <p className="text-white font-overpass font-normal text-[18px]">{hour}:00</p>
    </div>
  );
}
