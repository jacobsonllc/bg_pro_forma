/**
 * POST /api/proforma
 * Body: { forecast: any; csv: string }
 *
 * 1. Validate with Zod
 * 2. Insert into Supabase table "proforma_batches"
 *    columns: id (uuid default), payload (jsonb), csv_blob (text)
 * 3. Return 201 { id }
 */

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { z } from "zod"

const schema = z.object({
  forecast: z.any(),
  csv: z.string().min(1),
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  const json = await req.json()
  const parsed = schema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const { error, data } = await supabase
    .from("proforma_batches")
    .insert({
      payload: parsed.data.forecast,
      csv_blob: parsed.data.csv,
    })
    .select("id")
    .single()

  if (error) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ id: data.id }, { status: 201 })
} 