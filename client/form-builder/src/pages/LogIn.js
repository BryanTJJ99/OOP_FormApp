import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { Link, useNavigate, useLocation } from 'react-router-dom';
import { authLogIn, getCurrentUserRole } from '../services/AuthService';


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                OOP Form Builder
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

function LogIn() {

    const navigate = useNavigate();
    const location = useLocation();

    // arbitrary location to redirect to after login
    let to = location.state?.from?.pathname || "/ClientProject";


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        setMessage("");
        setLoading(true);

        const data = {
            username: username,
            password: password
        };

        if (data) {
            authLogIn(username, password)
                .then(
                    () => {

                        const userRole = getCurrentUserRole();
                        if (userRole === "ROLE_ADMIN" || userRole === "ROLE_APPROVER") {
                            to = "/Dashboard";
                        }
                        
                        navigate(to, { replace: true });
                        window.location.reload();
                    },
                    (error) => {
                        const resMessage =
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString();

                        setLoading(false);
                        setMessage(resMessage);
                    }
                );
        } else {
            setLoading(false);
            setMessage("Please enter a username and password");
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login to access your account
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} validate='true' sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={username}
                            onChange={onChangeUsername}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={onChangePassword}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={loading}
                        >
                            Sign In
                        </Button>
                        {loading && (
                            <div className="form-group">
                                <div className="alert alert-info" role="alert">
                                    Loading...
                                </div>
                            </div>
                        )}

                        {message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {message}
                                </div>
                            </div>
                        )}
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}

export default LogIn;