import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { crypto } from "https://deno.land/std@0.168.0/crypto/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const body = await req.json()
    const { order_number, amount, customer_name, customer_email, customer_phone } = body

    // DOKU Credentials from environment variables
    const clientId = Deno.env.get('DOKU_CLIENT_ID') || ''
    const secretKey = Deno.env.get('DOKU_SECRET_KEY') || ''
    const targetPath = '/checkout/v1/payment'
    const apiUrl = `https://api-sandbox.doku.com${targetPath}`

    // 1. Generate Request ID and Timestamp
    const requestId = crypto.randomUUID()
    const timestamp = new Date().toISOString().split('.')[0] + 'Z'

    // 2. Prepare DOKU Checkout Request Body
    const dokuPayload = {
      order: {
        invoice_number: order_number,
        amount: amount
      },
      payment: {
        payment_due_date: 60 // 60 minutes
      },
      customer: {
        name: customer_name,
        email: customer_email,
        phone: customer_phone
      }
    }

    // 3. Generate Digest
    const payloadString = JSON.stringify(dokuPayload)
    const encoder = new TextEncoder()
    const payloadBytes = encoder.encode(payloadString)
    const digestBuffer = await crypto.subtle.digest('SHA-256', payloadBytes)
    const digestArray = Array.from(new Uint8Array(digestBuffer))
    const digestBase64 = btoa(String.fromCharCode.apply(null, digestArray))

    // 4. Generate Signature
    const signatureComponent = `Client-Id:${clientId}\nRequest-Id:${requestId}\nRequest-Timestamp:${timestamp}\nRequest-Target:${targetPath}\nDigest:${digestBase64}`
    const keyBytes = encoder.encode(secretKey)
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyBytes,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    )
    const signatureBuffer = await crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(signatureComponent))
    const signatureArray = Array.from(new Uint8Array(signatureBuffer))
    const signatureBase64 = btoa(String.fromCharCode.apply(null, signatureArray))
    const finalSignature = `HMACSHA256=${signatureBase64}`

    // 5. Send Request to DOKU
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Client-Id': clientId,
        'Request-Id': requestId,
        'Request-Timestamp': timestamp,
        'Signature': finalSignature,
        'Content-Type': 'application/json'
      },
      body: payloadString
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('DOKU Error Response:', data)
      throw new Error(data.error?.message || 'Failed to create DOKU payment')
    }

    return new Response(
      JSON.stringify(data),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error: any) {
    console.error('Edge Function Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  }
})
