const API_URL = 'https://api.anthropic.com/v1/messages';

/**
 * Generates a news article using Claude claude-sonnet-4-6.
 * @param {object} params
 * @param {string} params.title      - Article title
 * @param {string} params.city       - User's city
 * @param {string} params.country    - User's country
 * @param {string} params.tag        - Article tag/category
 * @param {string} [params.keywords] - Optional keywords/notes
 * @returns {Promise<string>}        - Generated article text
 */
export async function generateArticle({ title, city, country, tag, keywords = '' }) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: `Sen migrant ishchilar uchun yangiliklar muxbirisiz. O'zbek tilida, neytral va ishonchli ohangda, 70-110 so'zlik qisqa yangilik maqolasi yoz.
Sarlavha: "${title}"
Hudud: ${city}, ${country}
Toifa: ${tag}
Foydalanuvchi kalit so'zlari/izohi: "${keywords || "yo'q"}"
Faqat maqola matnini yoz, sarlavha yoki qo'shimcha izohsiz. Aniq raqam yoki sana o'ylab topma, faqat foydalanuvchi bergan ma'lumotga tayan, umumiy ehtiyotkor uslubda yoz.`,
        },
      ],
    }),
  });

  if (!response.ok) throw new Error(`API error: ${response.status}`);

  const data = await response.json();
  const text = (data.content || [])
    .map((b) => b.text || '')
    .join('\n')
    .trim();

  if (!text) throw new Error('Empty response from AI');
  return text;
}
