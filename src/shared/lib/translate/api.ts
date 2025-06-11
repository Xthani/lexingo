const LIBRE_TRANSLATE_API = 'https://libretranslate.de';

export interface TranslateRequest {
  q: string;
  source: string;
  target: string;
}

export interface TranslateResponse {
  translatedText: string;
}

export const translate = async (text: string, sourceLang: string, targetLang: string): Promise<string> => {
  try {
    const response = await fetch(`${LIBRE_TRANSLATE_API}/translate`, {
      method: 'POST',
      body: JSON.stringify({
        q: text,
        source: sourceLang,
        target: targetLang,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Translation failed');
    }

    const data: TranslateResponse = await response.json();
    return data.translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    throw error;
  }
}; 