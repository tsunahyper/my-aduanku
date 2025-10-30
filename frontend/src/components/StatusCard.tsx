import React from 'react'

interface StatusProps{
    icon: any,
    numberOfRecords: number,
    totalRecords: string,
    percentageRecords: string
}

const StatusCard = ({icon, numberOfRecords, totalRecords, percentageRecords}:StatusProps) => {
  return (
    <div>
        <div className="flex flex-row gap-4 items-center border border-gray-300 bg-white rounded-md p-8 justify-center">
          <div className="border border-blue-500 rounded-md bg-blue-600 p-1 w-12 h-12 flex items-center justify-center">
            <img className="h-8 w-8" src={icon} alt="warning-icon" />
          </div>
          <div className="flex flex-col gap-1 items-center">
            <div className="text-3xl font-bold">
              {numberOfRecords}
            </div>
            <div className="text-xs text-gray-500">
              {totalRecords}
            </div>
            <div className="border border-green-400 rounded-md text-green-700 font-semibold text-xs bg-green-200 p-1">
              {percentageRecords}%
            </div>
          </div>
        </div>
    </div>
  )
}

export default StatusCard