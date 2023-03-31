import React from "react";
import { styled, useTheme, ThemeProvider } from "@mui/material/styles";
import { Container, Grid, Paper, Typography } from "@mui/material";
import { getCurrentUser } from "../services/AuthService";

const Settings = () => {
    const currentUser = getCurrentUser();
    const theme = useTheme();
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.secondary,
    }));

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Item>
                            <Typography variant="h4" component="div" gutterBottom>
                                Profile
                            </Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={12}>
                        <Item>
                            <Typography variant="h6" component="div" gutterBottom>
                                Username
                            </Typography>
                            <Typography variant="h6" component="div" gutterBottom>
                                {currentUser.username}
                            </Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={12}>
                        <Item>
                            <Typography variant="h6" component="div" gutterBottom>
                                Email
                            </Typography>
                            <Typography variant="h6" component="div" gutterBottom>
                                {currentUser.email}
                            </Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={12}>
                        <Item>
                            <Typography variant="h6" component="div" gutterBottom>
                                Role
                            </Typography>
                            <Typography variant="h6" component="div" gutterBottom>
                                {currentUser.roles}
                            </Typography>
                        </Item>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
};

export default Settings;