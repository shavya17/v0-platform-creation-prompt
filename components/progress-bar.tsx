interface ProgressBarProps {
  percentage: number
}

export default function ProgressBar({ percentage }: ProgressBarProps) {
  return (
    <div className="w-full bg-border/50 rounded-full h-3 overflow-hidden">
      <div
        className="bg-gradient-to-r from-primary via-accent to-secondary h-3 transition-all duration-700 ease-out shadow-lg shadow-primary/50"
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}
