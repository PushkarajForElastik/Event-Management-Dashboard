import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Modal, Box, Stepper, Step, StepLabel, Button, TextField, Typography, Snackbar, Alert } from "@mui/material";

const steps = ["Enter Event Details", "Review & Submit"];

interface EventFormData {
  eventName: string;
  eventDate: string;
  eventVenue: string;
  ticketPrice: number;
  description: string;
}

const AddEventForm: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [successMessage, setSuccessMessage] = useState(false);

  const { control, handleSubmit, reset, watch, formState: { errors } } = useForm<EventFormData>();

  useEffect(() => {
    if (open) {
      reset();
      setActiveStep(0);
    }
  }, [open, reset]);

  const onSubmit = async (data: EventFormData) => {
    if (activeStep === 0) {
      setActiveStep(1);
    } else {
      try {
        const response = await fetch("https://6799e5a0747b09cdcccce6fe.mockapi.io/api/events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data), // Matches API field names
        });

        if (!response.ok) {
          throw new Error("Failed to save event");
        }

        const responseData = await response.json();
        console.log("Saved Event:", responseData);

        setSuccessMessage(true);
        reset();
        onClose();
      } catch (error) {
        console.error("Error submitting event:", error);
      }
    }
  };

  const eventData = watch();

  return (
    <>
      <Modal open={open} onClose={onClose}> 
        <Box sx={{ width: 500, bgcolor: "background.paper", p: 3, mx: "auto", mt: 10, borderRadius: 2, display: "flex", flexDirection: "column" }}>
          <Typography variant="h6" gutterBottom>Add Event</Typography>

          <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
            {steps.map((label) => (
              <Step key={label}><StepLabel>{label}</StepLabel></Step>
            ))}
          </Stepper>

          <Box sx={{ maxHeight: "400px", overflowY: "auto", paddingRight: "10px" }}>
            {activeStep === 0 ? (
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="eventName"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Event name is required" }}
                  render={({ field }) => <TextField {...field} label="Event Name" fullWidth margin="normal" error={!!errors.eventName} helperText={errors.eventName?.message} />}
                />

                <Controller
                  name="eventDate"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Event date is required" }}
                  render={({ field }) => <TextField {...field} label="Event Date" type="date" fullWidth margin="normal" InputLabelProps={{ shrink: true }} error={!!errors.eventDate} helperText={errors.eventDate?.message} />}
                />

                <Controller
                  name="eventVenue"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Venue is required" }}
                  render={({ field }) => <TextField {...field} label="Venue" fullWidth margin="normal" error={!!errors.eventVenue} helperText={errors.eventVenue?.message} />}
                />

                <Controller
                  name="ticketPrice"
                  control={control}
                  defaultValue={0}
                  rules={{ required: "Ticket price is required", min: { value: 0, message: "Price cannot be negative" } }}
                  render={({ field }) => <TextField {...field} label="Ticket Price" type="number" fullWidth margin="normal" error={!!errors.ticketPrice} helperText={errors.ticketPrice?.message} />}
                />

                <Controller
                  name="description"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Description is required", minLength: { value: 250, message: "Description must be at least 250 characters long" } }}
                  render={({ field }) => <TextField {...field} label="Description" multiline rows={4} fullWidth margin="normal" error={!!errors.description} helperText={errors.description?.message} />}
                />
              </form>
            ) : (
              <Box>
                <Typography><strong>Name:</strong> {eventData.eventName}</Typography>
                <Typography><strong>Date:</strong> {eventData.eventDate}</Typography>
                <Typography><strong>Venue:</strong> {eventData.eventVenue}</Typography>
                <Typography><strong>Price:</strong> ₹{eventData.ticketPrice}</Typography>
                <Typography><strong>Description:</strong> {eventData.description}</Typography>
              </Box>
            )}
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2, pt: 2, borderTop: "1px solid #ccc" }}>
            {activeStep === 0 ? (
              <>
                <Button onClick={onClose} color="inherit">Cancel</Button>
                <Button type="button" variant="contained" onClick={handleSubmit(onSubmit)}>Next</Button>
              </>
            ) : (
              <>
                <Button onClick={() => setActiveStep(0)}>Back</Button>
                <Button onClick={handleSubmit(onSubmit)} variant="contained">Submit</Button>
              </>
            )}
          </Box>
        </Box>
      </Modal>

      <Snackbar open={successMessage} autoHideDuration={3000} onClose={() => setSuccessMessage(false)}>
        <Alert severity="success" onClose={() => setSuccessMessage(false)}>Event added successfully!</Alert>
      </Snackbar>
    </>
  );
};

export default AddEventForm;
