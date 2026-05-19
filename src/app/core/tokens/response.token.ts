import { InjectionToken } from '@angular/core';
import type { Response } from 'express';

export const RESPONSE_TOKEN = new InjectionToken<Response>('Express Response Token');