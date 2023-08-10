import { AuthGuard } from '@nestjs/passport';

// Custom guard class that extends the Passport AuthGuard with JWT strategy.

export class JwtGuard extends AuthGuard('jwt') {
  constructor() {
    // Call the constructor of the parent AuthGuard class.
    super(); 
  }
}
