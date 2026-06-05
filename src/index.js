'use strict';

const { randomInt } = require('crypto');

// Наборы символов
const CHARSET = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  symbols: '!@#$%^&*()-_=+[]{};:,.<>?',
};

// Символы, которые легко спутать (для опции excludeSimilar)
const SIMILAR = /[il1Lo0O]/g;

/**
 * Генерирует криптографически стойкий случайный пароль.
 *
 * @param {Object} [options]
 * @param {number} [options.length=16]        Длина пароля (целое число >= 1).
 * @param {boolean} [options.lowercase=true]  Включать строчные буквы.
 * @param {boolean} [options.uppercase=true]  Включать заглавные буквы.
 * @param {boolean} [options.numbers=true]    Включать цифры.
 * @param {boolean} [options.symbols=true]    Включать спецсимволы.
 * @param {boolean} [options.excludeSimilar=false] Исключать похожие символы (i, l, 1, L, o, 0, O).
 * @returns {string} Сгенерированный пароль.
 * @throws {TypeError} Если length не является положительным целым числом.
 * @throws {Error} Если не выбран ни один набор символов.
 */
function generatePassword(options = {}) {
  const {
    length = 16,
    lowercase = true,
    uppercase = true,
    numbers = true,
    symbols = true,
    excludeSimilar = false,
  } = options;

  if (!Number.isInteger(length) || length < 1) {
    throw new TypeError('length должен быть целым числом не меньше 1');
  }

  let pool = '';
  if (lowercase) pool += CHARSET.lowercase;
  if (uppercase) pool += CHARSET.uppercase;
  if (numbers) pool += CHARSET.numbers;
  if (symbols) pool += CHARSET.symbols;

  if (excludeSimilar) {
    pool = pool.replace(SIMILAR, '');
  }

  if (pool.length === 0) {
    throw new Error('Не выбран ни один набор символов для генерации пароля');
  }

  let password = '';
  for (let i = 0; i < length; i += 1) {
    // randomInt из модуля crypto даёт криптографически стойкую случайность
    password += pool[randomInt(pool.length)];
  }

  return password;
}

module.exports = { generatePassword, CHARSET };
