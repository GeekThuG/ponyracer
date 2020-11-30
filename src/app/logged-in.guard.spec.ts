import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';

import { LoggedInGuard } from './logged-in.guard';
import { UserService } from './user.service';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';

describe('LoggedInGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule]
    });
  });

  it('should allow activation if user is logged in', () => {
    const userService = TestBed.inject(UserService);
    spyOn(userService, 'isLoggedIn').and.returnValue(true);

    const guard = TestBed.inject(LoggedInGuard);
    expect(guard.canActivate(undefined, undefined)).toBe(true);
  });

  it('should forbid activation if user is not logged in, and navigate to home', () => {
    const userService = TestBed.inject(UserService);
    spyOn(userService, 'isLoggedIn').and.returnValue(false);

    const router = TestBed.inject(Router);
    const urlTree: UrlTree = router.parseUrl('/');

    const guard = TestBed.inject(LoggedInGuard);
    expect(guard.canActivate(undefined, undefined)).toEqual(urlTree);
  });

  it('should be applied to the races route', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const guard = TestBed.inject(LoggedInGuard);
    spyOn(guard, 'canActivate').and.returnValue(false);

    const router = TestBed.inject(Router);
    router.navigateByUrl('/races');

    tick();
    fixture.detectChanges();
    expect(guard.canActivate).toHaveBeenCalled();
  }));
});