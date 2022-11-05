import { rest } from 'msw'
import users from './response/users.json'
import signin from './response/signin.json'

export const handlers = [
  rest.post('/signin', (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(1000), ctx.json(signin))
  }),
  rest.get('/users', (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(1000), ctx.json(users))
  }),
]
