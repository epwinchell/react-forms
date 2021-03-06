import React from 'react';
import { mount } from 'enzyme';

import FormRenderer, { componentTypes } from '@data-driven-forms/react-form-renderer';

import FormTemplate from '../files/form-template';
import componentMapper from '../files/component-mapper';
import { Select, MultiSelect } from 'carbon-components-react';
import { multiOnChange } from '../files/select';

describe('<Select />', () => {
  it('renders select', () => {
    const schema = {
      fields: [
        {
          component: componentTypes.SELECT,
          name: 'select',
          label: 'select',
          options: [
            { label: 'option 1', value: 1 },
            { label: 'option 2', value: 2 }
          ]
        }
      ]
    };

    const wrapper = mount(
      <FormRenderer onSubmit={jest.fn()} FormTemplate={(props) => <FormTemplate {...props} />} schema={schema} componentMapper={componentMapper} />
    );

    expect(wrapper.find(Select)).toHaveLength(1);
  });

  it('renders multi select', () => {
    const schema = {
      fields: [
        {
          component: componentTypes.SELECT,
          name: 'select',
          label: 'select',
          initialValue: [1],
          isMulti: true,
          options: [
            { label: 'option 1', value: 1 },
            { label: 'option 2', value: 2 }
          ]
        }
      ]
    };

    const wrapper = mount(
      <FormRenderer onSubmit={jest.fn()} FormTemplate={(props) => <FormTemplate {...props} />} schema={schema} componentMapper={componentMapper} />
    );

    expect(wrapper.find(MultiSelect)).toHaveLength(1);
  });

  it('renders multi select - searchable', () => {
    const schema = {
      fields: [
        {
          component: componentTypes.SELECT,
          name: 'select',
          label: 'select',
          initialValue: [1],
          isMulti: true,
          isSearchable: true,
          options: [
            { label: 'option 1', value: 1 },
            { label: 'option 2', value: 2 }
          ]
        }
      ]
    };

    const wrapper = mount(
      <FormRenderer onSubmit={jest.fn()} FormTemplate={(props) => <FormTemplate {...props} />} schema={schema} componentMapper={componentMapper} />
    );

    expect(wrapper.find(MultiSelect.Filterable)).toHaveLength(1);
  });

  describe('multichange', () => {
    const input = {
      onChange: jest.fn()
    };

    beforeEach(() => {
      input.onChange.mockReset();
    });

    it('simpleValue', () => {
      multiOnChange(input, true)({ selectedItems: [{ value: '123' }, { value: '345' }] });

      expect(input.onChange).toHaveBeenCalledWith(['123', '345']);
    });

    it('not simple value', () => {
      multiOnChange(input, false)({ selectedItems: [{ value: '123' }, { value: '345' }] });

      expect(input.onChange).toHaveBeenCalledWith([{ value: '123' }, { value: '345' }]);
    });
  });
});
