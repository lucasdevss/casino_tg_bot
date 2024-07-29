import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckResult } from '@nestjs/terminus';

@Controller('/health')
export class HealthController {
  @Get('/')
  @HealthCheck()
  check(): HealthCheckResult {
    return { status: 'ok', details: { ['dsa']: { status: 'up' } } };
  }
}
