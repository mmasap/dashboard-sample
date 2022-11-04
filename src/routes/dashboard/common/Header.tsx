import { useState, MouseEvent } from 'react'
import { useAuth } from '~/contexts/AuthContext'
import { styled } from '@mui/material/styles'
import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Menu,
  MenuItem,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import NotificationsIcon from '@mui/icons-material/Notifications'
import SettingsIcon from '@mui/icons-material/Settings'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { DashboardCommonProps } from './types'

type AccountMenuProps = {
  anchorEl?: HTMLElement
  close: () => void
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'drawerWidth',
})<Partial<DashboardCommonProps>>(({ theme, open, drawerWidth }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const HeaderMenu = ({ anchorEl, close }: AccountMenuProps) => {
  const { logout } = useAuth()
  return (
    <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={close}>
      <MenuItem onClick={logout}>ログアウト</MenuItem>
    </Menu>
  )
}

const Header = ({ open, toggleDrawer, drawerWidth }: DashboardCommonProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement>()

  const handleClickMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(undefined)
  }

  return (
    <AppBar position="absolute" open={open} drawerWidth={drawerWidth}>
      <Toolbar
        sx={{
          pr: '24px', // keep right padding when drawer closed
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: '36px',
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          システム管理画面
        </Typography>
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton color="inherit">
          <SettingsIcon />
        </IconButton>
        <IconButton color="inherit" onClick={handleClickMenu}>
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
      <HeaderMenu anchorEl={anchorEl} close={handleClose} />
    </AppBar>
  )
}

export default Header
