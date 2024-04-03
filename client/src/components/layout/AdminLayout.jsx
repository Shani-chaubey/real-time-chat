import { Grid } from "@mui/material";
import React from "react";

const AdminLayout = ({ children }) => {
  return (
    <Grid container minHeight={"100vh"}>
      <Grid
        item
        md={4}
        lg={3}
        sx={{
          display: { xs: "none", sm: "block" },
        }}
        
      >
        <Sidebar />
      </Grid>
    </Grid>
  );
};

const Sidebar = ()=>{
  return(
    <div>Sidebar</div>
    )
}

export default AdminLayout;
