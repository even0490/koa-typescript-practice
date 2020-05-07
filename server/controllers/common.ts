import { BaseContext } from 'koa'
import ctxUtils from '../libs/ctx-utils'
// import { getAnchor, getUser } from '../models/common'

export default class GeneralController {
  public static async home(ctx: BaseContext) {
    const { device } = ctxUtils({ ctx })

    ctx.state = {
      title: 'Hello Koa 2!',
      device: device ? 'Personal Computer' : 'Mobile Phone',
      config: JSON.stringify({
        question: 'Who is my love?',
        answer: 'Is you?',
      }),
    }

    // await getAnchor({ ctx })
    // await getUser({ ctx })

    await ctx.render('index')
  }

  public static async notfound(ctx: BaseContext, next: Function) {
    const accepts = ctx.accepts('html', 'json')

    if (accepts === 'html') {
      ctx.state = {
        status: '404',
        message: 'Page Not Found',
      }
      await ctx.render('error')
      await next()
    } else if (accepts === 'json') {
      ctx.body = {
        code: 404,
        message: 'Page Not Found',
      }
    } else {
      ctx.type = 'text'
      ctx.body = 'Page Not Found'
    }
  }

  public static async forbidden(ctx: BaseContext, next: Function) {
    const accepts = ctx.accepts('html', 'json')

    if (accepts === 'html') {
      ctx.state = {
        status: '403',
        message: 'Forbidden',
      }
      await ctx.render('error')
      await next()
    } else if (accepts === 'json') {
      ctx.body = {
        code: 403,
        message: 'Forbidden',
      }
    } else {
      ctx.type = 'text'
      ctx.body = 'Forbidden'
    }
  }
}
