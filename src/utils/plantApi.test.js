// identifyPlant.test.js
import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mocka o import.meta.env ANTES de importar o módulo testado
vi.stubGlobal('import.meta', {
  env: {
    VITE_API_KEY: 'fake-api-key',
  },
})

import identifyPlant from './plantApi'

global.fetch = vi.fn()

describe('identifyPlant', () => {
  const mockImageBase64 = 'data:image/png;base64,fakebase64string'
  const apiUrl = 'https://plant.id/api/v3/identification'

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('deve lançar erro se a resposta não for ok', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    })

    await expect(
      identifyPlant({ imageBase64: mockImageBase64 })
    ).rejects.toThrow('Erro na requisição: 500')
  })
})
