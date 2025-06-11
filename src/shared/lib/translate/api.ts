const LIBRE_TRANSLATE_API = 'https://libretranslate.de';

export interface TranslateRequest {
  q: string;
  source: string;
  target: string;
}

export interface TranslateResponse {
  translatedText: string;
}

export interface TranslationResult {
  translatedText: string;
  detectedLanguage: string;
  sourceLanguage: string;
  targetLanguage: string;
}

export async function freeTranslateText(
  text: string,
  targetLanguage: string = "en",
  sourceLanguage: string = "auto"
): Promise<TranslationResult> {
  try {
    const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLanguage}&tl=${targetLanguage}&dt=t&q=${text}`)
    const data = await res.json();
    const translatedText = data[0][0][0];
    const detectedLanguage = data[0][2];

    return {
      translatedText,
      detectedLanguage,
      sourceLanguage: sourceLanguage === "auto" ? detectedLanguage : sourceLanguage,
      targetLanguage
    };
  } catch {
    // второй способ
    const res = await fetch(`https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=${sourceLanguage}&tl=${targetLanguage}&q=${text}`)
    const data = await res.json();
    const translatedText = data[0][0];
    const detectedLanguage = data[0][1];

    return {
      translatedText,
      detectedLanguage,
      sourceLanguage: sourceLanguage === "auto" ? detectedLanguage : sourceLanguage,
      targetLanguage
    };
  }
}

export const translate = async (text: string, sourceLang: string, targetLang: string): Promise<string> => {
  const result = await freeTranslateText(text, targetLang, sourceLang);
  return result.translatedText;
}; 