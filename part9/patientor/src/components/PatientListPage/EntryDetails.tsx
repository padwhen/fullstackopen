import React from "react";
import { Entry, HealthCheckEntry, HospitalEntry, OccuptationalHealthcareEntry, HealthCheckRating } from "../../types";
import { Typography, Card, CardContent, Box } from "@mui/material";
import { LocalHospital } from "@mui/icons-material";
import { Work } from "@mui/icons-material";
import { Favorite } from "@mui/icons-material";

const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
}

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
      case "Hospital":
        return <HospitalEntryDetails entry={entry} />;
      case "OccupationalHealthcare":
        return <OccuptationalHealthcareEntryDetails entry={entry} />;
      case "HealthCheck":
        return <HealthCheckEntryDetails entry={entry} />;
      default:
        return assertNever(entry);
    }
  };
  

const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({ entry }) => (
    <Card>
        <CardContent>
            <Box display="flex" alignItems="center">
                <LocalHospital />
                <Typography variant="h6">{entry.date} - Hospital Entry</Typography>
            </Box>
            <Typography>{entry.description}</Typography>
            <Typography>Discharge date: {entry.discharge.date}</Typography>
            <Typography>Criteria: {entry.discharge.criteria}</Typography>
        </CardContent>
    </Card>
)

const OccuptationalHealthcareEntryDetails: React.FC<{ entry: OccuptationalHealthcareEntry }> = ({ entry }) => (
    <Card>
        <CardContent>
            <Box display="flex" alignItems="center">
                <Work />
                <Typography variant="h6">{entry.date} - Occupational Healthcare Entry</Typography>
            </Box>
            <Typography>{entry.description}</Typography>
            <Typography>Employer: {entry.employerName}</Typography>
            {entry.sickLeave && (
                <Typography>Sick leave: {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</Typography>
            )}
        </CardContent>
    </Card>
)

const HealthCheckEntryDetails: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
    const healthCheckRatingText = (rating: HealthCheckRating): string => {
        switch (rating) {
          case HealthCheckRating.Healthy:
            return "Healthy";
          case HealthCheckRating.LowRisk:
            return "Low Risk";
          case HealthCheckRating.HighRisk:
            return "High Risk";
          case HealthCheckRating.CriticalRisk:
            return "Critical Risk";
          default:
            return assertNever(rating);
        }
    };
    return (
        <Card>
            <CardContent>
                <Box display="flex" alignItems="center">
                    <Favorite />
                    <Typography variant="h6">{entry.date} - Health Check Entry</Typography>
                </Box>
                <Typography>{entry.description}</Typography>
                <Typography>Health rating: {healthCheckRatingText(entry.healthCheckRating)}</Typography>
            </CardContent>
        </Card>
    )
}

export default EntryDetails