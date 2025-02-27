"use client"

import { useEffect } from "react"
import { subscribeToOrders, subscribeToInventory, subscribeToAnalytics } from "@/lib/api/websocket"
import { useToast } from "@/components/ui/use-toast"

export function useRealTimeOrders(callback: (data: any) => void) {
  const { toast } = useToast()

  useEffect(() => {
    const unsubscribe = subscribeToOrders((data) => {
      toast({
        title: "New Order",
        description: `Order #${data.id} received`,
      })
      callback(data)
    })

    return () => {
      unsubscribe()
    }
  }, [callback, toast])
}

export function useRealTimeInventory(callback: (data: any) => void) {
  const { toast } = useToast()

  useEffect(() => {
    const unsubscribe = subscribeToInventory((data) => {
      if (data.stock < 10) {
        toast({
          title: "Low Stock Alert",
          description: `${data.name} is running low on stock`,
          variant: "destructive",
        })
      }
      callback(data)
    })

    return () => {
      unsubscribe()
    }
  }, [callback, toast])
}

export function useRealTimeAnalytics(callback: (data: any) => void) {
  useEffect(() => {
    const unsubscribe = subscribeToAnalytics(callback)
    return () => {
      unsubscribe()
    }
  }, [callback])
}

