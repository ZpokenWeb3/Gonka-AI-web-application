import { Bot, Thermometer, StickyNote, Info, FileText, Laptop, Lock, BanknoteArrowUp, PiggyBank } from "lucide-react";
import React from "react";

export const HEADER_HEIGHT = 77;

export const CHATSETTINGS_DATA = [
    {
        logo: <Bot color="#ffffff"/>,
        title: 'Model',
        text: 'Model used for new conversations',
        version: 'GPT-4'
    },
    {
        logo: <Thermometer color="#ffffff"/>,
        title: 'Temperature',
        text: 'Response creativity level',
        version: '0.7'
    },
    {
        logo: <StickyNote color="#ffffff"/>,
        title: 'System Prompt',
        text: 'Custom instructions for AI',
        version: 'Not set'
    }

]

export const NOTIFICATIONS_DATA = [
    {
        logo: <PiggyBank color="#ffffff"/>,
        title: 'Low Balance Alert',
        text: 'When balance falls below 5 GNK',
        switcher: true
    },
    {
        logo: <BanknoteArrowUp color="#ffffff"/>,
        title: 'Deposit Notifications',
        text: 'When funds are received',
        switcher: true
    },
]

export const ABOUT_DATA = [
    {
        logo: <Info color="#ffffff"/>,
        title: 'Version',
        version: '1.0.0'
    },
    {
        logo: <FileText color="#ffffff"/>,
        title: 'Terms of Service',
    },
    {
        logo: <Lock color="#ffffff"/>,
        title: 'Privacy Policy',
    },
    {
        logo: <Laptop color="#ffffff"/>,
        title: 'Open Source',
    },

]