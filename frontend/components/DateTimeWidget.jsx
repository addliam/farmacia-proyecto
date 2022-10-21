import Clock from 'react-live-clock'

const DateTimeWidget = () => {
    const serverDate = new Date()
    const isMorning = (serverDate.getHours() <=17 && serverDate.getHours() >= 7 )

    return (
      <div className='flex flex-col'>
        <div className="greeting">
            {
                isMorning?(
                    <div className="flex flex-row justify-end gap-[10px]">
                    <div className='w-[18px] block h-[18px] bg-[#FED600] rounded-full ' />
                    <span className="text-[14px] font-semibold text-blackDark leading-[24px] ">Good morning</span>
                  </div>
                ):(
                    <div className="flex flex-row justify-end gap-[10px]">
                    <div className="moon relative">
                        <div className="w-[13px] h-[13px] bg-white rounded-full absolute z-10 -top-[1px] right-[7px] "/>
                        <div className='w-[18px] h-[18px] bg-[#180273] rounded-full z-0' />
                    </div>
                    <span className="text-[14px] font-semibold text-blackDark leading-[24px] ">Good night</span>
                  </div>
                )
            }
        </div>
        <div className="flex flex-row justify-between">
            <span className="text-blackDark text-[12px] font-medium ">
                {serverDate.toLocaleDateString()}
            </span>
            <span className="text-blackDark text-[12px] font-medium ml-4 ">
                <Clock format={'h:mm:ssa'} ticking={true} />                
            </span>
        </div>
      </div>
    )
}
export default DateTimeWidget