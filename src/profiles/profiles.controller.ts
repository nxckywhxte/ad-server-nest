import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  async create(@Body() createProfileDto: CreateProfileDto) {
    return await this.profilesService.create(createProfileDto);
  }

  @Get()
  async findAll() {
    return await this.profilesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.profilesService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.profilesService.remove(id);
  }
}
