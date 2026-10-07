// Server-side model adapter. Secrets stay in Edge Function env, never in VITE_*.
// INTAKE_MODEL_API_KEY — optional. When absent, the function tells the client to use the labeled demo adapter.
// INTAKE_MODEL_URL — optional chat-completions endpoint. Defaults to OpenAI.
import 'jsr:@supabase/functions-js/edge-runtime.d.ts'

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: cors })
  const key = Deno.env.get('INTAKE_MODEL_API_KEY')
  if (!key) {
    return Response.json({ mode: 'demo' }, { headers: cors })
  }

  const body = await request.json()
  const endpoint = Deno.env.get('INTAKE_MODEL_URL') ?? 'https://api.openai.com/v1/chat/completions'
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: Deno.env.get('INTAKE_MODEL_NAME') ?? 'gpt-4o-mini',
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content:
            'You are Thornvine’s project partner for Stage 1 only. Return JSON with message, fields[{key,status,value}], widget or null, readyForReview, gaps. Widget type must be text, chips, cards, investment, timing, contact, summary, or boundaries. Do not approve a project or unlock a stage. One question. No HTML.',
        },
        { role: 'user', content: JSON.stringify(body) },
      ],
    }),
  })
  if (!response.ok) {
    return Response.json({ mode: 'demo', error: 'model_failed' }, { status: 502, headers: cors })
  }
  const payload = await response.json()
  const text = payload?.choices?.[0]?.message?.content
  try {
    const proposal = JSON.parse(text)
    proposal.mode = 'model'
    return Response.json({ mode: 'model', proposal }, { headers: cors })
  } catch {
    return Response.json({ mode: 'demo', error: 'model_invalid' }, { status: 502, headers: cors })
  }
})
