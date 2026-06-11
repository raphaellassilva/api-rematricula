import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { GoogleAuthGuard } from './google-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login com email e senha' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto.email, dto.senha);
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({ summary: 'Inicia login via Google OAuth2' })
  googleLogin() {}

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({ summary: 'Callback do Google OAuth2' })
  googleCallback(@Req() req: any) {
    return this.authService.loginGoogle(req.user);
  }
}