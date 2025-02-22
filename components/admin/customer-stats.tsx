"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Jan", newCustomers: 400, activeCustomers: 240 },
  { name: "Feb", newCustomers: 300, activeCustomers: 139 },
  { name: "Mar", newCustomers: 200, activeCustomers: 980 },
  { name: "Apr", newCustomers: 278, activeCustomers: 390 },
  { name: "May", newCustomers: 189, activeCustomers: 480 },
  { name: "Jun", newCustomers: 239, activeCustomers: 380 },
]

export function CustomerStats() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="newCustomers" stroke="#8884d8" name="New Customers" />
        <Line type="monotone" dataKey="activeCustomers" stroke="#82ca9d" name="Active Customers" />
      </LineChart>
    </ResponsiveContainer>
  )
}

