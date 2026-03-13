import Link from "next/link";
import { 
  Users, 
  ShoppingBag, 
  ArrowUpRight, 
  TrendingUp,
  Clock,
  ExternalLink,
  Globe
} from "lucide-react";

const stats = [
  { label: "Total Revenue", value: "$4,280.50", change: "+12.5%", icon: TrendingUp, color: "text-green-500" },
  { label: "Active Orders", value: "24", change: "+4", icon: ShoppingBag, color: "text-blue-500" },
  { label: "New Customers", value: "128", change: "+18%", icon: Users, color: "text-purple-500" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow group">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-[#F8F9FA] rounded-2xl group-hover:bg-garden-green group-hover:text-white transition-colors text-garden-green">
                  <Icon size={24} />
                </div>
                <span className={`text-sm font-black ${stat.color}`}>{stat.change}</span>
              </div>
              <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black text-gray-900">{stat.value}</h3>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
              <Clock size={20} className="text-dragonfruit-pink" />
              Recent Activity
            </h3>
            <button className="text-sm font-bold text-dragonfruit-pink hover:underline uppercase tracking-widest">View All</button>
          </div>
          <div className="space-y-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between p-4 rounded-2xl hover:bg-[#F8F9FA] transition-colors border border-transparent hover:border-gray-100 group">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-cream rounded-xl flex items-center justify-center text-lg">
                    📦
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">New order: #ORD-{1234 + item}</p>
                    <p className="text-xs text-gray-400">2.5kg Premium Dragon Fruit</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-garden-green">$45.00</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">5 mins ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link 
            href="/admin/products" 
            className="bg-garden-green p-8 rounded-[2.5rem] text-white flex flex-col justify-between hover:scale-[1.02] transition-all group"
          >
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <ShoppingBag size={24} />
            </div>
            <div className="space-y-2">
              <h4 className="text-xl font-black">Add Product</h4>
              <p className="text-white/60 text-sm">Grow your online harvest catalog.</p>
            </div>
          </Link>
          <Link 
            href="/admin/site-content" 
            className="bg-dragonfruit-pink p-8 rounded-[2.5rem] text-white flex flex-col justify-between hover:scale-[1.02] transition-all group"
          >
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <Globe size={24} />
            </div>
            <div className="space-y-2">
              <h4 className="text-xl font-black">Edit Content</h4>
              <p className="text-white/60 text-sm">Update text, images & hero sections.</p>
            </div>
          </Link>
          <div className="bg-white border-2 border-dashed border-gray-200 p-8 rounded-[2.5rem] flex flex-col items-center justify-center text-center space-y-4 col-span-1 sm:col-span-2">
             <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
               <ExternalLink size={24} />
             </div>
             <div>
               <p className="font-bold text-gray-900">View Live Site</p>
               <p className="text-sm text-gray-400">See your changes in real-time.</p>
             </div>
             <Link href="/" className="text-dragonfruit-pink font-bold flex items-center gap-1 group">
               Open Preview <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
