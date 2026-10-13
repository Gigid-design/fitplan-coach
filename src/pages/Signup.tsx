import { AuthForm } from '@/components/fitplan/AuthForm';
import { pageHead } from '@/lib/fitplan';
import { usePageHead } from '@/lib/use-page-head';
const head = pageHead('免費註冊', '免費註冊 FitPlan。把排課表的時間，留給學員。');
export function Signup() { usePageHead(head); return <AuthForm mode="signup"/>; }
