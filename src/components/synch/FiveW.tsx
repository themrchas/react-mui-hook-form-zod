
import { useFormContext, get } from "react-hook-form";

import { useState } from "react";

import { Button, TextField, Typography, Grid, Box, Collapse, Stack } from '@mui/material';

import { GenericSearchableMultiCheckbox } from "./components/GenericSearchableMultiCheckBox";





export const FiveW = () => {

  const { watch, register, formState: { errors } } = useFormContext();

  const [state, setState] = useState<boolean>(false)

  const handleClick = (_event: React.MouseEvent<HTMLElement>) => {

    setState((prevState: boolean) =>  !prevState )

} //handleClick

  return (
    <>

    <Stack>

      <TextField

        id="fiveW-mission-statement"
        type="text"
        label="Mission Statement"
        {...register("fiveW.missionStatement")}

        helperText={get(errors, "fiveW.missionStatement")?.message ? (
          <Typography color="error">{get(errors, "fiveW.missionStatement")?.message}</Typography>
        ) : null}


      />
       
      <Box>
      <Button variant="contained" sx={{width: 1/4, mt: 3, mb: 2}} onClick={handleClick}>{state === false ? "Visited Organizations"  : "Close"}</Button>
      </Box>

        <Collapse in={state}>
      <GenericSearchableMultiCheckbox
        items={watch("fiveW.visitedOrganizations")}
        namePrefix="fiveW.visitedOrganizations"
      />
      </Collapse>
      

      
      <TextField
        sx={{mb: 2}}
        id="fiveW-desired-output"
        type="text"
        label="Desired Output"
        {...register("fiveW.desiredOutput")}
        helperText={get(errors, "fiveW.desiredOutput")?.message ? (
          <Typography color="error">{get(errors, "fiveW.desiredOutput")?.message}</Typography>
        ) : null}


      />

      <Grid container spacing={2}>
        <Grid size={{ xs: 4, md: 6 }}>
          <Box>


            <TextField

              id="fiveW-communication-plan-email"
              type="text"
              label="Email"
              {...register("fiveW.communicationPlan.email")}
              error={!!get(errors, "fiveW.communicationPlan.email")}
              helperText={get(errors, "fiveW.communicationPlan.email")?.message
                ? (
                  <Typography color="error" variant="caption">
                    {get(errors, "fiveW.communicationPlan.email")?.message}
                  </Typography>
                ) : null
              }
            />

          </Box>
        </Grid>

        <Grid size={{ xs: 4, md: 6 }}>
          <Box>


            <TextField

              id="fiveW-communication-plan-alternate-email"
              type="text"
              label="Alternate Email"
              {...register("fiveW.communicationPlan.alternateEmail")}
              error={!!get(errors, "fiveW.communicationPlan.alternateEmail")}
              helperText={get(errors, "fiveW.communicationPlan.alternateEmail")?.message
                ? (
                  <Typography color="error" variant="caption">
                    {get(errors, "fiveW.communicationPlan.alternateEmail")?.message}
                  </Typography>
                ) : null
              }
            />

          </Box>
        </Grid>



        <Grid size={{ xs: 4, md: 6 }}>
          <Box>


            <TextField

              id="fiveW-communication-plan-phone"
              type="text"
              label="Phone"
              {...register("fiveW.communicationPlan.phone")}
              error={!!get(errors, "fiveW.communicationPlan.phone")}
              helperText={get(errors, "fiveW.communicationPlan.phone")?.message
                ? (
                  <Typography color="error" variant="caption">
                    {get(errors, "fiveW.communicationPlan.phone")?.message}
                  </Typography>
                ) : null
              }
            />

          </Box>
        </Grid>

        <Grid size={{ md: 4, lg: 6 }}>
          <Box>


            <TextField

              id="fiveW-communication-plan-alternate-phone"
              type="text"
              label="Alternate Phone"
              {...register("fiveW.communicationPlan.alternatePhone")}
              error={!!get(errors, "fiveW.communicationPlan.alternatePhone")}
              helperText={get(errors, "fiveW.communicationPlan.alternatePhone")?.message
                ? (
                  <Typography color="error" variant="caption">
                    {get(errors, "fiveW.communicationPlan.alternatePhone")?.message}
                  </Typography>
                ) : null
              }
            />

          </Box>
        </Grid>
      </Grid>


</Stack>



    </>
  )

} //5W