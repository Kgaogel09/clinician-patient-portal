"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import { useAuth } from "@/context/auth";
import { Patient } from "@/types/types";
import { Trash2Icon, PencilIcon, Search, Plus } from "lucide-react";
import { useState } from "react";

interface PatientsLookupTableProps {
  patients: Patient[];
  onPatientDelete?: (patientId: string) => void;
  isSnapshot?: boolean;
  maxRows?: number;
}

export function PatientsLookupTable({
  patients,
  onPatientDelete,
  isSnapshot = false,
  maxRows = 5
}: PatientsLookupTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth();

  const filteredPatients = isSnapshot
    ? patients.slice(0, maxRows)
    : patients.filter(patient =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <>
      {!isSnapshot && (
        <div className="flex flex-col sm:flex-row justify-between gap-4 my-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search patients by name, ID, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-slate-100 focus-visible:ring-2 focus-visible:ring-gray-300"
            />
          </div>
          <Button
            variant="outline"
            className="text-white bg-green-600 font-bold"
          >
            <Plus className="h-3 w-3" />
            Add Patient
          </Button>
        </div>
      )}

      <div className="bg-white overflow-x-auto w-full">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-100 text-gray-600">
              <TableHead className={`font-semibold ${!isSnapshot ? 'pl-6' : 'p-0'}`}
              >PATIENT NAME</TableHead>
              <TableHead className="font-semibold">PATIENT ID</TableHead>
              <TableHead className="font-semibold">EMAIL</TableHead>
              {!isSnapshot && <TableHead className="font-semibold">CREATED AT</TableHead>}
              <TableHead className="font-semibold">CLINICIAN</TableHead>
              {!isSnapshot && <TableHead className="font-semibold text-right pr-6">ACTIONS</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients.map((patient) => (
              <TableRow className="hover:bg-transparent border-gray-100 text-gray-600" key={patient.id}>
                <TableCell className={`font-medium text-black ${!isSnapshot ? 'pl-6' : 'p-0'}`}>{patient.name}</TableCell>
                <TableCell>{patient.id}</TableCell>
                <TableCell>{patient.email}</TableCell>
                {!isSnapshot && <TableCell>{patient.createdAt}</TableCell>}
                <TableCell>{user?.displayName}</TableCell>
                {!isSnapshot && onPatientDelete && (
                  <TableCell className="text-right pr-4">
                    <div className="flex justify-end gap-2">
                      <Button variant='ghost' size='icon' className='rounded-full' aria-label={`product-${patient.id}-edit`}>
                        <PencilIcon className="h-3 w-3 text-blue-500" />
                      </Button>
                      <Button onClick={() => onPatientDelete(patient.id)} variant='ghost' size='icon' className='rounded-full' aria-label={`product-${patient.id}-remove`}>
                        <Trash2Icon className="h-3 w-3 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}