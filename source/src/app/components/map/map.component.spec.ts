import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapComponent } from './map.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MapComponent],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    const m = new MapComponent(null, null)

    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('calculate midpoint 1', () => {
    const result = component.calculateMidPoint(10, 10)
    expect(result).toEqual(10)
  })

  it('calculate midpoint 2', () => {
    const result = component.calculateMidPoint(10, 0)
    expect(result).toEqual(5)
  })

  it('calculate midpoint 2', () => {
    const result = component.calculateMidPoint(10, null)
    expect(result).toEqual(5)
  })
});
