import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { Public } from '../auth/decorators/public.decorator';

@Controller('roles')
@Public()
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    return await this.rolesService.create(createRoleDto);
  }

  @Get()
  async findAll() {
    return await this.rolesService.findAll();
  }

  @Get(':roleName')
  async findOneByRoleName(@Param('roleName') roleName: string) {
    return await this.rolesService.findOneByRoleName(roleName);
  }

  @Get(':id')
  async findOneByRoleId(@Param('id') id: string) {
    return await this.rolesService.findOneByRoleId(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(id);
  }
}
