"use client"

import { useEffect, useState } from "react"
import { getSocketStatus } from "@/lib/api/websocket"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"

export function ConnectionStatus() {
  const [status, setStatus] = useState<"connected" | "disconnected" | "connecting">("disconnected")

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(getSocketStatus())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center gap-2">
      <Badge
        variant={status === "connected" ? "default" : status === "connecting" ? "outline" : "destructive"}
        className="h-6"
      >
        {status === "connecting" && <Loader2 className="h-3 w-3 animate-spin mr-1" />}
        {status === "connected" ? "Live" : status === "connecting" ? "Connecting" : "Offline"}
      </Badge>
    </div>
  )
}

