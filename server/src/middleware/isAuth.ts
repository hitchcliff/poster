import { Context } from "../types"
import { MiddlewareFn } from "type-graphql"

const isAuth: MiddlewareFn<Context> = async ({context}, next): Promise<boolean> => {
	if(!context.req.session.userId) {
		throw new Error('not authenticated')
	}

	return next()
}

export default isAuth