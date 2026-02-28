import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Wg } from './wg';

describe('Wg', () => {
  let component: Wg;
  let fixture: ComponentFixture<Wg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Wg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Wg);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
