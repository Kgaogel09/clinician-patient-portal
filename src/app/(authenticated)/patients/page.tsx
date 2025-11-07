"use client";

import { PatientsLookupTable } from "@/components/layout/patients-lookup-table/patients-lookup-table";
import { patientsInfo } from "@/data/data";
import { Patient } from "@/types/types";
import { useState } from "react";



function Patients() {
   const [patients, setPatients] = useState<Patient[]>(patientsInfo);

   const handlePatientDelete = (patientId: string) => {
      setPatients(prev => prev.filter(patient => patient.id !== patientId));
   };


   return (

      <div className="container mx-auto p-4 mt-8 h-screen">
         <h1 className="text-4xl font-bold">Patients Lookup</h1>
         <p className="text-lg text-gray-600">
            Manage and view all patient records in your practice.
         </p>

         <PatientsLookupTable
            patients={patients}
            onPatientDelete={handlePatientDelete}
         />
      </div>

   )
}

export default Patients