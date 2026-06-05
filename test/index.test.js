'use strict';

const { generatePassword, CHARSET } = require('../src/index');

describe('generatePassword', () => {
  test('возвращает пароль длиной по умолчанию (16 символов)', () => {
    const pwd = generatePassword();
    expect(typeof pwd).toBe('string');
    expect(pwd).toHaveLength(16);
  });

  test('учитывает заданную длину', () => {
    expect(generatePassword({ length: 32 })).toHaveLength(32);
    expect(generatePassword({ length: 1 })).toHaveLength(1);
  });

  test('использует только выбранные наборы символов', () => {
    const pwd = generatePassword({
      length: 200,
      lowercase: true,
      uppercase: false,
      numbers: false,
      symbols: false,
    });
    expect(pwd).toMatch(/^[a-z]+$/);
  });

  test('содержит только цифры, если выбраны только цифры', () => {
    const pwd = generatePassword({
      length: 100,
      lowercase: false,
      uppercase: false,
      numbers: true,
      symbols: false,
    });
    expect(pwd).toMatch(/^[0-9]+$/);
  });

  test('исключает похожие символы при excludeSimilar = true', () => {
    const pwd = generatePassword({ length: 500, excludeSimilar: true });
    expect(pwd).not.toMatch(/[il1Lo0O]/);
  });

  test('генерирует разные пароли при повторных вызовах', () => {
    const a = generatePassword({ length: 24 });
    const b = generatePassword({ length: 24 });
    expect(a).not.toBe(b);
  });

  test('бросает TypeError при некорректной длине', () => {
    expect(() => generatePassword({ length: 0 })).toThrow(TypeError);
    expect(() => generatePassword({ length: -5 })).toThrow(TypeError);
    expect(() => generatePassword({ length: 2.5 })).toThrow(TypeError);
  });

  test('бросает Error, если не выбран ни один набор символов', () => {
    expect(() => generatePassword({
      lowercase: false,
      uppercase: false,
      numbers: false,
      symbols: false,
    })).toThrow('Не выбран ни один набор символов');
  });

  test('экспортирует наборы символов CHARSET', () => {
    expect(CHARSET.lowercase).toContain('a');
    expect(CHARSET.numbers).toBe('0123456789');
  });
});
