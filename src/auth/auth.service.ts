import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(correo: string, contraseña: string): Promise<any> {
    console.log(`[AuthService] Validating user for correo: ${correo}`); 

    const usuario = await this.usuariosService.findByEmail(correo);

    console.log('[AuthService] Password received from input:', contraseña);
    console.log('[AuthService] User found in DB:', usuario); 

    if (usuario) {
      console.log('[AuthService] Hashed password from DB:', usuario.contraseña); 
    } else {
       console.log('[AuthService] User not found in database.');
    }

    if (usuario && usuario.contraseña && contraseña && await bcrypt.compare(contraseña, usuario.contraseña)) {
      
      const { contraseña: _, ...result } = usuario; 
      console.log('[AuthService] Password match. Validation successful.');
      return result;
    }

    console.log('[AuthService] Password mismatch or user/hash missing.'); 
    throw new UnauthorizedException('Credenciales inválidas');
  }

  async login(usuario: any) {
    const payload = {
      correo: usuario.correo,
      sub: usuario.id_usuario,
      rol: usuario.rol?.nombre || usuario.rol, 
    };

    return {
      access_token: this.jwtService.sign(payload),
      usuario: {
        id_usuario: usuario.id_usuario,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol?.nombre || usuario.rol, 
      },
    };
  }

  async logout(token: string) {
  }
}