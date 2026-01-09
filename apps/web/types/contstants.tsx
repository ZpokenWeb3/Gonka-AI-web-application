import { Bot, Thermometer, StickyNote, Info, FileText, Laptop, Lock, BanknoteArrowUp, PiggyBank, User, Wallet } from "lucide-react";
import React from "react";

export const HEADER_HEIGHT = 77;

export const CHATSETTINGS_DATA = (userData: any) => [
  {
    logo: <Bot color="#ffffff" />,
    title: 'Model',
    text: 'Model used for new conversations',
    version: userData?.defaultModel || 'Not set'
  },
  {
    logo: <Thermometer color="#ffffff" />,
    title: 'Temperature',
    text: 'Response creativity level',
    version: userData?.temperaure?.toString() || 'Not set'
  },
  {
    logo: <StickyNote color="#ffffff" />,
    title: 'System Prompt',
    text: 'Custom instructions for AI',
    version: userData?.systemPrompt || 'Not set'
  }
];

export const NOTIFICATIONS_DATA = (userData: any, onLowBalanceChange?: (enabled: boolean) => void, onDepositNotificationChange?: (enabled: boolean) => void) => [
    {
        logo: <PiggyBank color="#ffffff" />,
        title: 'Low Balance Alert',
        text: 'When balance falls below 5 GNK',
        switcher: userData?.lowBalanceAlert || false,
        initialSwitchState: userData?.lowBalanceAlert || false,
        onSwitchChange: onLowBalanceChange
    },
    {
        logo: <BanknoteArrowUp color="#ffffff" />,
        title: 'Deposit Notifications',
        text: 'When funds are received',
        switcher: userData?.depositNotifications || false,
        initialSwitchState: userData?.depositNotifications || false,
        onSwitchChange: onDepositNotificationChange
    },
];

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

export const getProfileData = (user?: any) => [
    {
        logo: <User color="#ffffff"/>,
        title: 'Display Name',
        text: 'Your public display name',
        version: user?.displayName || 'Not set'
    },
    {
        logo: <Wallet color="#ffffff"/>,
        title: 'Wallet Address',
        text: 'Your connected wallet',
        version: user?.walletAddress ? `${user.walletAddress.slice(0, 6)}...${user.walletAddress.slice(-4)}` : 'Not connected'
    },
    {
        logo: <Wallet color="#ffffff"/>,
        title: 'Chat Sessions',
        text: 'Total number of chats',
        version: user?._count?.chatSessions?.toString() || '0'
    },
    {
        logo: <Wallet color="#ffffff"/>,
        title: 'API Keys',
        text: 'Active API keys',
        version: user?._count?.apiKeys?.toString() || '0'
    }
]