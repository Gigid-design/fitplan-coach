import { createFileRoute } from '@tanstack/react-router';
import { AuthForm } from '@/components/fitplan/AuthForm';
import { pageHead } from '@/lib/fitplan';
export const Route = createFileRoute('/signup')({ head: () => pageHead('免費註冊', '免費註冊 FitPlan。把排課表的時間，留給學員。'), component: Signup });
function Signup() { return <AuthForm mode="signup"/>; }
