import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';
import { isBase44Host } from '@/lib/apiOrigin';

const { appId, token, functionsVersion, appBaseUrl } = appParams;

// Base44 alanında aynı origin'e (göreli /api) istek atılır.
// Harici hosting'de serverUrl verilmez: SDK kendi üretim API adresini (https://base44.app) kullanır.
// appBaseUrl API değil, giriş/çıkış yönlendirmelerinin adresidir.
const serverUrl = isBase44Host ? '' : undefined;

export const base44 = createClient({
  appId,
  token,
  functionsVersion,
  serverUrl,
  appBaseUrl
});