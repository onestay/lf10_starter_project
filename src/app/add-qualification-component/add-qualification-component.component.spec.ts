import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQualificationComponentComponent } from './add-qualification-component.component';

describe('AddQualificationComponentComponent', () => {
  let component: AddQualificationComponentComponent;
  let fixture: ComponentFixture<AddQualificationComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddQualificationComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddQualificationComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
