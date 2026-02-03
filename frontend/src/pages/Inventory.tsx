import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Menu,
    User,
    Search,
    Package,
    AlertTriangle,
    ArrowUpRight,
    LayoutDashboard,
    Calendar,
    Users,
    Settings,
    MoreVertical
} from "lucide-react";
import { apiFetch } from "@/lib/api";
import { PageTransition } from "@/components/ui/PageTransition";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";

interface InventoryItem {
    _id: string;
    name: string;
    category: string;
    site: string;
    currentStock: number;
    unit: string;
    threshold: number;
}

export default function Inventory() {
    const [items, setItems] = useState<InventoryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('All');

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const data = await apiFetch('/inventory');
                setItems(data);
            } catch (error) {
                console.error("Error fetching inventory:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchInventory();
    }, []);

    const filteredItems = items.filter(item => {
        if (activeTab === 'All') return true;
        return item.category === activeTab;
    });

    return (
        <PageTransition>
            <div className="min-h-screen bg-navy text-white pb-32 pt-12">
                <div className="max-w-7xl mx-auto">
                    <header className="px-6 flex justify-between items-center mb-8">
                        <div className="flex items-center gap-4">
                            <Menu className="w-8 h-8 text-white/80 cursor-pointer hover:text-white transition-colors" />
                            <h1 className="text-2xl font-bold tracking-tight">Inventory & Supplies</h1>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10 cursor-pointer hover:bg-white/20 transition-all">
                            <User className="w-6 h-6 text-white/80" />
                        </div>
                    </header>

                    <div className="px-6 space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Stats & Search Column */}
                            <div className="lg:col-span-1 space-y-6">
                                <section>
                                    <h2 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-4">Stock Overview</h2>
                                    <div className="bg-blue-600 rounded-[2rem] p-8 relative overflow-hidden shadow-xl shadow-blue-900/20">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl opacity-50" />
                                        <div className="relative z-10 space-y-4">
                                            <div className="flex justify-between items-start">
                                                <Package className="w-10 h-10 text-white/80" />
                                                <div className="bg-white/20 p-2 rounded-xl">
                                                    <ArrowUpRight className="w-5 h-5 text-white" />
                                                </div>
                                            </div>
                                            <div>
                                                <span className="text-[10px] font-black tracking-widest text-white/60 uppercase">CRITICAL ALERTS</span>
                                                <h2 className="text-3xl font-bold text-white mt-1">
                                                    {items.filter(i => i.currentStock <= i.threshold).length} Low Stock
                                                </h2>
                                                <p className="text-white/60 text-xs mt-2 font-medium">Items requiring replenishment</p>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section>
                                    <h2 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-4">Quick Search</h2>
                                    <div className="relative">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                                        <Input
                                            placeholder="Search items..."
                                            className="pl-12 h-14 bg-white/5 border-white/5 rounded-2xl text-base focus-visible:ring-blue-500"
                                        />
                                    </div>
                                </section>
                            </div>

                            {/* Main Inventory Column */}
                            <div className="lg:col-span-2 space-y-6">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-bold tracking-tight">Supply Ledger</h2>
                                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide no-scrollbar">
                                        {['All', 'Chemicals', 'Equipment', 'Tools'].map((tab) => (
                                            <button
                                                key={tab}
                                                onClick={() => setActiveTab(tab)}
                                                className={`whitespace-nowrap px-6 py-3 rounded-full font-bold text-sm border transition-all ${activeTab === tab ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20' : 'bg-white/5 border-white/5 text-white/40 hover:bg-white/10'}`}
                                            >
                                                {tab}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {filteredItems.map((item) => (
                                        <InventoryCard key={item._id} item={item} />
                                    ))}
                                    {!loading && filteredItems.length === 0 && (
                                        <div className="col-span-full text-center py-20 bg-white/5 rounded-[2.5rem] border border-white/5 text-white/40 italic">
                                            No supplies found in this category.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
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

function InventoryCard({ item }: { item: InventoryItem }) {
    const isLow = item.currentStock <= item.threshold;

    return (
        <div className="bg-white/5 border border-white/5 rounded-3xl p-5 flex items-center gap-4 group hover:bg-white/[0.08] transition-all">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${isLow ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'}`}>
                {isLow ? <AlertTriangle className="w-7 h-7" /> : <Package className="w-7 h-7" />}
            </div>
            <div className="flex-1 min-w-0">
                <h3 className="font-bold truncate">{item.name}</h3>
                <p className="text-sm text-white/40">{item.site}</p>
            </div>
            <div className="text-right">
                <span className={`block font-bold text-lg ${isLow ? 'text-red-400' : 'text-white'}`}>
                    {item.currentStock} {item.unit}
                </span>
                <span className="text-[10px] font-black text-white/20 uppercase tracking-tighter">
                    Threshold: {item.threshold}
                </span>
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
