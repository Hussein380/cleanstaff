import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Menu,
    User,
    AlertCircle,
    ChevronRight,
    LayoutDashboard,
    Calendar,
    Users,
    Settings,
    Plus,
    X,
    Loader2,
    Edit2,
    Trash2,
    Building2
} from "lucide-react";
import { jobsApi } from "@/lib/api";
import { PageTransition } from "@/components/ui/PageTransition";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface Job {
    _id: string;
    title: string;
    location: string;
    status: string;
    priority: string;
    completionPercentage: number;
    checklist: { task: string; isCompleted: boolean }[];
    assignedStaff: { _id: string; name: string; avatar: string }[];
    client: { companyName: string };
    image?: string;
    dueTime?: string;
}

interface StaffMember {
    _id: string;
    name: string;
}

interface Client {
    _id: string;
    companyName: string;
}

export default function Jobs() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('All Jobs');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingJob, setEditingJob] = useState<Job | null>(null);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const { toast } = useToast();

    const [formData, setFormData] = useState({
        title: '',
        companyName: '',
        address: '',
        priority: 'Medium',
        status: 'Not Started',
        staffNames: '' // Comma-separated names
    });

    const fetchJobs = async () => {
        try {
            const data = await jobsApi.getAll();
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

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const payload = {
                ...formData,
                staffNames: formData.staffNames.split(',').map(n => n.trim()).filter(n => n)
            };
            await jobsApi.create(payload);
            toast({ title: "Success", description: "Job and details saved successfully" });
            setIsModalOpen(false);
            resetForm();
            fetchJobs();
        } catch (error: any) {
            toast({ title: "Error", description: error.response?.data?.message || "Failed to save job", variant: "destructive" });
        } finally {
            setSubmitting(false);
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingJob) return;
        setSubmitting(true);
        try {
            const payload = {
                ...formData,
                staffNames: formData.staffNames.split(',').map(n => n.trim()).filter(n => n)
            };
            await jobsApi.update(editingJob._id, payload);
            toast({ title: "Success", description: "Job updated successfully" });
            setIsModalOpen(false);
            setEditingJob(null);
            resetForm();
            fetchJobs();
        } catch (error: any) {
            toast({ title: "Error", description: error.response?.data?.message || "Failed to update job", variant: "destructive" });
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!selectedJob) return;
        setSubmitting(true);
        try {
            await jobsApi.delete(selectedJob._id);
            toast({ title: "Success", description: "Job deleted successfully" });
            setIsDeleteModalOpen(false);
            setSelectedJob(null);
            fetchJobs();
        } catch (error: any) {
            toast({ title: "Error", description: error.response?.data?.message || "Failed to delete job", variant: "destructive" });
        } finally {
            setSubmitting(false);
        }
    };

    const resetForm = () => {
        setFormData({ title: '', companyName: '', address: '', priority: 'Medium', status: 'Not Started', staffNames: '' });
    };

    const openCreateModal = () => {
        resetForm();
        setEditingJob(null);
        setIsModalOpen(true);
    };

    const openEditModal = (job: Job) => {
        setEditingJob(job);
        setFormData({
            title: job.title,
            companyName: job.client?.companyName || '',
            address: job.location,
            priority: job.priority,
            status: job.status,
            staffNames: job.assignedStaff.map(s => s.name).join(', ')
        });
        setIsModalOpen(true);
    };

    const openDeleteModal = (job: Job) => {
        setSelectedJob(job);
        setIsDeleteModalOpen(true);
    };

    return (
        <PageTransition>
            <div className="min-h-screen bg-[#0a0f18] text-white pb-32 pt-12">
                <div className="max-w-7xl mx-auto">
                    <header className="px-6 flex justify-between items-center mb-8">
                        <div className="flex items-center gap-4">
                            <Menu className="w-8 h-8 text-white/80 cursor-pointer hover:text-white transition-colors" />
                            <h1 className="text-2xl font-bold tracking-tight">Schedule & Jobs</h1>
                        </div>
                        <Button onClick={openCreateModal} className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl h-12 px-6">
                            <Plus className="w-5 h-5 mr-2" /> New Job Order
                        </Button>
                    </header>

                    {/* Tabs */}
                    <div className="px-6 flex gap-8 border-b border-white/5 mb-8">
                        {['All Jobs', 'Active', 'Urgent'].map(tab => (
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

                    <div className="px-6 space-y-2 mb-8">
                        <h2 className="text-3xl font-bold tracking-tight text-white">Project Queue</h2>
                        <p className="text-white/40 text-sm font-medium">Create and track jobs. Everything else is handled automatically.</p>
                    </div>

                    {/* Job List - Responsive Grid */}
                    <div className="px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {jobs.map((job) => (
                            <JobItem key={job._id} job={job} onEdit={() => openEditModal(job)} onDelete={() => openDeleteModal(job)} />
                        ))}
                        {!loading && jobs.length === 0 && (
                            <div className="col-span-full text-center py-32 bg-white/5 rounded-[3rem] border border-white/5">
                                <AlertCircle className="w-12 h-12 text-white/10 mx-auto mb-4" />
                                <p className="text-white/20 text-xl font-medium">No jobs found in queue.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Create/Edit Modal */}
                <AnimatePresence>
                    {isModalOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm">
                            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white text-gray-900 w-full max-w-lg rounded-3xl p-8 shadow-2xl relative">
                                <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors">
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                                <h2 className="text-2xl font-bold mb-6">{editingJob ? 'Refine Job' : 'Quick Job Setup'}</h2>
                                <form onSubmit={editingJob ? handleUpdate : handleCreate} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2 col-span-2">
                                            <label className="text-sm font-bold text-gray-700">Company Name</label>
                                            <Input required value={formData.companyName} onChange={e => setFormData({ ...formData, companyName: e.target.value })} className="h-12 rounded-xl" placeholder="e.g., Grand Plaza Hotel" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Job Task</label>
                                        <Input required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="h-12 rounded-xl" placeholder="e.g., Deep Carpet Cleaning" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Service Address / Floor</label>
                                        <Input required value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} className="h-12 rounded-xl" placeholder="e.g., 123 Business Blvd, Suite 405" />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Assign Staff (separate by comma)</label>
                                        <Input value={formData.staffNames} onChange={e => setFormData({ ...formData, staffNames: e.target.value })} className="h-12 rounded-xl" placeholder="e.g., John Doe, Sarah Jane" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700">Priority</label>
                                            <select className="w-full h-12 rounded-xl border border-gray-200 px-3 bg-white" value={formData.priority} onChange={e => setFormData({ ...formData, priority: e.target.value })}>
                                                <option value="Low">Low</option>
                                                <option value="Medium">Medium</option>
                                                <option value="High">High</option>
                                                <option value="Urgent">Urgent</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700">Status</label>
                                            <select className="w-full h-12 rounded-xl border border-gray-200 px-3 bg-white" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                                                <option value="Not Started">Pending</option>
                                                <option value="In Progress">Active</option>
                                                <option value="Completed">Done</option>
                                            </select>
                                        </div>
                                    </div>

                                    <Button type="submit" className="w-full h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 rounded-xl mt-6 shadow-lg shadow-blue-200" disabled={submitting}>
                                        {submitting ? <Loader2 className="animate-spin mr-2" /> : (editingJob ? 'Update Order' : 'Launch Job')}
                                    </Button>
                                </form>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* Delete Confirmation Modal */}
                <AnimatePresence>
                    {isDeleteModalOpen && selectedJob && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm">
                            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white text-gray-900 w-full max-w-md rounded-3xl p-8 shadow-2xl text-center">
                                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Trash2 className="w-8 h-8 text-red-600" />
                                </div>
                                <h2 className="text-2xl font-bold mb-2">Delete Job?</h2>
                                <p className="text-gray-500 mb-8">Are you sure you want to delete <strong>{selectedJob.title}</strong>? This action cannot be undone.</p>
                                <div className="flex gap-4">
                                    <Button variant="outline" className="flex-1 h-12 rounded-xl" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
                                    <Button className="flex-1 h-12 rounded-xl bg-red-600 hover:bg-red-700" onClick={handleDelete} disabled={submitting}>
                                        {submitting ? <Loader2 className="animate-spin" /> : 'Delete'}
                                    </Button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* Bottom Nav */}
                <div className="fixed bottom-8 left-0 right-0 flex justify-center px-6 z-40">
                    <nav className="bg-[#0c1421]/90 backdrop-blur-2xl border border-white/10 h-20 px-10 rounded-[2.5rem] flex items-center justify-center gap-12 shadow-2xl shadow-black/50 w-full max-w-sm">
                        <NavItem to="/operations" icon={<LayoutDashboard />} label="Dashboard" />
                        <NavItem to="/jobs" icon={<Calendar />} label="Schedule" active />
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

function JobItem({ job, onEdit, onDelete }: { job: Job, onEdit: () => void, onDelete: () => void }) {
    return (
        <div className="bg-[#161c29] border border-white/5 rounded-[2rem] overflow-hidden group">
            <div className="h-48 relative">
                <img src={job.image} alt={job.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161c29] via-transparent to-transparent" />
            </div>
            <div className="p-6 space-y-4 -mt-2 relative">
                <div className="flex justify-between items-start">
                    <div className={`px-3 py-1 rounded-lg border ${job.priority === 'Urgent' ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500'}`}>
                        <span className="text-[10px] font-black uppercase tracking-wider">{job.status}</span>
                    </div>
                    <p className="text-white/40 text-xs font-medium">Due: {job.dueTime}</p>
                </div>
                <div className="space-y-1">
                    <h3 className="text-xl font-bold leading-tight">{job.client?.companyName || 'Client'} - {job.title?.split('-')[0] || job.title}</h3>
                    <p className="text-sm text-white/40 font-medium">{job.location}</p>
                </div>
                <div className="space-y-3 pt-2">
                    <div className="flex justify-between items-center">
                        <span className="text-[10px] text-white/40 font-black uppercase tracking-tighter">Checklist Completion</span>
                        <span className="text-blue-500 text-xs font-bold">{job.completionPercentage || 0}%</span>
                    </div>
                    <Progress value={job.completionPercentage || 0} className="h-1.5 bg-white/5 rounded-full" />
                </div>
                <div className="flex gap-3 pt-4 border-t border-white/5">
                    <Button variant="outline" size="sm" className="flex-1 rounded-xl bg-white/5 border-white/10 text-white hover:bg-white/10" onClick={onEdit}>
                        <Edit2 className="w-4 h-4 mr-2" /> Edit
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 rounded-xl bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20" onClick={onDelete}>
                        <Trash2 className="w-4 h-4 mr-2" /> Delete
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
