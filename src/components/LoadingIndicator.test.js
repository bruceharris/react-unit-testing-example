import React from 'react';
import { mount } from 'enzyme';
import LoadingIndicator from './LoadingIndicator'

describe('LoadingIndicator', () => {
  describe('when isLoading is false', () => {
    it('should render children', () => {
      const wrapper = mount(
        <LoadingIndicator isLoading={false}>
          <div>ahoy!</div>
        </LoadingIndicator>
      );
      expect(wrapper.html()).toEqual('<div>ahoy!</div>');
      wrapper.unmount();
    });
  });

  describe('when isLoading is true', () => {
    describe('given 200ms have not yet elapsed', () => {
      it('should render nothing', () => {
        const wrapper = mount(
          <LoadingIndicator isLoading={true}>
            <div>ahoy!</div>
          </LoadingIndicator>
        );
        expect(wrapper.html()).toBe(null);
        wrapper.unmount();
      });
    });

    describe('given 200ms have elapsed', () => {
      it('should render loading indicator', () => {
        jest.useFakeTimers();
        const wrapper = mount(
          <LoadingIndicator isLoading={true}>
            <div>ahoy!</div>
          </LoadingIndicator>
        );

        expect(setTimeout.mock.calls.length).toEqual(1);
        expect(setTimeout.mock.calls[0][1]).toEqual(200);

        jest.runAllTimers();

        expect(wrapper.html()).toBe('<div>loading...</div>');
        wrapper.unmount();
      });
    });
  });

  describe('on unmount', () => {
    it('should clear timeout', () => {
      jest.useFakeTimers();

      const mockTimerValue = 12345;
      setTimeout.mockReturnValue(mockTimerValue);

      const wrapper = mount(
        <LoadingIndicator isLoading={true}>
          <div>ahoy!</div>
        </LoadingIndicator>
      );

      wrapper.unmount();
      expect(clearTimeout.mock.calls.length).toEqual(1);
      expect(clearTimeout.mock.calls[0][0]).toEqual(mockTimerValue);
    });
  });
});
