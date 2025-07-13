import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface DownloadCsvButtonProps {
  batchId: string
}

export function DownloadCsvButton({ batchId }: DownloadCsvButtonProps) {
  const handleDownload = () => {
    const url = `/api/proforma/download?id=${batchId}`
    window.open(url, "_blank")
  }

  return (
    <Button onClick={handleDownload} className="flex gap-2">
      <Download size={16} />
      Download CSV
    </Button>
  )
} 