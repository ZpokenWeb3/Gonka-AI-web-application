'use client'

import { useState } from "react"
import { Button } from "../ui/button"
import { TransactinBlock } from "./transaction-block"

export const TransactionHistory = () => {
  const [tab, setTab] = useState('all')

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between w-full">
        <h3 className="text-xl font-semibold text-white">
          Transactions history
        </h3>

        <div className="flex items-center gap-1">
          <Button
            variant={tab === 'all' ? 'secondary' : 'outline'}
            className="w-fit"
            onClick={() => setTab('all')}
          >
            All
          </Button>

          <Button
            variant={tab === 'deposits' ? 'secondary' : 'outline'}
            className="w-fit"
            onClick={() => setTab('deposits')}
          >
            Deposits
          </Button>

          <Button
            variant={tab === 'usage' ? 'secondary' : 'outline'}
            className="w-fit"
            onClick={() => setTab('usage')}
          >
            Usage
          </Button>
        </div>
      </div>

      <div className="flex flex-col rounded-[15px] border border-[#232328]">
        <TransactinBlock/>
        <TransactinBlock/>
        <TransactinBlock/>
        <TransactinBlock/>
      </div>
    </div>
  )
}
