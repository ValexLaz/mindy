import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body('correo') correo: string,
    @Body('contraseña') contraseña: string,
  ) {
    const user = await this.authService.validateUser(correo, contraseña);
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req) {
    const token = req.headers.authorization?.split(' ')[1];
    return this.authService.logout(token);
  }
}
