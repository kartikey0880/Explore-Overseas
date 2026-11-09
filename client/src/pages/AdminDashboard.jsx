import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, RefreshCw, Search, Trash2, LayoutDashboard, Users, Clock3, CheckCircle2 } from 'lucide-react';
import api from '../api';

export default function AdminDashboard(){
  const [stats,setStats]=useState({total:0,pending:0,inProgress:0,completed:0});
  const [items,setItems]=useState([]); const [search,setSearch]=useState(''); const [status,setStatus]=useState('');
  const [error,setError]=useState(''); const navigate=useNavigate();
  async function load(){setError('');try{const [s,e]=await Promise.all([api.get('/enquiries/stats'),api.get('/enquiries',{params:{search,status,limit:100}})]);setStats(s.data);setItems(e.data.items);}catch(err){setError(err.response?.data?.message||'Could not load dashboard data.');if(err.response?.status===401)logout();}}
  useEffect(()=>{load();},[search,status]);
  function logout(){localStorage.removeItem('eo_admin_token');localStorage.removeItem('eo_admin_user');navigate('/admin/login');}
  async function changeStatus(id,next){try{await api.patch(`/enquiries/${id}`,{status:next});load();}catch(e){setError(e.response?.data?.message||'Status update failed.');}}
  async function remove(id){if(!window.confirm('Delete this enquiry permanently?'))return;try{await api.delete(`/enquiries/${id}`);load();}catch(e){setError(e.response?.data?.message||'Delete failed.');}}
  const cards=[['Total enquiries',stats.total,Users],['Pending',stats.pending,Clock3],['In progress',stats.inProgress,LayoutDashboard],['Completed',stats.completed,CheckCircle2]];
  return <div className="admin-shell"><aside className="admin-sidebar"><Link className="brand admin-brand" to="/"><span className="brandmark">✈</span><span>EXPLORE OVERSEAS<small>ADMIN CONSOLE</small></span></Link><div className="side-label">WORKSPACE</div><div className="side-active"><LayoutDashboard size={17}/> Dashboard</div><Link className="side-link" to="/">↗ View website</Link><div className="side-bottom"><button onClick={logout}><LogOut size={16}/> Sign out</button></div></aside>
    <main className="admin-main"><header className="admin-top"><div><span className="kicker">OVERVIEW</span><h1>Dashboard</h1></div><button className="refresh-btn" onClick={load}><RefreshCw size={15}/> Refresh</button></header>
      {error&&<div className="notice error">{error}</div>}
      <div className="stats-grid">{cards.map(([label,value,Icon])=><div className="stat-card" key={label}><div className="stat-icon"><Icon/></div><span>{label}</span><b>{value}</b></div>)}</div>
      <section className="table-card"><div className="table-heading"><div><h2>Customer enquiries</h2><p>Review and manage incoming visa enquiries.</p></div><div className="table-filters"><div className="search-box"><Search size={15}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search customers..."/></div><select value={status} onChange={e=>setStatus(e.target.value)}><option value="">All statuses</option><option>Pending</option><option>In Progress</option><option>Completed</option><option>Rejected</option></select></div></div>
      <div className="table-scroll"><table><thead><tr><th>Customer</th><th>Destination</th><th>Visa type</th><th>Received</th><th>Status</th><th>Action</th></tr></thead><tbody>{items.length?items.map(item=><tr key={item._id}><td><b>{item.fullName}</b><small>{item.email}<br/>{item.phone}</small></td><td>{item.destination}<small>{item.countryOfResidence}</small></td><td>{item.visaType}</td><td>{new Date(item.createdAt).toLocaleDateString()}</td><td><select className={`status-select ${item.status.toLowerCase().replace(' ','-')}`} value={item.status} onChange={e=>changeStatus(item._id,e.target.value)}><option>Pending</option><option>In Progress</option><option>Completed</option><option>Rejected</option></select></td><td><button className="delete-btn" title="Delete enquiry" onClick={()=>remove(item._id)}><Trash2 size={16}/></button></td></tr>):<tr><td colSpan="6" className="empty-cell">No enquiries found yet.</td></tr>}</tbody></table></div></section>
      <p className="admin-footnote">Customer data is confidential. Only authorised staff should access this dashboard.</p>
    </main></div>;
}
