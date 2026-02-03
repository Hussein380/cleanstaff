import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Menu,
    User,
    Clock,
    CheckCircle2,
    AlertCircle,
    ChevronRight,
    LayoutDashboard,
    Calendar,
    Users,
    Settings,
    MoreVertical,
    SlidersHorizontal,
    Plus
} from "lucide-react";
import { jobsApi } from "@/lib/api";
import { PageTransition } from "@/components/ui/PageTransition";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface Job {
    _id: string;
    title: string;
    location: string;
    status: string;
    completionPercentage: number;
    checklist: { task: string; isCompleted: boolean }[];
    assignedStaff: { name: string; avatar: string }[];
    client: { companyName: string };
    image?: string;
    dueTime?: string;
}

export default function Jobs() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('All Jobs');

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const data = await jobsApi.getAll();
                // Add some mock images if not present to match screenshot
                const dataWithImages = data.map((j: any, i: number) => ({
                    ...j,
                    image: [
                        "https://images.unsplash.com/photo-1581578731548-c64695ce6958?auto=format&fit=crop&q=80&w=600",
                        "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=600",
                        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600"
                    ][i % 3],
                    dueTime: "5:00 PM"
                }));
                setJobs(dataWithImages);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    return (
        <PageTransition>
            <div className="min-h-screen bg-[#0a0f18] text-white pb-32 pt-12">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <header className="px-6 flex justify-between items-center mb-8">
                        <div className="flex items-center gap-4">
                            <Menu className="w-8 h-8 text-white/80 cursor-pointer hover:text-white transition-colors" />
                            <h1 className="text-2xl font-bold tracking-tight">Job Management</h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <SlidersHorizontal className="w-6 h-6 text-blue-500 cursor-pointer hover:text-blue-400 transition-colors" />
                            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10 cursor-pointer hover:bg-white/20 transition-all">
                                <User className="w-6 h-6 text-white/80" />
                            </div>
                        </div>
                    </header>

                    {/* Tabs */}
                    <div className="px-6 flex gap-8 border-b border-white/5 mb-8">
                        {['All Jobs', 'My Tasks', 'Urgent'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-4 text-sm font-bold transition-all relative ${activeTab === tab ? 'text-blue-500' : 'text-white/40'}`}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <motion.div layoutId="jobTab" className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 rounded-full" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Filter Bar */}
                    <div className="px-6 flex gap-4 mb-10 overflow-x-auto scrollbar-hide">
                        <FilterSelect label="All Status" />
                        <FilterSelect label="Not Started" />
                        <FilterSelect label="In Progress" />
                        <FilterSelect label="Completed" />
                    </div>

                    <div className="px-6 space-y-2 mb-8 flex justify-between items-end">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight">Active Operations</h2>
                            <p className="text-white/40 text-sm font-medium mt-1">Real-time status of all ongoing cleaning tasks</p>
                        </div>
                        <span className="text-blue-500 font-bold bg-blue-500/10 px-4 py-2 rounded-xl border border-blue-500/20">{jobs.length} Jobs Found</span>
                    </div>

                    {/* Job List - Responsive Grid */}
                    <div className="px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {jobs.map((job) => (
                            <JobItem key={job._id} job={job} />
                        ))}
                        {!loading && jobs.length === 0 && (
                            <div className="col-span-full text-center py-32 bg-white/5 rounded-[3rem] border border-white/5">
                                <AlertCircle className="w-12 h-12 text-white/10 mx-auto mb-4" />
                                <p className="text-white/20 text-xl font-medium">No active cleaning jobs found</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Floating Action Button */}
                <button className="fixed bottom-32 right-8 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/40 z-50 hover:scale-110 active:scale-95 transition-all">
                    <Plus className="w-10 h-10 text-white" />
                </button>

                {/* Bottom Nav - Responsive */}
                <div className="fixed bottom-8 left-0 right-0 flex justify-center px-6 z-50">
                    <nav className="bg-[#0c1421]/90 backdrop-blur-2xl border border-white/10 h-20 px-10 rounded-[2.5rem] flex items-center justify-between gap-12 shadow-2xl shadow-black/50 w-full max-w-2xl">
                        <NavItem to="/operations" icon={<LayoutDashboard />} label="Dashboard" />
                        <NavItem to="/jobs" icon={<Calendar />} label="Schedule" active />
                        <NavItem to="/staff" icon={<Users />} label="Staff" />
                        <NavItem to="/portal" icon={<Settings />} label="Portal" />
                    </nav>
                </div>
            </div>
        </PageTransition>
    );
}

function FilterSelect({ label }: { label: string }) {
    return (
        <div className="flex-none bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl flex items-center gap-2 cursor-pointer">
            <span className="text-sm font-bold text-white/60">{label}</span>
            <ChevronRight className="w-4 h-4 text-white/20 rotate-90" />
        </div>
    );
}

function JobItem({ job }: { job: Job }) {
    const isCompleted = job.status === 'Completed';
    const isInProgress = job.status === 'In Progress';

    return (
        <div className="bg-[#161c29] border border-white/5 rounded-[2rem] overflow-hidden group">
            {/* Header Image */}
            <div className="h-48 relative">
                <img src={job.image} alt={job.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161c29] via-transparent to-transparent" />
            </div>

            <div className="p-6 space-y-4 -mt-2 relative">
                <div className="flex justify-between items-start">
                    <div className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                        <span className="text-yellow-500 text-[10px] font-black uppercase tracking-wider">{job.status}</span>
                    </div>
                    <p className="text-white/40 text-xs font-medium">Due: {job.dueTime}</p>
                </div>

                <div className="space-y-1">
                    <h3 className="text-xl font-bold leading-tight">{job.client.companyName} - {job.title.split('-')[0]}</h3>
                    <p className="text-sm text-white/40 font-medium">{job.location}</p>
                </div>

                <div className="space-y-3 pt-2">
                    <div className="flex justify-between items-center">
                        <span className="text-[10px] text-white/40 font-black uppercase tracking-tighter">Checklist Completion</span>
                        <span className="text-blue-500 text-xs font-bold">{job.completionPercentage}%</span>
                    </div>
                    <Progress value={job.completionPercentage} className="h-1.5 bg-white/5 rounded-full" />
                </div>

                <div className="flex justify-between items-center pt-2">
                    <div className="flex -space-x-2">
                        {job.assignedStaff.map((staff, i) => (
                            <img
                                key={i}
                                src={staff.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${staff.name}`}
                                alt={staff.name}
                                className="w-9 h-9 rounded-full border-2 border-[#161c29] object-cover"
                            />
                        ))}
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-10 px-6 rounded-xl">
                        View Details
                    </Button>
                </div>
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
