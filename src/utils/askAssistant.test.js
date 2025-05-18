import { describe, it, expect, vi, beforeEach } from 'vitest'
import { askAssistant } from './askAssistant'

global.fetch = vi.fn()

describe('askAssistant', () => {
  const threadId = 'test-thread-id'
  const apiKey = 'test-api-key'
  const prompt = 'Olá, tudo bem?'

  const mockFetch = fetch

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('deve enviar a mensagem, criar a run, aguardar execução e retornar a resposta do assistant', async () => {
    
    mockFetch
      .mockResolvedValueOnce({ ok: true, json: async () => ({}) })

    
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: 'run-id-123',
          status: 'queued',
        }),
      })

    
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ status: 'completed' }),
      })

      
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          data: [
            {
              role: 'assistant',
              content: [
                { text: { value: 'Resposta gerada pelo Assistant' } },
              ],
            },
          ],
        }),
      })

    const resposta = await askAssistant(prompt, threadId, apiKey)

    expect(resposta).toBe('Resposta gerada pelo Assistant')
    expect(fetch).toHaveBeenCalledTimes(4)

    expect(fetch).toHaveBeenCalledWith(
      `https://api.openai.com/v1/threads/${threadId}/messages`,
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ role: 'user', content: prompt }),
      })
    )
  })

})
