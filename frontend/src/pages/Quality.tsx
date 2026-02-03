import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Menu,
    User,
    Star,
    CheckCircle2,
    XCircle,
    Image as ImageIcon,
    LayoutDashboard,
    Calendar,
    Users,
    Settings,
    ChevronRight
} from "lucide-react";
import { apiFetch } from "@/lib/api";
import { PageTransition } from "@/components/ui/PageTransition";
import { Link } from "react-router-dom";

interface QualityStats {
    avgInspectionScore: number;
    complianceRate: string;
}

interface Inspection {
    _id: string;
    client: { companyName: string };
    inspectionScore: number;
    images: string[];
    clientFeedback: { comment: string };
    location: string;
}

export default function Quality() {
    const [stats, setStats] = useState<QualityStats | null>(null);
    const [inspections, setInspections] = useState<Inspection[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQualityData = async () => {
            try {
                const [statsRes, jobsRes] = await Promise.all([
                    apiFetch('/quality/stats'),
                    apiFetch('/jobs?status=Completed')
                ]);
                setStats(statsRes);
                setInspections(jobsRes.filter((j: any) => j.inspectionScore !== undefined));
            } catch (error) {
                console.error("Error fetching quality data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchQualityData();
    }, []);

    return (
        <PageTransition>
            <div className="min-h-screen bg-navy text-white pb-32 pt-12">
                <div className="max-w-7xl mx-auto">
                    <header className="px-6 flex justify-between items-center mb-10">
                        <div className="flex items-center gap-4">
                            <Menu className="w-8 h-8 text-white/80 cursor-pointer hover:text-white transition-colors" />
                            <h1 className="text-2xl font-bold tracking-tight">Quality Assurance</h1>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10 cursor-pointer hover:bg-white/20 transition-all">
                            <User className="w-6 h-6 text-white/80" />
                        </div>
                    </header>

                    <div className="px-6 space-y-10">
                        {/* Stats Summary Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-white/5 border border-white/5 rounded-[2rem] p-8 text-center space-y-3 shadow-lg shadow-black/20">
                                <span className="text-5xl font-bold text-blue-400">{stats?.avgInspectionScore ?? 0}</span>
                                <span className="block text-xs text-white/40 font-black uppercase tracking-widest">Average Inspection Score</span>
                            </div>
                            <div className="bg-white/5 border border-white/5 rounded-[2rem] p-8 text-center space-y-3 shadow-lg shadow-black/20">
                                <span className="text-5xl font-bold text-green-400">{stats?.complianceRate ?? '0%'}</span>
                                <span className="block text-xs text-white/40 font-black uppercase tracking-widest">Compliance Rate</span>
                            </div>
                            {/* Additional placeholders for desktop layout balance */}
                            <div className="hidden lg:block bg-blue-600 rounded-[2rem] p-8 relative overflow-hidden">
                                <div className="relative z-10">
                                    <h3 className="font-bold text-white mb-2">Quality Goal</h3>
                                    <p className="text-white/60 text-xs">Maintain 95% avg score across all sites this month.</p>
                                </div>
                                <Star className="absolute -bottom-4 -right-4 w-24 h-24 text-white/10 rotate-12" />
                            </div>
                            <div className="hidden lg:block bg-white/5 border border-white/5 rounded-[2rem] p-8">
                                <h3 className="font-bold text-white mb-2">System Status</h3>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                    <span className="text-xs text-white/60 font-medium tracking-tight">Monitoring Active</span>
                                </div>
                            </div>
                        </div>

                        {/* Inspections List Responsive Grid */}
                        <section>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold tracking-tight">Recent Site Audits</h2>
                                <button className="text-blue-500 text-sm font-bold uppercase tracking-widest hover:text-blue-400 transition-colors">Generate Report</button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                                {inspections.map((item) => (
                                    <InspectionCard key={item._id} inspection={item} />
                                ))}
                                {!loading && inspections.length === 0 && (
                                    <div className="col-span-full text-center py-32 bg-white/5 rounded-[3rem] border border-white/5 text-white/20">
                                        No recent site inspections recorded in the system.
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>
                </div>

                {/* Bottom Nav - Responsive */}
                <div className="fixed bottom-8 left-0 right-0 flex justify-center px-6 z-50">
                    <nav className="bg-[#0c1421]/90 backdrop-blur-2xl border border-white/10 h-20 px-10 rounded-[2.5rem] flex items-center justify-between gap-12 shadow-2xl shadow-black/50 w-full max-w-2xl">
                        <NavItem to="/operations" icon={<LayoutDashboard />} label="Dashboard" />
                        <NavItem to="/jobs" icon={<Calendar />} label="Schedule" />
                        <NavItem to="/staff" icon={<Users />} label="Staff" />
                        <NavItem to="/portal" icon={<Settings />} label="Portal" />
                    </nav>
                </div>
            </div>
        </PageTransition>
    );
}

function InspectionCard({ inspection }: { inspection: Inspection }) {
    return (
        <div className="bg-white/5 border border-white/5 rounded-3xl p-5 space-y-4 hover:bg-white/[0.08] transition-all cursor-pointer">
            <div className="flex justify-between items-start">
                <div className="space-y-1">
                    <h3 className="font-bold text-lg">{inspection.client.companyName}</h3>
                    <p className="text-sm text-white/40">{inspection.location}</p>
                </div>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg ${inspection.inspectionScore >= 90 ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                    {inspection.inspectionScore}
                </div>
            </div>

            {inspection.images.length > 0 && (
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {inspection.images.map((img, i) => (
                        <img
                            key={i}
                            src={img}
                            alt="Inspection"
                            className="w-20 h-20 rounded-xl object-cover border border-white/10 shrink-0"
                        />
                    ))}
                </div>
            )}

            {inspection.clientFeedback.comment && (
                <div className="bg-white/5 p-3 rounded-2xl border border-white/5 flex gap-3 italic text-sm text-white/60">
                    <Star className="w-4 h-4 text-yellow-400 shrink-0" />
                    "{inspection.clientFeedback.comment}"
                </div>
            )}

            <div className="flex justify-between items-center text-[10px] font-black tracking-widest uppercase">
                <span className="text-blue-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> CHECKLIST VERIFIED
                </span>
                <span className="text-white/20">VIEW DETAILS</span>
            </div>
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
