import { expect } from 'chai';
import Fetch, {
  sort,
  cast as castFactory,
} from '@/components/Json/Fetch';
import { shallowMount } from '@vue/test-utils';

describe('JsonFetch', () => {
  describe('sort', () => {
    const unsorted = [
      {
        name: 'Rafael',
        price: new Number('12.40'),
      },
      {
        name: 'Lucas',
        price: new Number('15.34'),
      },
      {
        name: 'Lia',
        price: new Number('11.12'),
      },
    ];

    const string_sorted = [
      {
        name: 'Lia',
        price: new Number('11.12'),
      },
      {
        name: 'Lucas',
        price: new Number('15.34'),
      },
      {
        name: 'Rafael',
        price: new Number('12.40'),
      },
    ];

    const number_sorted_asc = [
      {
        name: 'Lia',
        price: new Number('11.12'),
      },
      {
        name: 'Rafael',
        price: new Number('12.40'),
      },
      {
        name: 'Lucas',
        price: new Number('15.34'),
      },
    ];

    it('should sort alphabetically when property is a string', () => {
      const sorted = sort(unsorted, 'name');

      expect(sorted).to.be.an('array')
        .that.is.deep.equal(string_sorted);
    });

    it('should sort by comparison when property is a number respecting sort order', () => {
      const sorted = sort(unsorted, 'price', Number, 'asc');

      expect(sorted).to.be.an('array')
        .that.is.deep.equal(number_sorted_asc);
    });
  });

  describe('cast', () => {
    const data = [
      {
        name: 'Lucas',
        price: '11.22',
      },
    ];

    it('should return an array with casted data', () => {
      const cast = castFactory({
        price: Number,
      });

      const casted = cast(data);

      expect(casted).to.be.an('array')
        .that.is.not.empty;

      expect(casted[0]).to.have.property('name').that.is.a('string');
      expect(casted[0]).to.have.property('price').that.is.a('number');
    });
  });
});
