import React, { useState } from 'react';
import { IncidentReport, IncidentStatus } from '../types/hsse';
import { 
  X, 
  AlertTriangle, 
  MapPin, 
  UserCheck, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  FileCheck2 
} from 'lucide-react';

interface IncidentDetailModalProps {
  incident: IncidentReport | null;
  onClose: () => void;
  onUpdateStatus: (incidentId: string, status: IncidentStatus) => void;
}

export const IncidentDetailModal: React.FC<IncidentDetailModalProps> = ({
  incident,
  onClose,
  onUpdateStatus,
}) => {
  if (!incident) return null;

  const [currentStatus, setCurrentStatus] = useState<IncidentStatus>(incident.status);

  const handleStatusChange = (newStatus: IncidentStatus) => {
    setCurrentStatus(newStatus);
    onUpdateStatus(incident.id, newStatus);
  };

  const isClosed = incident.status === 'Selesai (Closed)';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl my-8">
        
        {/* Header */}
        <div className="bg-slate-950 p-5 border-b border-slate-800 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="font-mono text-cyan-400 font-semibold">{incident.id}</span>
              <span aria-hidden="true">·</span>
              <span className="text-yellow-400 font-medium">{incident.category}</span>
              <span aria-hidden="true">·</span>
              <span>{incident.ultg}</span>
            </div>
            <h3 className="text-base font-bold text-white mt-1 leading-snug">
              {incident.title}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              <span>{incident.location}</span>
              <span aria-hidden="true">·</span>
              <span>{incident.incidentDate}, {incident.incidentTime}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto text-xs">
          
          {/* Status & Severity Bar */}
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-slate-400 block text-[11px]">Tingkat Keparahan</span>
              <span className="text-rose-400 font-bold text-sm block mt-0.5">{incident.severity}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Pelapor</span>
              <span className="text-white font-medium block mt-0.5">{incident.reporterName} ({incident.reporterRole})</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Investigator K3</span>
              <span className="text-cyan-400 font-medium block mt-0.5">{incident.investigator}</span>
            </div>
          </div>

          {/* Chronology Section */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <span className="font-semibold text-white block text-xs">Kronologi Terinci Kejadian</span>
            <p className="text-slate-300 leading-relaxed text-xs">
              {incident.chronology}
            </p>
          </div>

          {/* Root Cause Analysis (5 Why's) */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs">
              <FileCheck2 className="w-4 h-4" />
              <span>Analisis Akar Masalah (Root Cause Analysis - RCA)</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-xs">
              {incident.rootCause}
            </p>
          </div>

          {/* Actions: Immediate & Corrective (CAPA) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-400 font-semibold block text-xs">Tindakan Langsung di Lapangan</span>
              <p className="text-slate-200 text-xs leading-relaxed">
                {incident.immediateAction}
              </p>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
              <span className="text-cyan-400 font-semibold block text-xs">Tindakan Korektif & Preventif (CAPA)</span>
              <p className="text-slate-200 text-xs leading-relaxed">
                {incident.correctiveAction}
              </p>
              <div className="pt-2 border-t border-slate-800 flex justify-between text-[11px] text-slate-400">
                <span>PIC: <strong className="text-slate-300">{incident.capaPic}</strong></span>
                <span>Batas: <strong className="text-yellow-400 font-mono">{incident.targetDeadline}</strong></span>
              </div>
            </div>
          </div>

          {/* Status Update Controls */}
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2.5">
            <span className="font-semibold text-white block text-xs">Update Status Investigasi:</span>
            <div className="flex flex-wrap items-center gap-2">
              {(['Dilaporkan', 'Investigasi Berjalan', 'Tindakan Korektif (CAPA)', 'Selesai (Closed)'] as IncidentStatus[]).map((st) => (
                <button
                  key={st}
                  onClick={() => handleStatusChange(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-colors font-medium ${
                    incident.status === st
                      ? 'bg-cyan-600 text-white font-semibold'
                      : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-950 px-6 py-3.5 border-t border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-400">
            Status Terakhir: <strong className="text-white">{incident.status}</strong>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
