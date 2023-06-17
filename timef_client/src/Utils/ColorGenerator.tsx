const Blues = ["#06b6d4", "#0ea5e9", "#0284c", "#60a5fa","#22d3ee"]
const Reds  = ["#f87171", "#ef4444", "#dc2626","#bd3d43", "#d74545", "#e11d48"]
const Greens  = ["0d9488", "#10b981", "#22c55e","#4ade80", "#88b91b", "#a8c919", "#d8fe6a", "#e9ff74" ]
const Oranges = ["#ea580c", "#f97316", "#fb923c","#f59e0b", "#ffc780", "#f9d684"]
const Yellows = ["#fde047", "#facc15", "#eab308","#fffa85"]

const Colors= [Blues, Reds, Greens, Oranges, Yellows]

// Generates a random color from above
export const GenerateRanColor = () => {
    const ColorType = Colors[(
        Math.floor(Math.random() * Colors.length)
    )]

    return ColorType[(
        Math.floor(Math.random() * ColorType.length)
    )]
}