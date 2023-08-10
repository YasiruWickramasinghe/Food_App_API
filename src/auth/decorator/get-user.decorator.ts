import {
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

// Custom parameter decorator to retrieve user information from the request.

export const GetUser = createParamDecorator(
  (
    data: string | undefined, // Optional data parameter for specific user property.
    ctx: ExecutionContext,
  ) => {
    const request: Express.Request = ctx
      .switchToHttp()
      .getRequest(); // Get the incoming HTTP request from the context.

    if (data) {
      // If specific data property is provided, return that property from the user object.
      return request.user[data];
    }
    
    // If no specific data is provided, return the entire user object.
    return request.user;
  },
);
