import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router';
import { ArrowRight, Eye, EyeOff, MailCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { register, signIn, authError } from '@/lib/auth-actions';
import { Brand, Footer } from './Brand';
import { useFitPlanAuth } from './AuthContext';
export function AuthForm({ mode }: { mode: 'signup' | 'login' }) {
 const signup = mode === 'signup';
 const navigate = useNavigate();
 const { user } = useFitPlanAuth();
 const [email, setEmail] = useState(''); const [password, setPassword] = useState('');
 const [showPassword, setShowPassword] = useState(false); const [busy, setBusy] = useState(false);
 const [error, setError] = useState(''); const [sent, setSent] = useState(false);
 async function submit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault(); setBusy(true); setError('');
  try {
   if (signup) { const result = await register(email.trim(), password, window.location.origin); if (result.confirmed) await navigate('/app'); else setSent(true); }
   else { const destination = await signIn(email.trim(), password); await navigate(destination); }
  } catch (err) { setError(authError(err)); } finally { setBusy(false); }
 }
 return <><header className="site-header page-width"><Brand /><Link to="/" className="text-sm text-secondary">回到首頁 <span aria-hidden="true">↗</span></Link></header>
 <main className="auth-main fade-in"><div className="auth-heading"><h1>{sent ? '確認信已寄出' : signup ? '開始你的 FitPlan' : '歡迎回來'}</h1><p>{sent ? '只差一步，就能開始。' : signup ? '把排課表的時間，留給學員。' : '登入，繼續你的教練日常。'}</p></div>
 <div className="auth-card">{sent ? <div className="text-center"><MailCheck className="mx-auto mb-5 text-secondary" size={40}/><p className="status-message">請到 <span className="break-all font-numeric">{email}</span> 收取確認信，點擊信中的連結完成註冊，再登入。</p><Button className="mt-6 w-full" asChild><Link to="/login">前往登入<ArrowRight /></Link></Button></div> : user ? <div className="text-center"><p className="status-message">你已經登入 FitPlan。</p><Button asChild className="mt-5 w-full"><Link to="/app">進入學員頁<ArrowRight /></Link></Button></div> : <form className="auth-form" onSubmit={submit}>
 <div><label className="field-label" htmlFor="email">電子郵件</label><input className="auth-input font-numeric" id="email" type="email" autoComplete="email" placeholder="user@example.com" value={email} onChange={e=>setEmail(e.target.value)} required disabled={busy}/></div>
 <div><label className="field-label" htmlFor="password">密碼</label><div className="password-field"><input className="auth-input" id="password" type={showPassword ? 'text' : 'password'} autoComplete={signup ? 'new-password' : 'current-password'} placeholder={signup ? '至少 8 個字元' : '輸入你的密碼'} minLength={signup ? 8 : undefined} value={password} onChange={e=>setPassword(e.target.value)} required disabled={busy}/><Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1" aria-label={showPassword ? '隱藏密碼' : '顯示密碼'} onClick={()=>setShowPassword(!showPassword)}>{showPassword ? <EyeOff/> : <Eye/>}</Button></div></div>
 {error && <p role="alert" className="status-message text-destructive">{error}</p>}<Button type="submit" className="h-12 w-full" disabled={busy}>{busy ? '處理中…' : signup ? '免費註冊' : '登入'}{!busy && <ArrowRight/>}</Button>
 </form>}
 {!sent && !user && <p className="auth-switch">{signup ? '已經有帳號？' : '還沒有帳號？'} <Link className="text-secondary underline underline-offset-4" to={signup ? '/login' : '/signup'}>{signup ? '登入' : '免費註冊'}</Link></p>}</div>{signup && !sent && <p className="plan-note mt-5">註冊免費。開始寄課表給學員時再付。</p>}</main><Footer/></>;
}
