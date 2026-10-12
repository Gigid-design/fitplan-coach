import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight, ArrowDown, Check, ClipboardCheck, CalendarDays, Timer, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Brand, Footer } from '@/components/fitplan/Brand';
import { useFitPlanAuth } from '@/components/fitplan/AuthContext';
import { pageHead, coachPlan } from '@/lib/fitplan';
export const Route = createFileRoute('/')({ head: () => pageHead('教練的排課好幫手', '填好學員資料，一分鐘拿到四週課表。你看過按送出，每週一自動寄給學員。不用再用 Excel 排到半夜。'), component: Index });
const features = [
 { icon: Timer, title: '一分鐘出四週課表', text: '填身高、體重、目標、每週幾次、受傷限制，課表就出來' },
 { icon: ClipboardCheck, title: '你看過才寄', text: '課表先給你改，按送出才會寄給學員' },
 { icon: CalendarDays, title: '每週一自動寄', text: '本週課表自動寄到學員信箱，你不用追' },
];
function Index() {
 const { user } = useFitPlanAuth();
 return <><header className="site-header page-width"><Brand/><nav className="header-nav" aria-label="主選單"><a href="#features">功能</a><a href="#pricing">價格</a><Link to={user ? '/app' : '/login'}>{user ? '學員頁' : '登入'}</Link><Button asChild className="desktop-start h-10 px-5"><Link to="/signup">免費開始<ArrowRight/></Link></Button></nav></header>
 <main><section className="hero page-width fade-in"><div className="eyebrow"><span className="eyebrow-dot"/>給教練的排課好幫手</div><h1>填好學員資料，<br/>一分鐘拿到<span className="highlight">四週課表</span></h1><p className="hero-copy">你看過按送出，每週一自動寄給學員。<br/>不用再用 Excel 排到半夜。</p><div className="hero-actions"><Button asChild className="h-12 px-7 text-sm"><Link to="/signup">免費開始<ArrowRight/></Link></Button><a href="#features" className="flex items-center gap-2 text-sm text-secondary">看它怎麼做<ArrowDown size={15}/></a></div><p className="hero-note"><Check size={14}/>註冊免費，開始寄課表時再付。</p></section>
 <section id="features" className="features-section page-width"><div className="section-heading"><div><span className="section-label">少一點行政，多一點教練時間</span><h2>從學員資料，到每週的進步。</h2></div><p>三個步驟，讓排課變簡單。</p></div><div className="feature-grid">{features.map((feature,index)=><article className="feature-card" key={feature.title}><div className="feature-top"><div className="feature-icon"><feature.icon size={25} strokeWidth={1.6}/></div><span className="feature-number">0{index+1}</span></div><h3>{feature.title}</h3><p>{feature.text}</p></article>)}</div></section>
 <section id="pricing" className="pricing-section"><div className="page-width"><div className="pricing-layout"><div className="pricing-intro"><span className="section-label">簡單的價格，專心帶學員</span><h2>一個方案，<br/>陪你帶好每一位學員。</h2><p>不用計算學員名額，不用挑選功能。<br/>把時間留給訓練，其他交給 FitPlan。</p></div><article className="pricing-card"><div className="plan-top"><h3>教練方案</h3><span className="plan-badge">學員數不限</span></div><div className="price"><span className="price-tag">NT${coachPlan.monthlyPrice}</span><span className="price-period">／月</span></div><p className="plan-limit"><Check size={17}/>學員數不限</p><Button asChild className="h-11 w-full"><Link to="/signup">免費開始<ArrowRight/></Link></Button><p className="plan-note">註冊免費。開始寄課表給學員時再付。</p></article></div></div></section></main><Footer/></>;
}
