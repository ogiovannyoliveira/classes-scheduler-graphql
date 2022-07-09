import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const { user } = GqlExecutionContext.create(ctx).getContext().req;

    return data ? user && user[data] : user;
  },
);
