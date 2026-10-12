import { supabase } from '@/integrations/supabase/client';
export async function register(email: string, password: string, origin: string) {
  const { data, error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: origin } });
  if (error) throw error;
  return { confirmed: data.session !== null };
}
export async function signIn(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return '/app' as const;
}
export function authError(error: unknown) {
  const code = error && typeof error === 'object' && 'code' in error ? error.code : '';
  const message = error instanceof Error ? error.message : '';
  if (code === 'email_address_invalid' || message.includes('This email address is not allowed')) return '請使用可收信的電子郵件地址，不可使用範例信箱。';
  if (code === 'invalid_credentials') return '電子郵件或密碼不正確，請再試一次。';
  if (code === 'email_not_confirmed') return '請先點擊電子郵件中的確認連結，再登入。';
  if (code === 'user_already_exists') return '這個電子郵件已註冊，請前往登入。';
  if (code === 'over_email_send_rate_limit' || code === 'over_request_rate_limit') return '操作次數過多，請稍後再試。';
  if (code === 'weak_password') return '密碼強度不足，請使用至少 8 個字元。';
  return '目前無法完成操作，請稍後再試。';
}
