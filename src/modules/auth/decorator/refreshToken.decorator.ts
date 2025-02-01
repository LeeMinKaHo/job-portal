import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const RefreshToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest(); // Lấy request object từ context
    const authorizationHeader = request.headers['authorization']; // Lấy header Authorization

    if (!authorizationHeader) {
      return null; // Nếu không có header Authorization, trả về null
    }

    // Giả sử header Authorization chứa dạng "Bearer <refreshToken>"
    const [, refreshToken] = authorizationHeader.split(' ');

    return refreshToken || null; // Trả về refreshToken hoặc null nếu không tồn tại
  },
);
