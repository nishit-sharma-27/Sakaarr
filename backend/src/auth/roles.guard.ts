import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Read the required roles defined on the controller route
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true; // If no roles are defined, let it pass
    }

    // Grab the request and the user object injected by your AuthGuard
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    // Check if the user's token payload contains the correct role
    if (!user || !user.role || !requiredRoles.includes(user.role)) {
      throw new ForbiddenException('Access Denied: You do not have the correct permissions for this action.');
    }
    
    return true;
  }
}