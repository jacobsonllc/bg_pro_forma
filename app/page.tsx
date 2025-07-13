import { DownloadCsvButton } from "@/components/DownloadCsvButton"

export default function Home() {
  return (
    <div>
      <h1>BG Pro Forma Dashboard</h1>
      <p>API endpoint available at /api/proforma</p>
      <DownloadCsvButton batchId="sample-batch-123" />
    </div>
  )
} 