import { createClient } from "@supabase/supabase-js"
import { NextRequest } from "next/server"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    let query = supabase
      .from('proforma_batches')
      .select('csv_blob')

    if (id) {
      // Fetch specific row by ID
      query = query.eq('id', id)
    } else {
      // Fetch latest row
      query = query.order('created_at', { ascending: false }).limit(1)
    }

    const { data, error } = await query.single()

    if (error) {
      console.error('Database error:', error)
      return new Response('CSV not found', { status: 404 })
    }

    if (!data || !data.csv_blob) {
      return new Response('No CSV data available', { status: 404 })
    }

    // Return CSV with proper headers for download
    return new Response(data.csv_blob, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="proforma.csv"',
        'Cache-Control': 'no-cache'
      }
    })

  } catch (error) {
    console.error('Download error:', error)
    return new Response('Internal server error', { status: 500 })
  }
} 