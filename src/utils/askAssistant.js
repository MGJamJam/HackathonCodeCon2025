// utils/openAiApi.js

const ASSISTANT_ID = 'asst_FB9K589h5aXzuS6XjbOA1vCi';

export async function askAssistant(prompt, threadId, apiKey) {
  // 1. Envia a mensagem
  await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'OpenAI-Beta': 'assistants=v2',
    },
    body: JSON.stringify({
      role: 'user',
      content: prompt,
    }),
  });

  // 2. Inicia execução
  const runRes = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs`, {
    method: 'POST',
    headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v2',
        'OpenAI-Organization': 'org-SMpdSMaAirjpuP16tY1VSRBk' // se aplicável
      },
    body: JSON.stringify({
      assistant_id: ASSISTANT_ID,
    }),
  });

  const runData = await runRes.json();

  // 3. Aguarda execução
  let status = runData.status;
  while (status !== 'completed' && status !== 'failed') {
    await new Promise((res) => setTimeout(res, 1000));
    const statusRes = await fetch(
      `https://api.openai.com/v1/threads/${threadId}/runs/${runData.id}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'OpenAI-Beta': 'assistants=v2',
        },
      }
    );
    const statusData = await statusRes.json();
    status = statusData.status;
  }

  // 4. Pega respostas
  const messagesRes = await fetch(
    `https://api.openai.com/v1/threads/${threadId}/messages`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'OpenAI-Beta': 'assistants=v2',
      },
    }
  );

  const messagesData = await messagesRes.json();
  const assistantMessages = messagesData.data.filter((m) => m.role === 'assistant');

  return assistantMessages[0].content[0]?.text?.value
}
