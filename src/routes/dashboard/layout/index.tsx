import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { CssBaseline, Box, Toolbar, Container, Grid } from '@mui/material'
import { useAuth } from '~/contexts/AuthContext'
import Header from './Header'
import Drawer from './Drawer'

const drawerWidth = 240
const mdTheme = createTheme()

export default function authRoot() {
  const { auth } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(true)
  const toggleDrawer = () => {
    setOpen(!open)
  }

  useEffect(() => {
    if (!auth) {
      navigate('/signin')
    }
  }, [auth])

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header
          open={open}
          toggleDrawer={toggleDrawer}
          drawerWidth={drawerWidth}
        />
        <Drawer
          open={open}
          toggleDrawer={toggleDrawer}
          drawerWidth={drawerWidth}
        />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Outlet />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  )
}
