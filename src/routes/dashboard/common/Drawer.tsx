import { Link } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import {
  Toolbar,
  Drawer as MuiDrawer,
  List,
  Divider,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import {
  ChevronLeft as ChevronLeftIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
} from '@mui/icons-material'
import { DashboardCommonProps } from './types'

const StyledDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'drawerWidth',
})<Partial<DashboardCommonProps>>(({ theme, open, drawerWidth }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}))

const listItems = [
  { text: 'TOPページ', to: '/', icon: <DashboardIcon /> },
  { text: 'ユーザー', to: '/user', icon: <PeopleIcon /> },
]

const Drawer = ({ open, toggleDrawer, drawerWidth }: DashboardCommonProps) => {
  return (
    <StyledDrawer variant="permanent" open={open} drawerWidth={drawerWidth}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        {listItems.map((listItem) => (
          <ListItemButton key={listItem.to} component={Link} to={listItem.to}>
            <ListItemIcon>{listItem.icon}</ListItemIcon>
            <ListItemText primary={listItem.text} />
          </ListItemButton>
        ))}
      </List>
    </StyledDrawer>
  )
}

export default Drawer
