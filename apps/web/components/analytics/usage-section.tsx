export const UsageSection = () => {
    return (
        <div className="flex flex-col gap-4 md:p-4 p-3 rounded-lg border border-[#232328]">
            <h3 className="text-lg text-white">Usage By Model</h3>
            <div className="flex flex-col gap-2">
                <div className="w-full  overflow-hidden">
                    <table className="w-full">
                        <tbody>
                            <tr className="border-b border-[#232328]">
                                <td className="md:p-3 p-2 lg:w-[200px] w-[100px] text-white">ChatGPT</td>
                                <td className="md:p-3 p-2 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-20 h-[20px] w-full rounded-sm border border-[#232328] relative overflow-hidden">
                                            <div className="h-full bg-[#6b26d9]" style={{width: '60%'}}></div>
                                        </div>
                                        <span className="text-white text-sm">60%</span>
                                    </div>
                                </td>
                                <td className="md:p-3 p-2 lg:w-[200px] w-[100px] text-center text-white">812 req</td>
                            </tr>
                            <tr className="border-b  border-[#232328]">
                                <td className="md:p-3 p-2 lg:w-[200px] w-[100px] text-white">Claude</td>
                                <td className="md:p-3 p-2 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-20 h-[20px] w-full rounded-sm border border-[#232328] relative overflow-hidden">
                                            <div className="h-full bg-[#6b26d9]" style={{width: '25%'}}></div>
                                        </div>
                                        <span className="text-white text-sm">25%</span>
                                    </div>
                                </td>
                                <td className="md:p-3 p-2 lg:w-[200px] w-[100px] text-center text-white">812 req</td>
                            </tr>
                            <tr>
                                <td className="md:p-3 p-2 lg:w-[200px] w-[100px] text-white">RedHat</td>
                                <td className="md:p-3 p-2 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-20 h-[20px] w-full rounded-sm border border-[#232328] relative overflow-hidden">
                                            <div className="h-full bg-[#6b26d9]" style={{width: '15%'}}></div>
                                        </div>
                                        <span className="text-white text-sm">15%</span>
                                    </div>
                                </td>
                                <td className="md:p-3 p-2 lg:w-[200px] w-[100px] text-center text-white">812 req</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}