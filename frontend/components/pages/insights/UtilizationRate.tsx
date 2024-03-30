"use client";

import ViewDetails from "@/components/shared/ViewDetails";
import { Progress } from "@/components/ui/progress";

const UtilizationRate = () => {
  return (
    <div className="insight-card">
      <div className="flex justify-between  ">
        <h2>Utilization Rates</h2>
        <ViewDetails href="#" />
      </div>
      <div>
        <table className="w-full mt-3 text-xs">
          <thead className="text-gray-400 ">
            <tr className="flex gap-8 mb-3">
              <th className="text-left w-[110px]">Type of storage</th>
              <th className="w-[55px]">Capacity</th>
              <th className="w-[40px]">Usage</th>
              <th className="opacity-0">Progress</th>
            </tr>
          </thead>
          <tbody>
            <tr className="flex gap-8 w-full ">
              <td className="w-[110px]">Small storages</td>
              <td className="w-[55px] text-center">X</td>
              <td className="w-[40px]">80%</td>
              <td className="flex-1">
                <Progress
                  value={80}
                  className=" bg-transparent border progressbar  "
                />
              </td>
            </tr>
            <tr className="flex gap-8 w-full ">
              <td className="w-[110px]">Medium storages</td>
              <td className="w-[55px] text-center">X</td>
              <td className="w-[40px]">67%</td>
              <td className="flex-1">
                <Progress
                  value={67}
                  className=" bg-transparent border progressbar  "
                />
              </td>
            </tr>
            <tr className="flex gap-8 w-full ">
              <td className="w-[110px]">Large storages</td>
              <td className="w-[55px] text-center">X</td>
              <td className="w-[40px]">79%</td>
              <td className="flex-1">
                <Progress
                  value={79}
                  className=" bg-transparent border progressbar  "
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UtilizationRate;
