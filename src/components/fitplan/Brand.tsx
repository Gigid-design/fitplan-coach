import { Link } from 'react-router';
import { Activity } from 'lucide-react';
export function Brand() { return <Link to="/" className="brand" aria-label="FitPlan 首頁"><span className="brand-mark"><Activity size={21} strokeWidth={2.4} /></span>FitPlan</Link>; }
export function Footer() { return <footer className="footer page-width"><span className="font-numeric">© 2026 FitPlan</span><p>FitPlan 產生的課表不是醫療建議。有受傷或疾病請先詢問醫師。</p></footer>; }
