import { Bot, Thermometer, StickyNote, Info, FileText, Laptop, Lock, BanknoteArrowUp, PiggyBank, User, Wallet, MapPin, Moon, Globe } from "lucide-react";
import React from "react";

export const HEADER_HEIGHT = 77;

export const CHATSETTINGS_DATA = (userData: any) => [
  {
    logo: React.createElement(Bot, { color: "#ffffff" }),
    title: 'Model',
    text: 'Model used for new conversations',
    version: userData?.defaultModel || 'Not set'
  },
  {
    logo: React.createElement(Thermometer, { color: "#ffffff" }),
    title: 'Temperature',
    text: 'Response creativity level',
    version: userData?.temperaure?.toString() || 'Not set'
  },
  {
    logo: React.createElement(StickyNote, { color: "#ffffff" }),
    title: 'System Prompt',
    text: 'Custom instructions for AI',
    version: userData?.systemPrompt || 'Not set'
  }
];

export const ACCOUNT_DATA = (userData: any) => [
  {
    logo: React.createElement(Wallet, { color: "#ffffff" }),
    title: 'Connected Wallet',
    text: 'MetaMask • Ethereum',
    version: userData?.systemPrompt || 'Not set'
  },
  {
    logo: React.createElement(MapPin, { color: "#ffffff" }),
    title: 'Deposit Address',
    text: 'Gonka chain deposit address',
    version: userData?.systemPrompt || 'Not set'
  },
  {
    logo: React.createElement(Lock, { color: "#ffffff" }),
    title: 'Encryption Key',
    text: 'Derived from wallet signature',
    version: userData?.systemPrompt || 'Not set'
  }
];

export const ACCOUNT_PREFERENCES_DATA = (userData: any) => [
  {
    logo: React.createElement(Bot, { color: "#ffffff" }),
    title: 'Default Model',
    text: 'Used for new chats',
    version: userData?.systemPrompt || 'Not set'
  },
  {
    logo: React.createElement(Moon, { color: "#ffffff" }),
    title: 'Theme',
    text: 'Appearance settings',
    version: userData?.systemPrompt || 'Not set'
  },
  {
    logo: React.createElement(Globe, { color: "#ffffff" }),
    title: 'Language',
    text: 'Interface language',
    version: userData?.systemPrompt || 'Not set'
  }
];

export const NOTIFICATIONS_DATA = (userData: any, onLowBalanceChange?: (enabled: boolean) => void, onDepositNotificationChange?: (enabled: boolean) => void) => [
    {
        logo: React.createElement(PiggyBank, { color: "#ffffff" }),
        title: 'Low Balance Alert',
        text: 'When balance falls below 5 GNK',
        switcher: userData?.lowBalanceAlert || false,
        initialSwitchState: userData?.lowBalanceAlert || false,
        onSwitchChange: onLowBalanceChange
    },
    {
        logo: React.createElement(BanknoteArrowUp, { color: "#ffffff" }),
        title: 'Deposit Notifications',
        text: 'When funds are received',
        switcher: userData?.depositNotifications || false,
        initialSwitchState: userData?.depositNotifications || false,
        onSwitchChange: onDepositNotificationChange
    },
];

export const ABOUT_DATA = [
    {
        logo: React.createElement(Info, { color: "#ffffff" }),
        title: 'Version',
        version: '1.0.0'
    },
    {
        logo: React.createElement(FileText, { color: "#ffffff" }),
        title: 'Terms of Service',
    },
    {
        logo: React.createElement(Lock, { color: "#ffffff" }),
        title: 'Privacy Policy',
    },
    {
        logo: React.createElement(Laptop, { color: "#ffffff" }),
        title: 'Open Source',
    },

]
