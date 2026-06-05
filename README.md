# passforge

Криптографически стойкий генератор случайных паролей с настраиваемыми наборами символов. В основе — функция `randomInt` из встроенного модуля Node.js `crypto`, что обеспечивает безопасную случайность.

## Установка

```bash
npm install @yourname/passforge
```

## Использование

```js
const { generatePassword } = require('@yourname/passforge');

// Пароль по умолчанию: 16 символов из всех наборов
generatePassword();
// => "k8$Rm2!pQ7xZ@1aW"

// Пароль заданной длины
generatePassword({ length: 24 });

// Только цифры (PIN-код)
generatePassword({
  length: 6,
  lowercase: false,
  uppercase: false,
  symbols: false,
});
// => "049281"

// Без похожих символов (i, l, 1, L, o, 0, O)
generatePassword({ length: 20, excludeSimilar: true });
```

## API

### `generatePassword(options?)`

Возвращает строку — сгенерированный пароль.

| Параметр         | Тип       | По умолчанию | Описание                                       |
|------------------|-----------|--------------|------------------------------------------------|
| `length`         | `number`  | `16`         | Длина пароля (целое число ≥ 1).                |
| `lowercase`      | `boolean` | `true`       | Включать строчные буквы `a–z`.                 |
| `uppercase`      | `boolean` | `true`       | Включать заглавные буквы `A–Z`.                |
| `numbers`        | `boolean` | `true`       | Включать цифры `0–9`.                           |
| `symbols`        | `boolean` | `true`       | Включать спецсимволы.                          |
| `excludeSimilar` | `boolean` | `false`      | Исключать похожие символы `i l 1 L o 0 O`.     |

**Исключения:**

- `TypeError` — если `length` не является целым числом ≥ 1.
- `Error` — если отключены все наборы символов.

## Тестирование

```bash
npm test
```

## Лицензия

MIT
