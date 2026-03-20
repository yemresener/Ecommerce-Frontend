import { Directive, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


@Directive()
export class BrowserAware {
  protected platformId = inject(PLATFORM_ID);
  protected isBrowser() { return isPlatformBrowser(this.platformId); }
}