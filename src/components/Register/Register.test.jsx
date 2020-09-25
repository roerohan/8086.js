/* eslint-env jest */
import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';

import { Provider } from 'react-redux';

import emulator from 'emulator/emulator';
import store from 'store/store';
import Register from './index';

const registerName = 'AX';
const renderItem = ({ name = registerName, base = 16 } = {}) => {
    const utils = render(
        <Provider store={store}>
            <Register name={name} base={base} />
        </Provider>,
    );
    const input = utils.container.querySelector('input');

    return {
        input,
        ...utils,
    };
};

afterEach(() => {
    const { regs } = emulator.cpu.registers;
    Object.keys(regs).forEach((reg) => regs[reg].set(0));
    cleanup();
});

test('it renders with four digits', () => {
    const { input } = renderItem();

    expect(input.value.length).toBe(4);
});

test('it accepts user input, displays as hex, but stores as decimal', () => {
    const { input } = renderItem();

    expect(input.value).toBe('0000');

    fireEvent.change(input, { target: { value: 'ffff' } });
    fireEvent.blur(input);

    expect(input.value).toBe('ffff');
    expect(emulator.cpu.registers.regs[registerName].value).toBe(65535);
});

test('it pads input with zeros', () => {
    const { input } = renderItem();

    expect(input.value).toBe('0000');

    fireEvent.change(input, { target: { value: 'a' } });
    fireEvent.blur(input);

    expect(input.value).toBe('000a');
    expect(emulator.cpu.registers.regs[registerName].value).toBe(10);
});

test('it does not accept invalid input', () => {
    const { input } = renderItem();

    expect(input.value).toBe('0000');

    fireEvent.change(input, { target: { value: 'rwq' } });
    fireEvent.blur(input);

    expect(input.value).toBe('0000');
    expect(emulator.cpu.registers.regs[registerName].value).toBe(0);
});

test('it does not allow the user to enter a value greater than 2^16', () => {
    const { input } = renderItem();

    expect(input.value).toBe('0000');

    fireEvent.change(input, { target: { value: 'fffff' } });
    fireEvent.blur(input);

    expect(input.value).toBe('0000');
    expect(emulator.cpu.registers.regs[registerName].value).toBe(0);
});

test('it renders numbers with a different base', () => {
    const { input } = renderItem({ base: 2 });

    expect(input.value).toBe('0000');

    fireEvent.change(input, { target: { value: '11001' } });
    fireEvent.blur(input);

    expect(input.value).toBe('11001');
    expect(emulator.cpu.registers.regs[registerName].value).toBe(25);
});

test('allows the user to clear the register while entering a value', () => {
    const { input } = renderItem();

    expect(input.value).toBe('0000');

    fireEvent.change(input, { target: { value: '' } });

    expect(input.value).toBe('');
    expect(emulator.cpu.registers.regs[registerName].value).toBe(0);

    // sets back to '0000' on blur if register is empty
    fireEvent.blur(input);

    expect(input.value).toBe('0000');
    expect(emulator.cpu.registers.regs[registerName].value).toBe(0);

    // sets a value after clearing the input
    fireEvent.change(input, { target: { value: '' } });

    expect(input.value).toBe('');
    expect(emulator.cpu.registers.regs[registerName].value).toBe(0);

    fireEvent.change(input, { target: { value: 'abcd' } });
    fireEvent.blur(input);
    expect(emulator.cpu.registers.regs[registerName].value).toBe(43981);
});
