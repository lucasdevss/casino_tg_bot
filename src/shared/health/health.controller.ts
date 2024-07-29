import { Controller, Get, HttpStatus } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  check() {
    return HttpStatus.OK;
  }
}
