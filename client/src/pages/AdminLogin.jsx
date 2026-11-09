import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LockKeyhole, ArrowLeft } from 'lucide-react';
import api from '../api';

export default function AdminLogin() {
  const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
  const [error,setError]=useState(''); const [loading,setLoading]=useState(false); const navigate=useNavigate();
  async function submit(e){e.preventDefault();setError('');setLoading(true);try{const {data}=await api.post('/auth/login',{email,password});localStorage.setItem('eo_admin_token',data.token);localStorage.setItem('eo_admin_user',JSON.stringify(data.admin));navigate('/admin');}catch(err){setError(err.response?.data?.message||'Unable to sign in. Check the API connection.');}finally{setLoading(false);}}
  return <main className="login-page"><div className="login-card"><Link className="back-home" to="/"><ArrowLeft size={15}/> Back to website</Link><div className="login-mark"><LockKeyhole/></div><div className="kicker">EXPLORE OVERSEAS</div><h1>Admin sign in</h1><p className="muted">Access your enquiry management dashboard.</p>{error&&<div className="notice error">{error}</div>}<form onSubmit={submit}><label>Email address<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required placeholder="admin@company.com"/></label><label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required placeholder="Enter your password"/></label><button className="btn submit-btn" disabled={loading}>{loading?'Signing in...':'Sign in securely'}</button></form><small className="privacy-note">Authorised personnel only.</small></div></main>;
}
