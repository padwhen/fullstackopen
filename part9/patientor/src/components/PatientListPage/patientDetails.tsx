import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography } from '@mui/material';
import EntryDetails from "./EntryDetails";

export const PatientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/patients/${id}`);
        setPatient(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching patient details:", error);
        setError("Error fetching patient details. Please try again later.");
        setLoading(false);
      }
    };

    fetchPatient();
  }, [id]);

  useEffect(() => {
    const fetchDiagnosisDetails = async () => {
      if (!patient || !patient.entries) return;

      const entriesWithDiagnosis = await Promise.all(
        patient.entries.map(async (entry: any) => {
          if (entry.diagnosisCodes && entry.diagnosisCodes.length > 0) {
            const diagnosisPromises = entry.diagnosisCodes.map(async (code: string) => {
              try {
                const response = await axios.get(`http://localhost:3001/api/diagnoses/${code}`);
                return { code, name: response.data.name };
              } catch (error) {
                console.error(`Error fetching diagnosis details for code ${code}:`, error);
                return { code, name: "Unknown" };
              }
            });

            const diagnoses = await Promise.all(diagnosisPromises);
            entry.diagnoses = diagnoses;
          }

          return entry;
        })
      );

      setPatient((prevPatient: any) => ({
        ...prevPatient,
        entries: entriesWithDiagnosis
      }));
    };

    fetchDiagnosisDetails();
  }, [patient]);

  return (
    <div>
      {loading ? (
        <Typography align="center">Loading...</Typography>
      ) : error ? (
        <Typography align="center" color="error">{error}</Typography>
      ) : patient ? (
        <div>
          <Typography variant="h3">Name: {patient.name}</Typography>
          <Typography>Ssn: {patient.ssn}</Typography>
          <Typography>Occupation: {patient.occupation}</Typography>
          <Typography variant="h4">Entries</Typography>
          {patient.entries && patient.entries.length > 0 ? (
            <div>
              {patient.entries.map((entry: any) => (
                <EntryDetails key={entry.id} entry={entry} />
              ))}
            </div>
          ) : (
            <Typography variant="body1">No entries found for this patient.</Typography>
          )}
        </div>
      ) : (
        <Typography align="center">No patient details found</Typography>
      )}
    </div>
  );
};

export default PatientDetails;
