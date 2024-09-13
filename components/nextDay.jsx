import { useEffect, useState } from 'react';
import axios from 'axios';

export default function NextDay() {
    return (
        <div className="flex flex-col gap-[12px]">
            <div className="flex justify-between items-center">
                <p className="font-medium text-[18px] text-white font-overpass">Sep, 12</p>
                <img src="/cloud.png" className="w-[64px] h-auto" />
                <p className="font-medium text-[18px] text-white font-overpass">21°</p>
            </div>
        </div>
    );
}
