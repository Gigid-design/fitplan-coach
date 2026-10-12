import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { LogOut, UsersRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Brand } from '@/components/fitplan/Brand';
import { supabase } from '@/integrations/supabase/client';
import { pageHead } from '@/lib/fitplan';
export const Route = createFileRoute('/_authenticated/app')({ head: () => pageHead('學員', '你的 FitPlan 學員頁。'), component: TrainerApp });
function TrainerApp() {
 const { user } = Route.useRouteContext(); const queryClient = useQueryClient(); const navigate = useNavigate();
 const [busy,setBusy] = useState(false); const [error,setError] = useState('');
 async function logout() { setBusy(true); setError(''); await queryClient.cancelQueries(); queryClient.clear(); const { error } = await supabase.auth.signOut(); if(error) { setError('登出失敗，請稍後再試。'); setBusy(false); return; } await navigate({to:'/auth',replace:true}); }
 return <><header className="site-header page-width border-b border-border"><Brand/><Button variant="outline" onClick={logout} disabled={busy}><LogOut/>{busy ? '登出中…' : '登出'}</Button></header><main className="app-main page-width fade-in"><h1>嗨，<span className="font-numeric">{user.email}</span></h1>{error && <p role="alert" className="mt-4 text-destructive">{error}</p>}<div className="empty-state"><div className="empty-icon"><UsersRound size={29}/></div><p>還沒有學員。下一步會在這裡新增學員、產生課表。</p></div></main></>;
}
