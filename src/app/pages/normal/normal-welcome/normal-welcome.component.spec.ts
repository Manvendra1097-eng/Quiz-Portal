import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalWelcomeComponent } from './normal-welcome.component';

describe('NormalWelcomeComponent', () => {
  let component: NormalWelcomeComponent;
  let fixture: ComponentFixture<NormalWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NormalWelcomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NormalWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
