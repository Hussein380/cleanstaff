import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Menu,
    User,
    Plus,
    Calendar,
    AlertCircle,
    CheckCircle2,
    Briefcase,
    BarChart3,
    Settings,
    LayoutDashboard,
    Users,
    Building2,
    ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { dashboardApi } from "@/lib/api";
import { PageTransition } from "@/components/ui/PageTransition";
import { Link } from "react-router-dom";

interface SummaryData {
    activeShifts: number;
    pendingJobs: number;
    urgentJobs: number;
}

interface HighPriorityJob {
    _id: string;
    title: string;
    location: string;
    startTime: string;
    priority: string;
    client: { companyName: string };
}

export default function Operations() {
    const [summary, setSummary] = useState<SummaryData | null>(null);
    const [priorityJobs, setPriorityJobs] = useState<HighPriorityJob[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [sumRes, jobsRes] = await Promise.all([
                    dashboardApi.getSummary(),
                    dashboardApi.getPriorityJobs()
                ]);
                setSummary(sumRes);
                setPriorityJobs(jobsRes);
            } catch (error) {
                console.error("Error fetching operations data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <PageTransition>
            <div className="min-h-screen bg-navy text-white pb-32 pt-12">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <header className="px-6 flex justify-between items-center mb-12">
                        <div className="flex items-center gap-4">
                            <Menu className="w-8 h-8 text-white/80 cursor-pointer hover:text-white transition-colors" />
                            <h1 className="text-2xl font-bold tracking-tight">Operations Control</h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="hidden md:flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-xs font-bold text-white/60">SYSTEM LIVE</span>
                            </div>
                            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10 cursor-pointer hover:bg-white/20 transition-all">
                                <User className="w-6 h-6 text-white/80" />
                            </div>
                        </div>
                    </header>

                    <div className="px-6 space-y-12">
                        {/* Summary & Actions Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Today's Summary */}
                            <section className="lg:col-span-2">
                                <h2 className="text-xl font-bold mb-6 text-white/40 uppercase tracking-widest text-sm">Today's Performance</h2>
                                <div className="grid grid-cols-3 gap-6">
                                    <SummaryCard
                                        label="ACTIVE SHIFTS"
                                        value={summary?.activeShifts ?? 0}
                                        color="text-blue-400"
                                    />
                                    <SummaryCard
                                        label="PENDING JOBS"
                                        value={summary?.pendingJobs ?? 0}
                                        color="text-white"
                                    />
                                    <SummaryCard
                                        label="URGENT"
                                        value={summary?.urgentJobs ?? 0}
                                        color="text-red-500"
                                        urgent
                                    />
                                </div>
                            </section>

                            {/* Quick Actions */}
                            <section>
                                <h2 className="text-xl font-bold mb-6 text-white/40 uppercase tracking-widest text-sm">Quick Actions</h2>
                                <div className="grid grid-cols-1 gap-4">
                                    <Button className="h-16 rounded-3xl bg-blue-600 hover:bg-blue-700 font-bold text-lg flex gap-3 shadow-lg shadow-blue-500/20 transition-all active:scale-95">
                                        <Calendar className="w-6 h-6" />
                                        Schedule New Shift
                                    </Button>
                                    <Button className="h-16 rounded-3xl bg-white/5 hover:bg-white/10 border border-white/10 font-bold text-lg flex gap-3 transition-all active:scale-95">
                                        <Plus className="w-6 h-6" />
                                        Create New Cleaning Job
                                    </Button>
                                </div>
                            </section>
                        </div>

                        {/* Status Monitoring */}
                        <section>
                            <h2 className="text-xl font-bold mb-6 text-white/40 uppercase tracking-widest text-sm">Operational Health</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <MonitorCard
                                    title="Ongoing Jobs"
                                    progress={75}
                                    image="https://images.unsplash.com/photo-1581578731548-c64695ce6958?auto=format&fit=crop&q=80&w=300"
                                />
                                <MonitorCard
                                    title="Quality Alerts"
                                    badge="Action Required"
                                    image="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=300"
                                    badgeColor="bg-red-500"
                                />
                                <MonitorCard
                                    title="Staff Attendance"
                                    subtext="92% Present"
                                    image="https://images.unsplash.com/photo-1556740734-7567df30206f?auto=format&fit=crop&q=80&w=300"
                                />
                                <MonitorCard
                                    title="Client Relations"
                                    subtext="4 New Inquiries"
                                    image="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=300"
                                />
                            </div>
                        </section>

                        {/* High Priority Cleanings */}
                        <section>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-white/40 uppercase tracking-widest text-sm">Critical Issues</h2>
                                <button className="text-blue-500 text-xs font-bold uppercase tracking-widest hover:text-blue-400 transition-colors">View All Cleanings</button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {priorityJobs.map((job) => (
                                    <JobListItem key={job._id} job={job} />
                                ))}
                                {!loading && priorityJobs.length === 0 && (
                                    <div className="md:col-span-2 lg:col-span-3 bg-white/5 border border-white/5 rounded-3xl p-12 text-center text-white/40">
                                        No critical cleanings require attention at this moment.
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>
                </div>

                {/* Bottom Nav - Centered on Desktop */}
                <div className="fixed bottom-8 left-0 right-0 flex justify-center px-6 z-50">
                    <nav className="bg-[#0c1421]/90 backdrop-blur-2xl border border-white/10 h-20 px-10 rounded-[2.5rem] flex items-center justify-between gap-12 shadow-2xl shadow-black/50 w-full max-w-2xl">
                        <NavItem to="/operations" icon={<LayoutDashboard />} label="Dashboard" active />
                        <NavItem to="/jobs" icon={<Calendar />} label="Schedule" />
                        <NavItem to="/staff" icon={<Users />} label="Staff" />
                        <NavItem to="/portal" icon={<Settings />} label="Portal" />
                    </nav>
                </div>
            </div>
        </PageTransition>
    );
}

function SummaryCard({ label, value, color, urgent }: { label: string, value: number, color: string, urgent?: boolean }) {
    return (
        <div className="bg-white/5 border border-white/5 rounded-2xl p-4 aspect-square flex flex-col justify-between">
            <span className={`text-[10px] font-black tracking-widest ${urgent ? 'text-red-500' : 'text-white/40'}`}>
                {label}
            </span>
            <span className={`text-4xl font-bold ${color}`}>
                {value}
            </span>
        </div>
    );
}

function MonitorCard({ title, progress, badge, subtext, image, badgeColor }: { title: string, progress?: number, badge?: string, subtext?: string, image: string, badgeColor?: string }) {
    return (
        <div className="relative aspect-square rounded-3xl overflow-hidden group">
            <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 space-y-2">
                <h3 className="font-bold text-sm leading-tight">{title}</h3>
                {progress !== undefined && (
                    <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: `${progress}%` }} />
                    </div>
                )}
                {badge && (
                    <span className={`${badgeColor || 'bg-blue-600'} text-[10px] font-bold px-2 py-1 rounded-full text-white uppercase tracking-wider`}>
                        {badge}
                    </span>
                )}
                {subtext && <p className="text-[10px] text-white/60 font-medium">{subtext}</p>}
            </div>
        </div>
    );
}

function JobListItem({ job }: { job: HighPriorityJob }) {
    const date = new Date(job.startTime || Date.now());
    const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
    const day = date.getDate();

    return (
        <div className="bg-white/5 border border-white/5 rounded-3xl p-4 flex items-center gap-4 group cursor-pointer hover:bg-white/[0.08] transition-colors">
            <div className="bg-blue-600/20 border border-blue-500/20 rounded-2xl w-16 h-16 flex flex-col items-center justify-center">
                <span className="text-blue-400 text-[10px] font-black">{month}</span>
                <span className="text-2xl font-black">{day}</span>
            </div>
            <div className="flex-1 min-w-0">
                <h3 className="font-bold truncate">{job.client?.companyName || 'Private Client'}</h3>
                <p className="text-sm text-white/40 truncate">
                    {job.title} • {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
            </div>
            <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-white/40 transition-colors" />
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
