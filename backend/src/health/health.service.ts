import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
    public getHealth(): { status: string } {
        return {
            status: 'ok',
        };
    }
}
