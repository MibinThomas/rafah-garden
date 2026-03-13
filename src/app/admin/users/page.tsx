"use client";

import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Save, 
  X, 
  Loader2, 
  Users, 
  Search,
  Shield,
  Mail,
  MoreVertical
} from "lucide-react";
import { getUsers, updateUser, deleteUser } from "@/lib/actions";

export default function UserManagement() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const data = await getUsers();
    setUsers(data);
    setLoading(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    await updateUser(editingUser);
    setEditingUser(null);
    loadUsers();
    setIsSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Remove this user?")) {
      await deleteUser(id);
      loadUsers();
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-[#001D3D]">User Management</h2>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mt-1">Manage administrators & permissions</p>
        </div>
        <button 
          onClick={() => setEditingUser({ id: `user-${Date.now()}`, name: "", email: "", role: "Editor" })}
          className="bg-garden-green text-white px-8 py-4 rounded-2xl font-bold flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add New User</span>
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#F8F9FA] border-b border-gray-100">
            <tr>
              <th className="px-8 py-6 text-sm font-black text-gray-400 uppercase tracking-widest">User</th>
              <th className="px-8 py-6 text-sm font-black text-gray-400 uppercase tracking-widest">Email</th>
              <th className="px-8 py-6 text-sm font-black text-gray-400 uppercase tracking-widest">Role</th>
              <th className="px-8 py-6 text-sm font-black text-gray-400 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-cream rounded-xl flex items-center justify-center text-garden-green font-black">{user.name[0]}</div>
                    <span className="font-bold text-gray-900">{user.name}</span>
                  </div>
                </td>
                <td className="px-8 py-6 text-gray-500 font-medium">{user.email}</td>
                <td className="px-8 py-6">
                   <span className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-[10px] font-black uppercase tracking-widest">{user.role}</span>
                </td>
                <td className="px-8 py-6 flex gap-2">
                   <button onClick={() => setEditingUser(user)} className="p-3 text-gray-300 hover:text-garden-green transition-colors"><Edit2 size={18} /></button>
                   <button onClick={() => handleDelete(user.id)} className="p-3 text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-garden-green/40 backdrop-blur-md" onClick={() => setEditingUser(null)} />
          <div className="relative bg-white w-full max-w-md rounded-[3rem] shadow-2xl overflow-hidden">
            <header className="p-8 border-b border-gray-50 flex justify-between items-center">
              <h3 className="text-2xl font-black text-[#001D3D]">{editingUser.id.startsWith("user-") ? "New User" : "Edit User"}</h3>
              <button onClick={() => setEditingUser(null)} className="text-gray-400 hover:text-red-500 transition-colors"><X size={24} /></button>
            </header>
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Full Name</label>
                <input value={editingUser.name} onChange={e => setEditingUser({...editingUser, name: e.target.value})} className="w-full bg-[#F8F9FA] border border-gray-100 rounded-2xl px-6 py-4 font-bold" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Email Address</label>
                <input type="email" value={editingUser.email} onChange={e => setEditingUser({...editingUser, email: e.target.value})} className="w-full bg-[#F8F9FA] border border-gray-100 rounded-2xl px-6 py-4 font-bold" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">System Role</label>
                <select 
                  value={editingUser.role} 
                  onChange={e => setEditingUser({...editingUser, role: e.target.value})}
                  className="w-full bg-[#F8F9FA] border border-gray-100 rounded-2xl px-6 py-4 font-bold appearance-none cursor-pointer"
                >
                  <option>Super Admin</option>
                  <option>Editor</option>
                  <option>Viewer</option>
                </select>
              </div>
            </div>
            <footer className="p-8 border-t border-gray-50 bg-[#F8F9FA]">
               <button onClick={handleSave} disabled={isSaving} className="w-full bg-garden-green text-white py-5 rounded-2xl font-bold text-xl flex items-center justify-center space-x-3">
                  {isSaving ? <Loader2 className="animate-spin" size={24} /> : <Save size={24} />}
                  <span>Save Access Layer</span>
                </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}
