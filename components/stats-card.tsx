"use client"

import type React from "react"

interface StatsCardProps {
  title: string
  value: string | number
  description?: string
  icon?: React.ReactNode
  variant?: "default" | "accent" | "secondary"
}

export default function StatsCard({ title, value, description, icon, variant = "default" }: StatsCardProps) {
  const bgVariants = {
    default: "bg-gradient-to-br from-card to-card/50 border-border/50",
    accent: "bg-gradient-to-br from-accent/15 to-accent/5 border-accent/30",
    secondary: "bg-gradient-to-br from-secondary/15 to-secondary/5 border-secondary/30",
  }

  const textVariants = {
    default: "text-foreground",
    accent: "text-accent",
    secondary: "text-secondary",
  }

  return (
    <div
      className={`${bgVariants[variant]} border rounded-xl p-5 space-y-3 transition-all duration-300 hover:shadow-lg hover:shadow-primary/15 backdrop-blur-sm group`}
    >
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">{title}</p>
        {icon && <div className="text-lg opacity-70 group-hover:scale-110 transition-transform">{icon}</div>}
      </div>
      <div>
        <p className={`text-3xl font-bold ${textVariants[variant]}`}>{value}</p>
        {description && <p className="text-xs text-muted-foreground mt-2">{description}</p>}
      </div>
    </div>
  )
}
