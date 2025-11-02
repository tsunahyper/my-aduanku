interface StatusProps {
  icon: any,
  numberOfRecords: number,
  totalRecords: string,
  percentageRecords: string,
  alt: string,
  statusColor: string
}

const StatusCard = ({ icon, numberOfRecords, totalRecords, percentageRecords, alt, statusColor }: StatusProps) => {

  const Icon = icon;
  const color = statusColor;
  const percentageColor = percentageRecords.includes('+') ? 'green' : percentageRecords.includes('-') ? 'red' : '';

  return (
    <div>
      <div className="h-[152px] flex flex-row gap-5 items-center border border-gray-300 bg-white rounded-md p-8 justify-center hover:bg-gray-100 cursor-pointer">
        <div className={`border border-${color}-500 rounded-md bg-${color}-600 p-1 w-11 h-11 flex items-center justify-center`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
        <div className="flex flex-col gap-1 items-center">
          <div className="text-3xl font-bold">
            {numberOfRecords}
          </div>
          <div className="text-xs text-gray-500">
            {totalRecords}
          </div>
          { percentageColor !== '' ? (
          <div className={`border border-${percentageColor}-400 rounded-md text-${percentageColor}-700 font-semibold text-xs bg-${percentageColor}-200 p-1`}>
            {percentageRecords}%
          </div>): null}
        </div>
      </div>
    </div>
  )
}

export default StatusCard