import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Building2,
    Calendar,
    ClipboardCheck,
    History,
    MessageSquare,
    Plus,
    Star,
    LayoutDashboard,
    Users,
    User,
    Settings,
    ChevronRight,
    ShieldCheck
} from "lucide-react";
import { apiFetch } from "@/lib/api";
import { PageTransition } from "@/components/ui/PageTransition";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface PortalData {
    client: { companyName: string; activePlan: { name: string; status: string } };
    recentJobs: any[];
}

export default function ClientPortal() {
    const [data, setData] = useState<PortalData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPortalData = async () => {
            try {
                const res = await apiFetch('/client/dashboard');
                setData(res);
            } catch (error) {
                console.error("Error fetching portal data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPortalData();
    }, []);

    return (
        <PageTransition>
            <div className="min-h-screen bg-navy text-white pb-32 pt-12">
                <div className="max-w-7xl mx-auto">
                    <header className="px-6 flex justify-between items-center mb-10">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
                                <Building2 className="w-7 h-7" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold tracking-tight">Client Executive Portal</h1>
                                <p className="text-white/40 text-xs font-medium">Managing hygiene excellence for {data?.client.companyName}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="hidden md:flex items-center gap-2 bg-green-500/10 px-4 py-2 rounded-xl border border-green-500/20">
                                <ShieldCheck className="w-4 h-4 text-green-500" />
                                <span className="text-xs font-bold text-green-500 uppercase tracking-widest">Verified Account</span>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/10 cursor-pointer hover:bg-white/20 transition-all">
                                <Settings className="w-6 h-6 text-white/80" />
                            </div>
                        </div>
                    </header>

                    <div className="px-6 space-y-10">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                            {/* Account & Summary Column */}
                            <div className="lg:col-span-1 space-y-8">
                                <section>
                                    <h2 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-4">Current Subscription</h2>
                                    <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-[2.5rem] p-10 space-y-8 shadow-2xl shadow-blue-900/40 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl opacity-50" />
                                        <div className="flex justify-between items-start relative z-10">
                                            <span className="bg-white/20 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-white/10">
                                                {data?.client.activePlan.status || 'ACTIVE'}
                                            </span>
                                            <div className="text-right">
                                                <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-1">NEXT SESSION</p>
                                                <p className="font-bold text-sm">Tomorrow, 10:00 PM</p>
                                            </div>
                                        </div>
                                        <div className="relative z-10">
                                            <p className="text-white/60 text-xs font-medium uppercase tracking-widest mb-2">Service Plan</p>
                                            <h2 className="text-4xl font-bold leading-tight">{data?.client.activePlan.name || 'Premium Care'}</h2>
                                        </div>
                                        <div className="pt-6 border-t border-white/10 flex gap-4 items-center relative z-10">
                                            <div className="flex -space-x-3">
                                                {[1, 2, 3].map(i => (
                                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-blue-700 bg-white/10 flex items-center justify-center">
                                                        <User className="w-5 h-5 text-white/60" />
                                                    </div>
                                                ))}
                                            </div>
                                            <p className="text-xs text-white/70 font-bold leading-tight">
                                                3 Dedicated Staff <br /> <span className="text-[10px] text-white/40">Continuity Guaranteed</span>
                                            </p>
                                        </div>
                                    </div>
                                </section>

                                <section>
                                    <h2 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-4">Quick Actions</h2>
                                    <div className="grid grid-cols-2 gap-4">
                                        <ActionCard icon={<Plus />} label="Schedule Session" color="bg-blue-600" />
                                        <ActionCard icon={<ClipboardCheck />} label="Audit Checklist" color="bg-white/5" border />
                                        <ActionCard icon={<History />} label="Billing Records" color="bg-white/5" border />
                                        <ActionCard icon={<MessageSquare />} label="Chat Agent" color="bg-white/5" border />
                                    </div>
                                </section>
                            </div>

                            {/* Service Records Column */}
                            <div className="lg:col-span-2 space-y-8">
                                <section>
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-2xl font-bold tracking-tight">Service Ledger</h2>
                                        <button className="text-blue-500 text-sm font-bold uppercase tracking-widest hover:text-blue-400">Export History</button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {data?.recentJobs.map((job) => (
                                            <HistoryItem key={job._id} job={job} />
                                        ))}
                                        {!loading && !data?.recentJobs.length && (
                                            <div className="col-span-full text-center py-24 bg-white/5 rounded-[3rem] border border-white/5 text-white/40 italic">
                                                No service records available in your history.
                                            </div>
                                        )}
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Nav - Responsive */}
                <div className="fixed bottom-8 left-0 right-0 flex justify-center px-6 z-50">
                    <nav className="bg-[#0c1421]/90 backdrop-blur-2xl border border-white/10 h-20 px-10 rounded-[2.5rem] flex items-center justify-between gap-12 shadow-2xl shadow-black/50 w-full max-w-2xl">
                        <NavItem to="/portal" icon={<LayoutDashboard />} label="Portal" active />
                        <NavItem to="/portal/bookings" icon={<Calendar />} label="Bookings" />
                        <NavItem to="/portal/support" icon={<MessageSquare />} label="Support" />
                        <NavItem to="/operations" icon={<Settings />} label="Admin" />
                    </nav>
                </div>
            </div>
        </PageTransition>
    );
}

function ActionCard({ icon, label, color, border }: { icon: React.ReactNode, label: string, color: string, border?: boolean }) {
    return (
        <div className={`${color} ${border ? 'border border-white/10' : ''} rounded-3xl p-6 space-y-4 cursor-pointer hover:scale-[1.02] transition-transform active:scale-95`}>
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                {icon}
            </div>
            <p className="font-bold text-sm leading-tight">{label}</p>
        </div>
    );
}

function HistoryItem({ job }: { job: any }) {
    return (
        <div className="bg-white/5 border border-white/5 rounded-3xl p-4 flex items-center gap-4 group cursor-pointer hover:bg-white/[0.08] transition-all">
            <div className="bg-green-500/20 w-12 h-12 rounded-2xl flex items-center justify-center shrink-0">
                <Star className="w-6 h-6 text-green-400 fill-green-400" />
            </div>
            <div className="flex-1 min-w-0">
                <h3 className="font-bold truncate">{job.title}</h3>
                <p className="text-xs text-white/40 uppercase font-black tracking-tighter">COMPLETED • FEB 02</p>
            </div>
            <ChevronRight className="w-5 h-5 text-white/20" />
        </div>
    );
}

function NavItem({ icon, label, active, to }: { icon: React.ReactNode, label: string, active?: boolean, to: string }) {
    return (
        <Link to={to} className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${active ? 'text-blue-500' : 'text-white/40 hover:text-white/60'}`}>
            <div className="w-6 h-6">{icon}</div>
            <span className="text-[10px] font-bold">{label}</span>
            {active && <motion.div layoutId="activeNav" className="w-1 h-1 bg-blue-500 rounded-full mt-0.5" />}
        </Link>
    );
}
