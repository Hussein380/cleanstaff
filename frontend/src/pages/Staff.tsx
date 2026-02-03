import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Menu,
    User,
    Search,
    Star,
    Clock,
    MapPin,
    MoreHorizontal,
    LayoutDashboard,
    Calendar,
    Users,
    Settings
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { staffApi } from "@/lib/api";
import { PageTransition } from "@/components/ui/PageTransition";
import { Link } from "react-router-dom";

interface StaffMember {
    _id: string;
    name: string;
    role: string;
    status: 'Active' | 'On Break' | 'Scheduled' | 'Offline';
    rating: number;
    avatar: string;
}

export default function Staff() {
    const [staff, setStaff] = useState<StaffMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const data = await staffApi.getAll();
                setStaff(data);
            } catch (error) {
                console.error("Error fetching staff:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStaff();
    }, []);

    const filteredStaff = staff.filter(s => {
        if (filter === 'All') return true;
        return s.status === filter;
    });

    const getStats = (status: string) => staff.filter(s => s.status === status).length;

    return (
        <PageTransition>
            <div className="min-h-screen bg-navy text-white pb-32 pt-12">
                <div className="max-w-7xl mx-auto">
                    <header className="px-6 flex justify-between items-center mb-8">
                        <div className="flex items-center gap-4">
                            <Menu className="w-8 h-8 text-white/80 cursor-pointer hover:text-white transition-colors" />
                            <h1 className="text-2xl font-bold tracking-tight">Staff Management</h1>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10 cursor-pointer hover:bg-white/20 transition-all">
                            <User className="w-6 h-6 text-white/80" />
                        </div>
                    </header>

                    <div className="px-6 space-y-8">
                        {/* Search & Filters Row */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                            <div className="lg:col-span-1 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                                <Input
                                    placeholder="Search Staff Members..."
                                    className="pl-12 h-14 bg-white/5 border-white/5 rounded-2xl text-base focus-visible:ring-blue-500"
                                />
                            </div>
                            <div className="lg:col-span-2 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                                {['All', 'Active', 'On Break', 'Scheduled', 'Offline'].map((f) => (
                                    <FilterChip
                                        key={f}
                                        label={f}
                                        count={f === 'All' ? staff.length : getStats(f)}
                                        active={filter === f}
                                        onClick={() => setFilter(f)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Staff Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredStaff.map((member) => (
                                <StaffCard key={member._id} member={member} />
                            ))}
                            {!loading && filteredStaff.length === 0 && (
                                <div className="col-span-full text-center py-24 bg-white/5 rounded-[3rem] border border-white/5 text-white/40">
                                    No staff members found matching the selected filters.
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Bottom Nav - Responsive */}
                <div className="fixed bottom-8 left-0 right-0 flex justify-center px-6 z-50">
                    <nav className="bg-[#0c1421]/90 backdrop-blur-2xl border border-white/10 h-20 px-10 rounded-[2.5rem] flex items-center justify-between gap-12 shadow-2xl shadow-black/50 w-full max-w-2xl">
                        <NavItem to="/operations" icon={<LayoutDashboard />} label="Dashboard" />
                        <NavItem to="/jobs" icon={<Calendar />} label="Schedule" />
                        <NavItem to="/staff" icon={<Users />} label="Staff" active />
                        <NavItem to="/portal" icon={<Settings />} label="Portal" />
                    </nav>
                </div>
            </div>
        </PageTransition>
    );
}

function FilterChip({ label, count, active, onClick }: { label: string, count: number, active: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`whitespace-nowrap px-6 py-3 rounded-full font-bold text-sm transition-all border ${active ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20' : 'bg-white/5 border-white/5 text-white/40'}`}
        >
            {label} <span className="opacity-50 ml-1">{count}</span>
        </button>
    );
}

function StaffCard({ member }: { member: StaffMember }) {
    return (
        <div className="bg-white/5 border border-white/5 rounded-3xl p-4 flex gap-4 items-center group cursor-pointer hover:bg-white/[0.08] transition-all">
            <div className="relative">
                <img
                    src={member.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`}
                    alt={member.name}
                    className="w-16 h-16 rounded-2xl object-cover bg-white/10"
                />
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-navy ${member.status === 'Active' ? 'bg-green-500' : member.status === 'On Break' ? 'bg-orange-500' : 'bg-gray-500'}`} />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-bold truncate">{member.name}</h3>
                        <p className="text-sm text-white/40 font-medium">{member.role}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-lg">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-bold">{member.rating.toFixed(1)}</span>
                    </div>
                </div>
                <div className="mt-2 flex gap-4">
                    <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-blue-400" />
                        <span className="text-[10px] font-black tracking-tight text-white/40 uppercase">98.5% ATTENDANCE</span>
                    </div>
                </div>
            </div>
            <MoreHorizontal className="w-5 h-5 text-white/20" />
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
