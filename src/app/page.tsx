"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent
} from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { useDescriptions } from "@/hooks/useDescriptions"
import { useTypes } from "@/hooks/useTypes"
import { useTranslation } from "@/hooks/useTranslation"
import colorMap from "./colorMap"

const STORAGE_KEY = "selectedTypes"

export default function ToggleButtons() {
  const [selected, setSelected] = useState<string[]>([])
  const [showDialog, setShowDialog] = useState(false)

  const t = useTranslation()
  const d = useDescriptions()
  const typeList = useTypes()

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) setSelected(parsed)
      } catch {
        console.error("Failed to parse stored types")
      }
    }
  }, [])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selected))
  }, [selected])

  const handleToggle = (key: string) => {
    if (selected.includes(key)) {
      setSelected(selected.filter(k => k !== key))
    } else if (selected.length < 3) {
      setSelected([...selected, key])
    } else {
      toast.error(t.tooMany)
    }
  }

  const handleSubmit = () => {
    if (selected.length === 3) {
      setShowDialog(true)
    } else {
      toast.error(t.needThree)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 px-4 bg-background text-black dark:text-white transition-colors duration-300">
      {/* Selection Buttons */}
      <div className="flex flex-wrap justify-center gap-6">
        {typeList.map(({ key, label }) => {
          const index = selected.indexOf(key)
          const isSelected = index !== -1
          const order = isSelected ? index + 1 : null
          const { base, hover } = colorMap[key]

          const colorClass = isSelected
            ? `text-black dark:text-white ${base} ${hover}`
            : `bg-transparent border border-muted text-black dark:text-muted-foreground ${hover}`

          return (
            <Tooltip key={key}>
              <TooltipTrigger asChild>
                <Button
                  className={`relative px-4 py-2 text-2xl h-20 w-20 transition-colors duration-200 ease-in-out ${colorClass}`}
                  onClick={() => handleToggle(key)}
                >
                  {key}
                  {order && (
                    <span className="absolute top-1 right-1 w-5 h-5 text-xs rounded-full flex items-center justify-center bg-black text-white dark:bg-white dark:text-black">
                      {order}
                    </span>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="dark:text-black text-white">{label}</p>
              </TooltipContent>
            </Tooltip>
          )
        })}
      </div>

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        disabled={selected.length !== 3}
        className={`px-6 py-3 text-lg font-semibold ${selected.length === 3
            ? "bg-primary dark:text-primary-foreground hover:bg-primary/80"
            : "bg-muted dark:text-muted-foreground cursor-not-allowed"
          }`}
      >
        {t.submit}
      </Button>

      {/* Results Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="w-full max-h-[90vh] overflow-y-auto p-6 rounded-2xl shadow-2xl bg-background text-black dark:text-white transition-colors sm:max-w-[600px] md:max-w-[80vw] xl:max-w-[90vw] mx-auto">
          <DialogHeader>
            <DialogTitle className="text-4xl font-semibold text-center py-6">
              {t.dialogTitle}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
            {selected.map((key, index) => {
              const { base } = colorMap[key]
              const data = d[key]

              return (
                <div
                  key={key}
                  className={`min-h-[300px] p-6 rounded-xl shadow-xl ${base} text-white flex flex-col items-start justify-start transition-colors`}
                >
                  <h3 className="text-3xl font-bold mb-4">
                    {index + 1}. {typeList.find(t => t.key === key)?.label}
                  </h3>
                  <div className="space-y-4 text-lg leading-relaxed">
                    <div>
                      <h4 className="font-bold text-xl mb-1">{t.labels.environment}</h4>
                      <p>{data.environment}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-1">{t.labels.examples}</h4>
                      <p>{data.examples}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-1">{t.labels.traits}</h4>
                      <p>{data.traits}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
