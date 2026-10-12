import { describe, expect, it, vi } from 'vitest';
import { coachPlan } from '@/lib/fitplan';
const { signUp, signInWithPassword } = vi.hoisted(() => ({ signUp: vi.fn(), signInWithPassword: vi.fn() }));
vi.mock('@/integrations/supabase/client', () => ({ supabase: { auth: { signUp, signInWithPassword } } }));
import { register, signIn } from '@/lib/auth-actions';
describe('FitPlan rules', () => {
 it('charges NT$399 per month', () => expect(coachPlan.monthlyPrice).toBe(399));
 it('has unlimited clients', () => expect(coachPlan.clientLimit).toBe(Infinity));
 it('offers free registration', () => expect(coachPlan.registrationPrice).toBe(0));
 it('requires confirmation without a signup session', async () => {
  signUp.mockResolvedValue({ data: { session: null }, error: null });
  expect(await register('user@example.com', 'test-password', 'https://example.com')).toEqual({ confirmed: false });
  expect(signUp).toHaveBeenCalledWith({ email: 'user@example.com', password: 'test-password', options: { emailRedirectTo: 'https://example.com' } });
 });
 it('redirects successful sign-in to /app', async () => {
  signInWithPassword.mockResolvedValue({ error: null });
  expect(await signIn('user@example.com', 'test-password')).toBe('/app');
 });
 it('rejects unsuccessful sign-in', async () => {
  signInWithPassword.mockResolvedValue({ error: new Error('invalid') });
  await expect(signIn('user@example.com', 'bad')).rejects.toThrow('invalid');
 });
});
