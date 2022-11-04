import { rest } from 'msw'
import users from './response/users.json'

export const handlers = [
  rest.post('/login', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        username: 'admin',
      })
    )
  }),
  rest.get('/users', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(users))
  }),
]
