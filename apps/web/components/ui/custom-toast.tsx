'use client'

import { CheckCircle, XCircle } from 'lucide-react'

export type ToastStatus = 'success' | 'failed'

interface CustomToastProps {
  status: ToastStatus
  message: string
}

export const CustomToast = ({ status, message }: CustomToastProps) => {
  const isSuccess = status === 'success'

  return (
    <div
      className={`
        flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg
        backdrop-blur-sm
        ${isSuccess
          ? 'bg-[#131316] border border-green-500/20 text-green-400'
          : 'bg-[#131316] border border-red-500/20 text-red-400'
        }
      `}
    >
      {isSuccess ? (
        <CheckCircle className="w-5 h-5 flex-shrink-0" />
      ) : (
        <XCircle className="w-5 h-5 flex-shrink-0" />
      )}
      <p className="text-sm font-medium">{message}</p>
    </div>
  )
}

let toastTimeout: NodeJS.Timeout | null = null

export const showCustomToast = (status: ToastStatus, message: string) => {
  if (toastTimeout) {
    clearTimeout(toastTimeout)
  }

  const existingToast = document.getElementById('custom-toast')
  if (existingToast) {
    existingToast.remove()
  }

  const toast = document.createElement('div')
  toast.id = 'custom-toast'

  toast.className = `
    fixed top-4 left-1/2 -translate-x-1/2 z-150
    toast-enter
  `

  const isSuccess = status === 'success'

  toast.innerHTML = `
    <div class="
      flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg
      backdrop-blur-sm
      ${isSuccess
        ? 'bg-[#131316] border border-green-500/20 text-green-400'
        : 'bg-[#131316] border border-red-500/20 text-red-400'
      }
    ">
      ${
        isSuccess
          ? '<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'
          : '<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'
      }
      <p class="text-sm font-medium">${message}</p>
    </div>
  `

  document.body.appendChild(toast)

  toastTimeout = setTimeout(() => {
    toast.classList.remove('toast-enter')
    toast.classList.add('toast-exit')

    setTimeout(() => {
      toast.remove()
    }, 300)
  }, 3000)
}

if (typeof document !== 'undefined') {
  const styleId = 'custom-toast-styles'
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style')
    style.id = styleId
    style.innerHTML = `
      @keyframes toastEnter {
        from {
          opacity: 0;
          transform: translate(-50%, -16px);
        }
        to {
          opacity: 1;
          transform: translate(-50%, 0);
        }
      }

      @keyframes toastExit {
        from {
          opacity: 1;
          transform: translate(-50%, 0);
        }
        to {
          opacity: 0;
          transform: translate(-50%, -16px);
        }
      }

      .toast-enter {
        animation: toastEnter 0.3s ease-out forwards;
      }

      .toast-exit {
        animation: toastExit 0.3s ease-in forwards;
      }
    `
    document.head.appendChild(style)
  }
}
