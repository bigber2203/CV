import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { 
  Users, 
  Cpu, 
  Database, 
  User, 
  LogOut, 
  Mail, 
  MessageSquare, 
  FileText, 
  Bookmark, 
  Calendar,
  X,
  CheckCircle,
  Clock,
  RefreshCw
} from 'lucide-react';

export default function AdminDashboard() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [leads, setLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [notesText, setNotesText] = useState('');
  const [statusVal, setStatusVal] = useState('New');
  const [updateLoading, setUpdateLoading] = useState(false);
  const [leadsLoading, setLeadsLoading] = useState(false);

  const statusOptions = [
    'New',
    'Contacted',
    'Interested',
    'Meeting Scheduled',
    'Proposal Sent',
    'Client Won',
    'Client Lost'
  ];

  // 1. Session state observer
  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription?.unsubscribe();
  }, []);

  // 2. Fetch leads from database
  useEffect(() => {
    if (!supabase) return;
    if (session) {
      fetchLeads();
    }
  }, [session]);

  // Config check: Return safe UI state if Supabase environment variables are missing
  if (!supabase) {
    return (
      <div className="min-h-screen bg-[#08090D] flex items-center justify-center p-6 text-white font-mono text-center">
        <div className="max-w-md p-6 bg-red-950/20 border border-red-500/20 rounded-2xl space-y-4">
          <p className="text-red-500 font-bold text-lg">// CONFIGURATION ERROR</p>
          <p className="text-xs text-gray-400 leading-relaxed">
            Supabase environment keys are not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment variables to enable the administrator portal.
          </p>
        </div>
      </div>
    );
  }

  const fetchLeads = async () => {
    setLeadsLoading(true);
    try {
      const { data, error } = await supabase
        .from('project_leads')
        .select('*')
        .order('submission_date', { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (err) {
      console.error('Error fetching leads:', err.message);
    } finally {
      setLeadsLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
    } catch (err) {
      setLoginError(err.message || 'Login failed. Please verify credentials.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setLeads([]);
  };

  const handleOpenLead = (lead) => {
    setSelectedLead(lead);
    setNotesText(lead.notes || '');
    setStatusVal(lead.lead_status || 'New');
  };

  const handleCloseLead = () => {
    setSelectedLead(null);
  };

  const handleUpdateLead = async (e) => {
    e.preventDefault();
    if (!selectedLead) return;

    setUpdateLoading(true);
    try {
      const { error } = await supabase
        .from('project_leads')
        .update({
          lead_status: statusVal,
          notes: notesText
        })
        .eq('id', selectedLead.id);

      if (error) throw error;
      
      // Update local leads list
      setLeads((prev) => 
        prev.map((l) => 
          l.id === selectedLead.id ? { ...l, lead_status: statusVal, notes: notesText } : l
        )
      );

      setSelectedLead(null);
      fetchLeads(); // refresh aggregates
    } catch (err) {
      alert('Failed to update lead: ' + err.message);
    } finally {
      setUpdateLoading(false);
    }
  };

  // 3. Compute Metrics
  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.lead_status === 'New').length;

  // Services distribution computation
  const servicesCount = {};
  leads.forEach(l => {
    servicesCount[l.service] = (servicesCount[l.service] || 0) + 1;
  });
  const servicesList = Object.keys(servicesCount).map(srv => ({
    name: srv,
    percentage: totalLeads > 0 ? Math.round((servicesCount[srv] / totalLeads) * 100) : 0
  })).sort((a,b) => b.percentage - a.percentage);

  // Budget distribution computation
  const budgetCount = {
    '< ₹25k': 0,
    '₹25k - ₹50k': 0,
    '₹50k - ₹100k': 0,
    '> ₹100k': 0
  };
  
  leads.forEach(l => {
    const rawBudget = l.budget;
    // Map to normalized buckets
    if (rawBudget.includes('<') || rawBudget.toLowerCase().includes('under')) budgetCount['< ₹25k']++;
    else if (rawBudget.includes('50k') && rawBudget.includes('25k')) budgetCount['₹25k - ₹50k']++;
    else if (rawBudget.includes('100k') && rawBudget.includes('50k')) budgetCount['₹50k - ₹100k']++;
    else budgetCount['> ₹100k']++;
  });

  if (!session) {
    /* Login Form Screen */
    return (
      <div className="min-h-screen bg-[#08090D] flex items-center justify-center px-6 relative overflow-hidden text-left font-body">
        {/* Abstract grids */}
        <div className="absolute inset-0 tech-grid opacity-30"></div>
        <div className="absolute top-[20%] left-[25%] w-[40%] h-[40%] bg-accent-purple/10 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="w-full max-w-md clay-card p-8 rounded-3xl border border-white/10 relative z-10">
          <div className="border-b border-white/5 pb-4 mb-6 text-center">
            <h2 className="font-display font-black text-2xl text-white">BD_TELEMETRY // LOGIN</h2>
            <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mt-1">SECURE PORTAL MANAGEMENT ACCESS</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider">SECURE IDENTITY EMAIL</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#08090D] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-cyan transition-colors"
                placeholder="bigyat@deb.com"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider">ACCESS CODE PASSWORD</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#08090D] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-cyan transition-colors"
                placeholder="••••••••"
              />
            </div>

            {loginError && (
              <p className="text-xs font-mono text-[#EF4444] border border-[#EF4444]/20 p-2.5 rounded-lg bg-red-500/5">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-accent-cyan hover:bg-[#00c5dd] text-[#08090D] font-extrabold py-3.5 rounded-xl text-xs font-mono font-bold tracking-wider transition-all duration-300 uppercase cursor-pointer"
            >
              {loginLoading ? 'VERIFYING...' : 'DECRYPT ACCESS PORTAL'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  /* Authenticated Dashboard Screen */
  return (
    <div className="min-h-screen bg-[#08090D] text-left p-6 md:p-12 relative overflow-hidden font-body">
      {/* Background Grids */}
      <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-6">
          <div>
            <span className="text-[10px] font-mono font-bold text-accent-cyan tracking-wider uppercase">// MANAGEMENT CONTROL ROOM</span>
            <h1 className="font-display font-black text-3xl md:text-4xl text-white mt-1">
              BD_LEAD_CORE // TELEMETRY
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest hidden md:block">
              SESSION: {session.user.email}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 bg-white/5 hover:bg-[#EF4444]/15 border border-white/10 hover:border-[#EF4444]/30 px-4 py-2 rounded-xl text-xs font-mono text-gray-300 hover:text-[#EF4444] transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="clay-card p-6 rounded-2xl border border-white/5 flex items-center justify-between">
            <div>
              <p className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">TOTAL LEADS</p>
              <h2 className="font-display font-black text-3xl text-white mt-1">{totalLeads}</h2>
            </div>
            <div className="w-10 h-10 rounded-xl bg-accent-cyan/10 flex items-center justify-center text-accent-cyan">
              <Users className="w-5 h-5" />
            </div>
          </div>

          <div className="clay-card p-6 rounded-2xl border border-white/5 flex items-center justify-between border-l-accent-lime border-l-2">
            <div>
              <p className="text-[9px] font-mono text-gray-500 uppercase tracking-widest text-accent-lime font-bold">NEW LEADS</p>
              <h2 className="font-display font-black text-3xl text-white mt-1">{newLeads}</h2>
            </div>
            <div className="w-10 h-10 rounded-xl bg-accent-lime/10 flex items-center justify-center text-accent-lime animate-pulse">
              <Clock className="w-5 h-5" />
            </div>
          </div>

          <div className="clay-card p-6 rounded-2xl border border-white/5 flex items-center justify-between">
            <div>
              <p className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">HOT SERVICES</p>
              <h2 className="font-display font-black text-lg text-white mt-1 truncate max-w-[150px]">
                {servicesList[0] ? `${servicesList[0].name}` : 'N/A'}
              </h2>
            </div>
            <div className="w-10 h-10 rounded-xl bg-accent-blue/10 flex items-center justify-center text-accent-blue">
              <Cpu className="w-5 h-5" />
            </div>
          </div>

          <div className="clay-card p-6 rounded-2xl border border-white/5 flex items-center justify-between">
            <div>
              <p className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">DATABASE HEALTH</p>
              <h2 className="font-display font-black text-xs text-accent-lime mt-2 font-mono uppercase tracking-wide">
                SYNCED // OK
              </h2>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400">
              <Database className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Charts & Distributions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Services interest */}
          <div className="clay-card p-6 rounded-3xl border border-white/5 space-y-4">
            <h3 className="font-display font-bold text-base text-white border-b border-white/5 pb-2 uppercase tracking-wide">// SERVICES INTEREST</h3>
            
            <div className="space-y-3.5">
              {servicesList.length === 0 ? (
                <p className="text-xs font-mono text-gray-500 py-4 text-center">No service metrics recorded yet</p>
              ) : (
                servicesList.map((srv) => (
                  <div key={srv.name} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono text-gray-400">
                      <span>{srv.name}</span>
                      <span className="text-accent-cyan font-bold">{srv.percentage}%</span>
                    </div>
                    <div className="w-full bg-white/5 h-[6px] rounded-full overflow-hidden">
                      <div 
                        className="bg-accent-cyan h-full transition-all duration-500" 
                        style={{ width: `${srv.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Budget distribution */}
          <div className="clay-card p-6 rounded-3xl border border-white/5 space-y-4">
            <h3 className="font-display font-bold text-base text-white border-b border-white/5 pb-2 uppercase tracking-wide">// BUDGET ANALYSIS</h3>
            
            <div className="space-y-3.5">
              {Object.keys(budgetCount).map((bud) => {
                const count = budgetCount[bud];
                const percentage = totalLeads > 0 ? Math.round((count / totalLeads) * 100) : 0;
                return (
                  <div key={bud} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono text-gray-400">
                      <span>{bud}</span>
                      <span className="text-accent-purple font-bold">{percentage}% (${count})</span>
                    </div>
                    <div className="w-full bg-white/5 h-[6px] rounded-full overflow-hidden">
                      <div 
                        className="bg-accent-purple h-full transition-all duration-500" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Lead Table */}
        <div className="clay-card rounded-3xl border border-white/5 overflow-hidden">
          <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#0E1017]/40">
            <h3 className="font-display font-bold text-base text-white uppercase tracking-wide">// INCOMING CLIENT LEADS</h3>
            <button 
              onClick={fetchLeads}
              className="text-xs font-mono text-accent-cyan hover:underline flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '3s' }} /> Refresh Register
            </button>
          </div>

          <div className="overflow-x-auto w-full">
            {leadsLoading ? (
              <div className="p-12 text-center text-xs font-mono text-accent-cyan animate-pulse">STREAMING DATA PACKAGE...</div>
            ) : leads.length === 0 ? (
              <div className="p-12 text-center text-xs font-mono text-gray-500">No client submissions found inside register table.</div>
            ) : (
              <table className="w-full text-left border-collapse text-xs md:text-sm">
                <thead>
                  <tr className="border-b border-white/5 text-gray-500 font-mono uppercase text-[10px] bg-[#0E1017]/20">
                    <th className="p-4">Name</th>
                    <th className="p-4">Business / Company</th>
                    <th className="p-4">Service</th>
                    <th className="p-4">Budget</th>
                    <th className="p-4">Date</th>
                    <th className="p-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {leads.map((lead) => (
                    <tr
                      key={lead.id}
                      onClick={() => handleOpenLead(lead)}
                      className="hover:bg-[#12151F]/60 transition-colors cursor-pointer"
                    >
                      <td className="p-4 font-bold text-white">{lead.name}</td>
                      <td className="p-4 text-gray-300">{lead.company_name || 'N/A'}</td>
                      <td className="p-4 text-accent-cyan font-mono text-xs">{lead.service}</td>
                      <td className="p-4 text-accent-purple font-bold">{lead.budget}</td>
                      <td className="p-4 text-gray-400 font-mono text-xs">
                        {new Date(lead.submission_date).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: '2-digit'
                        })}
                      </td>
                      <td className="p-4 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold font-mono border ${
                          lead.lead_status === 'New' ? 'bg-[#EF4444]/10 border-[#EF4444]/20 text-[#EF4444]' :
                          lead.lead_status === 'Contacted' ? 'bg-accent-blue/10 border-accent-blue/20 text-accent-blue' :
                          lead.lead_status === 'Client Won' ? 'bg-accent-lime/10 border-accent-lime/20 text-accent-lime' :
                          lead.lead_status === 'Client Lost' ? 'bg-white/5 border-white/10 text-gray-500' :
                          'bg-accent-purple/10 border-accent-purple/20 text-accent-purple'
                        }`}>
                          {lead.lead_status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </div>

      {/* Expandable Lead Management Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-[#08090D]/90 backdrop-blur-sm z-50 flex items-center justify-center p-6 text-left font-body">
          
          <div className="w-full max-w-2xl clay-card rounded-3xl border border-white/10 overflow-hidden shadow-2xl relative animate-fade-in">
            {/* Modal Header */}
            <div className="bg-[#0E1017] border-b border-white/5 p-6 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-mono font-bold text-accent-cyan tracking-wider block uppercase">// CLIENT PROFILE REGISTRY</span>
                <h3 className="font-display font-black text-xl text-white mt-1">{selectedLead.name}</h3>
              </div>
              <button 
                onClick={handleCloseLead}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form / Detail Body */}
            <form onSubmit={handleUpdateLead} className="p-6 space-y-6">
              
              {/* Detailed Grid */}
              <div className="grid grid-cols-2 gap-4 text-xs md:text-sm">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block">EMAIL ADDRESS</span>
                  <a href={`mailto:${selectedLead.email}`} className="text-white hover:text-accent-cyan font-bold transition-colors flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-accent-cyan" /> {selectedLead.email}
                  </a>
                </div>
                
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block">PHONE NUMBER</span>
                  {selectedLead.phone ? (
                    <a href={`tel:${selectedLead.phone}`} className="text-white hover:text-accent-lime font-bold transition-colors flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5 text-accent-lime" /> {selectedLead.phone}
                    </a>
                  ) : (
                    <span className="text-gray-500">N/A</span>
                  )}
                </div>

                <div className="space-y-1 col-span-2 border-t border-white/5 pt-3">
                  <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block">BUSINESS / COMPANY</span>
                  <span className="text-white font-bold">{selectedLead.company_name || 'N/A'}</span>
                </div>

                <div className="space-y-1 border-t border-white/5 pt-3">
                  <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block">SERVICE NEEDED</span>
                  <span className="text-accent-cyan font-mono font-bold text-xs bg-accent-cyan/10 px-2 py-0.5 rounded border border-accent-cyan/15">{selectedLead.service}</span>
                </div>

                <div className="space-y-1 border-t border-white/5 pt-3">
                  <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block">APPROXIMATE BUDGET</span>
                  <span className="text-accent-purple font-mono font-bold text-xs bg-accent-purple/10 px-2 py-0.5 rounded border border-accent-purple/15">{selectedLead.budget}</span>
                </div>

                <div className="space-y-1 col-span-2 border-t border-white/5 pt-3">
                  <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block">PROJECT DETAILS</span>
                  <p className="text-gray-300 text-xs leading-relaxed bg-[#08090D] p-3 rounded-lg border border-white/5 white-space-pre-wrap">
                    {selectedLead.project_description}
                  </p>
                </div>

                <div className="space-y-1 col-span-2 border-t border-white/5 pt-3">
                  <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block">SUBMISSION TIMESTAMP</span>
                  <span className="text-gray-400 font-mono text-xs flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(selectedLead.submission_date).toLocaleString('en-IN')} (IST)
                  </span>
                </div>
              </div>

              {/* Status and Notes Fields */}
              <div className="border-t border-white/5 pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-mono text-gray-400 font-bold uppercase tracking-widest block">UPDATE LEAD STATUS</label>
                  <select 
                    value={statusVal}
                    onChange={(e) => setStatusVal(e.target.value)}
                    className="w-full bg-[#08090D] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-accent-cyan transition-colors"
                  >
                    {statusOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-[#08090D] text-white">{opt}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-mono text-gray-400 font-bold uppercase tracking-widest block">PERSONAL NOTES</label>
                  <textarea 
                    rows="3"
                    value={notesText}
                    onChange={(e) => setNotesText(e.target.value)}
                    className="w-full bg-[#08090D] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-accent-cyan transition-colors resize-none font-body"
                    placeholder="Add client callbacks, details, etc..."
                  />
                </div>
              </div>

              {/* Submit panel */}
              <div className="border-t border-white/5 pt-4 flex justify-end gap-3 bg-[#0E1017]/40 -mx-6 -mb-6 p-4">
                <button
                  type="button"
                  onClick={handleCloseLead}
                  className="px-5 py-2.5 rounded-xl text-xs font-mono text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                
                <button
                  type="submit"
                  disabled={updateLoading}
                  className="bg-accent-cyan hover:bg-[#00c5dd] text-[#08090D] font-extrabold px-6 py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider transition-all duration-300 uppercase cursor-pointer"
                >
                  {updateLoading ? 'SAVING...' : 'SAVE CHANGES'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      <style>{`
        .tech-grid {
          background-size: 50px 50px;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.015) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.015) 1px, transparent 1px);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fadeIn 0.25s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
