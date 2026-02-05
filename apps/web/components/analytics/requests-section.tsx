import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
    { day: "Monday", requests: 250 },
    { day: "Tuesday", requests: 320 },
    { day: "Wednesday", requests: 280 },
    { day: "Thursday", requests: 350 },
    { day: "Friday", requests: 400 },
    { day: "Saturday", requests: 180 },
    { day: "Sunday", requests: 150 }
]

export const RequestsSection = () => {
    return (
        <div className="flex flex-col gap-4 md:p-4 p-3 rounded-lg border border-[#232328]">
            <h3 className="text-lg text-white">Requests Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <defs>
                        <linearGradient id="purpleFade" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#6b26d9" stopOpacity={1} />
                            <stop offset="100%" stopColor="#6b26d9" stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                        dataKey="day" 
                        stroke="#9CA3AF"
                        tick={{ fill: "#9CA3AF" }}
                    />
                    <YAxis 
                        stroke="#9CA3AF"
                        tick={{ fill: "#9CA3AF" }}
                        domain={[100, 400]}
                        ticks={[100, 200, 300, 400]}
                    />
                    <Tooltip 
                        contentStyle={{ 
                            backgroundColor: "#1a1a1d", 
                            border: "1px solid #374151",
                            borderRadius: "8px"
                        }}
                        labelStyle={{ color: "#F3F4F6" }}
                        itemStyle={{ color: "#6b26d9" }}
                    />

                    <Bar 
                        dataKey="requests" 
                        fill="url(#purpleFade)"
                        radius={[8, 8, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
