import { Controller, Get, HttpStatus } from '@nestjs/common';

@Controller()
export class HealthController {
  @Get()
  check() {
    return HttpStatus.OK;
  }
}
