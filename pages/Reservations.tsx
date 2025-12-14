import React from 'react';
import { Calendar, Plus, Video, Users, User } from 'lucide-react';
import { RESERVATIONS, EMPLOYEES } from '../services/mockData';

export const Reservations: React.FC = () => {

  const myReservations = RESERVATIONS.filter(r => r.reservedBy === 'E-004' || r.reservedBy === 'E-005');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Reservations</h1>
        <p className="text-slate-500 mt-1">Book conference rooms, desks, and other workplace resources.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Booking Form */}
          <div className="lg:col-span-1 bg-white p-6 rounded-xl border border-slate-200 shadow-sm self-start">
             <h2 className="text-lg font-bold text-slate-900">Book a Space</h2>
             <form className="mt-4 space-y-4">
                <div>
                    <label className="text-sm font-medium text-slate-700">Space Type</label>
                    <div className="flex gap-2 mt-2">
                        <button type="button" className="flex-1 py-2 text-sm border bg-blue-50 border-blue-200 text-blue-700 rounded-lg font-semibold">Conference Room</button>
                        <button type="button" className="flex-1 py-2 text-sm border hover:bg-slate-100 rounded-lg">Desk</button>
                    </div>
                </div>
                 <div><label className="text-sm font-medium text-slate-700">Date</label><input type="date" defaultValue={new Date().toISOString().split('T')[0]} className="w-full mt-1 p-2 border rounded-lg bg-slate-50"/></div>
                 <div className="grid grid-cols-2 gap-2">
                    <div><label className="text-sm font-medium text-slate-700">Start Time</label><input type="time" defaultValue="10:00" className="w-full mt-1 p-2 border rounded-lg bg-slate-50"/></div>
                    <div><label className="text-sm font-medium text-slate-700">End Time</label><input type="time" defaultValue="11:00" className="w-full mt-1 p-2 border rounded-lg bg-slate-50"/></div>
                 </div>
                 <button type="button" className="w-full py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">Find Available Spaces</button>
             </form>
          </div>
          {/* My Reservations */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm self-start">
             <div className="p-4 border-b"><h2 className="text-lg font-bold text-slate-900">My Upcoming Reservations</h2></div>
             <div className="divide-y divide-slate-100">
                {myReservations.map(res => {
                    const employee = EMPLOYEES.find(e => e.id === res.reservedBy);
                    const isRoom = res.spaceName.includes('Room');
                    return (
                        <div key={res.id} className="p-4 flex items-center justify-between hover:bg-slate-50/50">
                            <div className="flex items-center gap-4">
                               <div className={`p-3 rounded-lg ${isRoom ? 'bg-purple-100 text-purple-600' : 'bg-green-100 text-green-600'}`}>
                                 {isRoom ? <Users size={20} /> : <User size={20} />}
                               </div>
                               <div>
                                 <div className="font-semibold text-slate-900">{res.spaceName}</div>
                                 <div className="text-sm text-slate-500">{res.date} from {res.startTime} to {res.endTime}</div>
                               </div>
                            </div>
                            <div className="flex items-center gap-2">
                               <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-800 rounded-full">{res.status}</span>
                               <button className="text-sm font-medium text-slate-500 hover:text-red-600">Cancel</button>
                            </div>
                        </div>
                    )
                })}
             </div>
          </div>
      </div>
    </div>
  );
};
