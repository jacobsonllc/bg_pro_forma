# BG Pro Forma Dashboard

A Next.js application with an API endpoint for receiving pro forma forecast data from n8n workflows.

## API Endpoint

### POST /api/proforma

Receives forecast data and CSV content from the n8n workflow and stores it in Supabase.

**Request Body:**
```json
{
  "forecast": {
    "monthlyData": [...],
    "periodSummaries": [...],
    "businessAssumptions": {...}
  },
  "csv": "Metric,Scenario,Trailing 12M,Year 1..."
}
```

**Response:**
- `201 Created`: Returns `{ id: "uuid" }`
- `400 Bad Request`: Validation error
- `500 Internal Server Error`: Database error

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment variables:**
   Create a `.env.local` file with:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

3. **Supabase table setup:**
   Create a table named `proforma_batches` with columns:
   - `id` (uuid, primary key, default: gen_random_uuid())
   - `payload` (jsonb)
   - `csv_blob` (text)
   - `created_at` (timestamp with time zone, default: now())

4. **Run the development server:**
   ```bash
   npm run dev
   ```

## Usage

The API endpoint is designed to receive data from the n8n workflow's "Send to Dashboard" node, which sends POST requests to `https://dash-api.my-domain.com/api/proforma`.

## Development

- **Framework**: Next.js 14 with App Router
- **Database**: Supabase
- **Validation**: Zod
- **Language**: TypeScript 