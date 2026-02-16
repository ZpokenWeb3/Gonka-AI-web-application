import { Bot, StickyNote, Thermometer } from "lucide-react";
import { SettingsBlock } from "./settings-block";
import { FC, ReactNode } from "react";

interface SettingsData {
    logo: ReactNode,
    title: string,
    text?: string
    version?: string
    switcher?: boolean
    onSwitchChange?: (enabled: boolean) => void
    initialSwitchState?: boolean
    onClick?: () => void
}

interface Props{
    data: SettingsData[]
}

export const SettingsSection:FC<Props> = ({data}) => {
    return (
        <div className="flex flex-col w-[600px] rounded-[15px] border border-[#232328]">
            {data.map((item, index) => (
                <SettingsBlock
                    key={index}
                    logo={item.logo}
                    title={item.title}
                    text={item.text}
                    version={item.version}
                    switcher={item.switcher}
                    onSwitchChange={item.onSwitchChange}
                    initialSwitchState={item.initialSwitchState}
                    onClick={item.onClick}
                />
            ))}

        </div>
    )
}