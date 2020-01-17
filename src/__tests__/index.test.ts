import truncand from '../index';

describe('truncand', () => {
  describe('with default options', () => {
    it('should return empty string if array is empty', () => {
      expect(truncand([], 4)).toEqual('');
    });
    it('should return the element if array length is one', () => {
      expect(truncand(['Oksana'], 4)).toEqual('Oksana');
    });
    it('should join with `and` if there are two elements', () => {
      expect(truncand(['Oksana', 'Ada'], 4)).toEqual('Oksana and Ada');
    });
    it('should join with comma and `and` if there are more than two elements', () => {
      expect(truncand(['Oksana', 'Ada', 'Marie'], 4)).toEqual('Oksana, Ada and Marie');
    });
    it('should truncate if limit is greater than element count', () => {
      const items = ['Oksana', 'Ada', 'Marie', 'Rosalind'];
      expect(truncand(items, 0)).toEqual('');
      expect(truncand(items, 1)).toEqual('Oksana and 3 more');
      expect(truncand(items, 2)).toEqual('Oksana, Ada and 2 more');
      expect(truncand(items, 3)).toEqual('Oksana, Ada, Marie and 1 more');
    });
  });
  describe('with useAnd false', () => {
    it('should always join with comma ', () => {
      expect(truncand(['Oksana', 'Ada'], 4, { useAnd: false })).toEqual('Oksana, Ada');
      expect(truncand(['Oksana', 'Ada', 'Marie'], 4, { useAnd: false })).toEqual('Oksana, Ada, Marie');
      expect(truncand(['Oksana', 'Ada', 'Marie', 'Rosalind'], 3, { useAnd: false })).toEqual(
        'Oksana, Ada, Marie, 1 more',
      );
    });
  });
  describe('with oxfordComma true', () => {
    it('should not have comma if there are two items', () => {
      expect(truncand(['Oksana', 'Ada'], 4, { oxfordComma: true })).toEqual('Oksana and Ada');
    });
    it('should have comma before `and` if there are at least 3 items', () => {
      expect(truncand(['Oksana', 'Ada', 'Marie'], 4, { oxfordComma: true })).toEqual('Oksana, Ada, and Marie');
    });
    it('should have `and` before more', () => {
      expect(truncand(['Oksana', 'Ada', 'Marie', 'Rosalind'], 3, { oxfordComma: true })).toEqual(
        'Oksana, Ada, Marie, and 1 more',
      );
    });
  });
  describe('with appendRemainingCount false', () => {
    it('should not append remaining count', () => {
      expect(truncand(['Oksana', 'Ada', 'Marie'], 1, { appendRemainingCount: false })).toEqual('Oksana');
      expect(truncand(['Oksana', 'Ada', 'Marie'], 2, { appendRemainingCount: false })).toEqual('Oksana and Ada');
      expect(truncand(['Oksana', 'Ada', 'Marie', 'Rosalind'], 3, { appendRemainingCount: false })).toEqual(
        'Oksana, Ada and Marie',
      );
    });
  });
  describe('with custom descriptor', () => {
    it('should use singular custom descriptor', () => {
      expect(
        truncand(['Oksana', 'Ada', 'Marie'], 2, { descriptorSingular: 'other', descriptorPlural: 'others' }),
      ).toEqual('Oksana, Ada and 1 other');
    });
    it('should use plural custom descriptor', () => {
      expect(
        truncand(['Oksana', 'Ada', 'Marie'], 1, { descriptorSingular: 'other', descriptorPlural: 'others' }),
      ).toEqual('Oksana and 2 others');
    });
  });
});
