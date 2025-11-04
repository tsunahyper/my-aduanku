import React from 'react'

interface StatusProps {
  icon: React.ReactNode,
  numberOfRecords: number | null,
  totalRecords: string,
  percentageRecords: string | number | null,
  alt: string,
  statusColor: string
}

const StatusCard = ({ icon, numberOfRecords, totalRecords, percentageRecords, alt, statusColor }: StatusProps) => {
  const pctString = percentageRecords != null ? String(percentageRecords) : ''
  const hasPlus = pctString.includes('+')
  const hasMinus = pctString.includes('-')
  const percentageColor = hasPlus ? 'green' : hasMinus ? 'red' : 'yellow'

  const colorMap: Record<string, { bg: string; border: string }> = {
    red: { bg: 'bg-red-600', border: 'border-red-500' },
    blue: { bg: 'bg-blue-600', border: 'border-blue-500' },
    green: { bg: 'bg-green-600', border: 'border-green-500' },
    yellow: { bg: 'bg-yellow-600', border: 'border-yellow-500' },
    purple: { bg: 'bg-purple-600', border: 'border-purple-500' },
  }

  const pctMap: Record<'green' | 'red' | 'yellow', { box: string; text: string; border: string }> = {
    green: { box: 'bg-green-200', text: 'text-green-700', border: 'border-green-400' },
    red: { box: 'bg-red-200', text: 'text-red-700', border: 'border-red-400' },
    yellow: { box: 'bg-yellow-200', text: 'text-yellow-700', border: 'border-yellow-400' },
  }

  const colorClasses = colorMap[statusColor] || colorMap.red
  const pct = pctMap[percentageColor as keyof typeof pctMap]

  return (
    <div>
      <div className="h-[152px] flex flex-row gap-5 items-center border border-gray-300 bg-white rounded-md p-8 justify-center hover:bg-gray-100 cursor-pointer">
        <div className={`${colorClasses.border} rounded-md ${colorClasses.bg} p-1 w-11 h-11 flex items-center justify-center`} aria-label={alt}>
          {React.isValidElement(icon) ? icon : <div className="w-7 h-7 text-white">Icon</div>}
        </div>
        <div className="flex flex-col gap-1 items-center">
          <div className="text-3xl font-bold">
            {numberOfRecords ?? 0}
          </div>
          <div className="text-xs text-gray-500">
            {totalRecords}
          </div>
          {percentageRecords && pct && (
            <div className={`border ${pct.border} rounded-md ${pct.text} font-semibold text-xs ${pct.box} p-1`}>
              {percentageRecords}%
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default StatusCard