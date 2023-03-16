import Counter from "../components/ClientVendorProfile/Counter";
import { Box, Button, Card, Stack , Typography} from "@mui/material";
import PendingForms from "../components/ClientVendorProfile/PendingForms";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LoopIcon from '@mui/icons-material/Loop';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
const ClientVendorProfile= () => {
    return (
      <>
        <Box sx={{marginBottom:5,display:"flex",justifyContent:"flex-start" }} >
          <Box>
            <Typography variant="h3" fontWeight={"bold"}  >
              My Company
            </Typography>
          </Box>
            
        </Box>
        <Box>
        <Stack 
          display={"flex"}
          justifyContent={"center"}
          border = {"1px solid"}
          direction = "row"
        >
          
          <Card sx={{ height: 200,width:350,m:'50px', boxShadow:2,p:1, borderRadius:2, display:"flex", alignItems:"center" }}>
            <Box>
              <CheckCircleIcon sx={{height:50, width:50}}/>
            </Box>
            <Box>
              <Counter
                counterTitle={"Completed Projects"}
                count={2}
              />
            </Box>
          </Card>
          <Card sx={{ height: 200,width:350,m:'50px', boxShadow:2,borderRadius:2, display:"flex", alignItems:"center"}}>
            <Box>
              <LoopIcon sx={{height:50, width:50}}/>
            </Box>
            <Box>
              <Counter
                counterTitle={"Current Projects"}
                count={3}
              />
            </Box>
          </Card>
          <Card sx={{ height: 200,width:350,m:'50px', boxShadow:2,borderRadius:2, display:"flex", alignItems:"center"}}>
            <Box>
              <ErrorOutlineIcon sx={{height:50, width:50}} />
            </Box>
            <Box>
              <Typography variant='h6'>
                Pending Forms
              </Typography>
              <PendingForms 
              qtyPendingForms={4}
              ></PendingForms>
            </Box>
          </Card>
        </Stack>
        
        </Box>
      </>
    )
};

export default ClientVendorProfile