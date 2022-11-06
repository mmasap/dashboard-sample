import { useEffect, useState, ChangeEvent, MouseEvent } from 'react'
import {
  Menu,
  MenuItem,
  IconButton,
  Paper,
  Table,
  TableRow,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Title from './Title'

type User = {
  id: string
  firstName: string
  lastName: string
  department: string
  email: string
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export default function UserTable() {
  const [userList, setUserList] = useState<User[]>([])
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  useEffect(() => {
    fetch(`${API_BASE_URL}/users`)
      .then((res) => res.json())
      .then((user) => {
        setUserList(user)
      })
  }, [])

  const handleClickMoreVert = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => setAnchorEl(null)

  const handleMenuItemClick = () => {
    const itemid = anchorEl?.getAttribute('itemid')
    if (itemid) {
      console.log(itemid)
    }
    setAnchorEl(null)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  // TODO フィルタ/編集削除/追加
  return (
    <Paper sx={{ p: 2 }}>
      <Title>ユーザー一覧</Title>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>社員コード</TableCell>
              <TableCell>社員名</TableCell>
              <TableCell>部署</TableCell>
              <TableCell colSpan={2}>アカウント</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <TableRow hover key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{`${user.lastName} ${user.firstName}`}</TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      itemID={user.id}
                      color="inherit"
                      onClick={handleClickMoreVert}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={userList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
      >
        <MenuItem onClick={handleMenuItemClick}>編集</MenuItem>
        <MenuItem onClick={handleMenuItemClick}>削除</MenuItem>
      </Menu>
    </Paper>
  )
}
