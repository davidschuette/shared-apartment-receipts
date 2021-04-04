import { MonthStringPipe } from './month-string.pipe';

describe('MonthStringPipe', () => {
  it('create an instance', () => {
    const pipe = new MonthStringPipe();
    expect(pipe).toBeTruthy();
  });
});
