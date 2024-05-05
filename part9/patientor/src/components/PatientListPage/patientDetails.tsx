import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Typography } from '@mui/material';

export const PatientDetails = () => {
  const { id } = useParams<{ id: string }>(); // Extract the 'id' parameter from the URL
  const [patient, setPatient] = useState<any>(null); // State to hold the patient details
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
    return () => {
    };
  }, [id]);

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
        </div>
      ) : (
        <Typography align="center">No patient details found</Typography>
      )}
    </div>
  );
};

