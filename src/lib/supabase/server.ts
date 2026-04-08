import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import CryptoJS from 'crypto-js'

export const createServer = () => {
  const cookieStore = cookies()
  
  return createPagesServerClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    options: {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: '', ...options })
        }
      }
    }
  })
}

export async function encryptData(data: string): Promise<string> {
  const secret = process.env.ENCRYPTION_SECRET;
  if (!secret) throw new Error('Missing encryption secret');
  return CryptoJS.AES.encrypt(data, secret).toString();
}

export async function decryptData(encryptedData: string): Promise<string> {
  const secret = process.env.ENCRYPTION_SECRET;
  if (!secret) throw new Error('Missing encryption secret');
  const bytes = CryptoJS.AES.decrypt(encryptedData, secret);
  return bytes.toString(CryptoJS.enc.Utf8);
}
