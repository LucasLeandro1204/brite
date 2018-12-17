import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import Pagination from '@/components/Pagination';

const create = (props = {}, config = {}) => shallowMount(Pagination, {
  propsData: {
    total: 10,
    per_page: 10,
    current_page: 1,

    ...props,
  },

  ...config,
});

describe('Pagination', () => {
  it('should not render nav if total pages is less than 2', () => {
    const pagination = create();

    expect(pagination.contains('nav')).to.be.false;
  });

  it('should render nav if total pages is equal or greater than 2', () => {
    const pagination = create({
      total: 16,
    });

    expect(pagination.contains('nav')).to.be.true;
  });

  it('pages should return an object with correct page numbers', () => {
    const head = {
      0: 1,
      1: 2,
      2: 3,
      3: '...',
      4: 5,
    };

    const tail = {
      0: 1,
      1: '...',
      2: 3,
      3: 4,
      4: 5,
    };

    const middle = {
      0: 1,
      1: 2,
      2: 3,
      3: 4,
      4: 5,
    };

    const assertions = [
      {
        page: 1,
        expected: head,
      },
      {
        page: 2,
        expected: head,
      },
      {
        page: 3,
        expected: middle,
      },
      {
        page: 4,
        expected: tail,
      },
      {
        page: 5,
        expected: tail,
      },
    ];

    const pagination = create({
      total: 50,
    });

    assertions.forEach(({ page: current_page, expected }) => {
      pagination.setProps({
        current_page,
      });

      expect(pagination.vm.pages).to.deep.equal(expected);
    });
  });
});
