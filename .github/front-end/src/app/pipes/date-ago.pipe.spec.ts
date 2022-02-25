import { pipe } from 'rxjs';
import { DateAgoPipe } from './date-ago.pipe';

describe('DateAgoPipe', () => {
  const pipe = new DateAgoPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms x to y', () => {
    expect(pipe.transform(Date.now()-(50*1000))).toBe('50 seconds ago')
    expect(pipe.transform(Date.now()-(1*31536000*1000))).toBe('1 year ago')
    expect(pipe.transform(Date.now()-(25*1000))).toBe('Just now')
    expect(pipe.transform('Hello')).toBe('Hello')
  })
});
