import { AuthForm } from '@/components/fitplan/AuthForm';
import { pageHead } from '@/lib/fitplan';
import { usePageHead } from '@/lib/use-page-head';
const head = pageHead('登入', '登入 FitPlan，繼續你的教練日常。');
export function Login() { usePageHead(head); return <AuthForm mode="login"/>; }
