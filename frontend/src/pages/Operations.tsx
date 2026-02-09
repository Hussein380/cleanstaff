import { useState, useEffect } from "react";
import {
    Menu,
    Calendar,
    Briefcase,
    LayoutDashboard,
    Users,
    Settings,
    Plus,
    Clock,
    CheckCircle2,
    LogOut,
    Building2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { dashboardApi } from "@/lib/api";
import { PageTransition } from "@/components/ui/PageTransition";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface SummaryData {
    activeShifts: number;
    pendingJobs: number;
    urgentJobs: number;
}

export default function Operations() {
    const [summary, setSummary] = useState<SummaryData | null>(null);
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const sumRes = await dashboardApi.getSummary();
                setSummary(sumRes);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <PageTransition>
            <div className="min-h-screen bg-gray-50 pb-32">
                {/* Top Navigation */}
                <header className="bg-white border-b sticky top-0 z-30 px-6 h-16 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xs">CS</span>
                        </div>
                        <h1 className="font-bold text-gray-900 text-lg hidden md:block">Operations Dashboard</h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full border border-green-100">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-xs font-bold text-green-700">System Live</span>
                        </div>
                        <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-500 hover:text-red-600">
                            <LogOut className="w-4 h-4 mr-2" />
                            Sign Out
                        </Button>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto p-6 space-y-8">
                    {/* 1. Key Metrics Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <SummaryCard
                            title="Active Shifts"
                            value={summary?.activeShifts ?? 0}
                            icon={<Clock className="w-5 h-5 text-blue-600" />}
                            color="bg-blue-50 border-blue-100"
                        />
                        <SummaryCard
                            title="Pending Jobs"
                            value={summary?.pendingJobs ?? 0}
                            icon={<Calendar className="w-5 h-5 text-indigo-600" />}
                            color="bg-indigo-50 border-indigo-100"
                        />
                        <SummaryCard
                            title="Urgent Actions"
                            value={summary?.urgentJobs ?? 0}
                            icon={<Briefcase className="w-5 h-5 text-rose-600" />}
                            color="bg-rose-50 border-rose-100"
                        />
                    </div>

                    {/* 2. Admin Actions Grid */}
                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <LayoutDashboard className="w-5 h-5 text-blue-600" />
                            Management Hub
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Manage Jobs Component */}
                            <ActionCard
                                title="Cleaning Jobs"
                                description="Create new job orders and assign staff."
                                icon={<Briefcase className="w-8 h-8 text-indigo-600" />}
                                actionLabel="View Schedule"
                                link="/jobs"
                            />
                        </div>
                    </section>

                    {/* 3. Quick Actions */}
                    <section className="bg-blue-600 rounded-2xl p-8 text-white relative overflow-hidden shadow-lg shadow-blue-200">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-90" />
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <h2 className="text-2xl font-bold mb-2">Need to create a new job?</h2>
                                <p className="text-blue-100">Quickly assign a new cleaning task to your team.</p>
                            </div>
                            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-50 font-bold border-none shadow-xl">
                                <Link to="/jobs" className="flex items-center gap-2">
                                    <Plus className="w-5 h-5" />
                                    Create Job Order
                                </Link>
                            </Button>
                        </div>
                    </section>
                </div>
            </div>
        </PageTransition>
    );
}

function SummaryCard({ title, value, icon, color }: { title: string, value: number, icon: any, color: string }) {
    return (
        <div className={`p-6 rounded-xl border ${color} shadow-sm flex items-center justify-between transition-transform hover:scale-[1.02] bg-white`}>
            <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{title}</p>
                <p className="text-3xl font-black text-gray-900">{value}</p>
            </div>
            <div className="p-3 bg-white rounded-lg shadow-sm">
                {icon}
            </div>
        </div>
    );
}

function ActionCard({ title, description, icon, actionLabel, link }: { title: string, description: string, icon: any, actionLabel: string, link: string }) {
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-blue-100 transition-all group">
            <div className="mb-4 p-4 bg-blue-50 rounded-xl w-fit group-hover:bg-blue-100 transition-colors">
                {icon}
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-500 text-sm mb-6 h-10">{description}</p>
            <Button asChild variant="outline" className="w-full border-gray-200 hover:border-blue-500 hover:text-blue-600">
                <Link to={link}>{actionLabel}</Link>
            </Button>
        </div>
    );
}
