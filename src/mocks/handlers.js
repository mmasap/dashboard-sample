import { rest } from 'msw'
import users from './response/users.json'
import login from './response/login.json'

export const handlers = [
  rest.post('/login', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(login))
  }),
  rest.get('/users', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(users))
  }),
]
