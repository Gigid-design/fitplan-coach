import { createFileRoute } from '@tanstack/react-router';
import { AuthForm } from '@/components/fitplan/AuthForm';
import { pageHead } from '@/lib/fitplan';
export const Route = createFileRoute('/login')({ head: () => pageHead('登入', '登入 FitPlan，繼續你的教練日常。'), component: Login });
function Login() { return <AuthForm mode="login"/>; }
