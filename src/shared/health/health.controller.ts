import { Controller, Get, HttpStatus } from '@nestjs/common';
import { HealthCheck } from '@nestjs/terminus';

@Controller('/health')
export class HealthController {
  @Get()
  @HealthCheck()
  check() {
    return HttpStatus.OK;
  }
}
