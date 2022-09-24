# The `rich-date` is the npm package, that makes your work with dates much easier.

## Installation
```
npm i rich-date
```

## Using
#### 1) Import `richDate` function to your file:
```
import { richDate } from 'rich-date';
```

#### 2) To create current date please call the function without parameters:
```
const date = richDate();
```

#### 3) To create a specific date you can pass as parameter one of following data types:
#### a) Date object
You can just create Date object for concrete date and pass it as parameter
<br>
Example:
```
const date = richDate(new Date('2022-09-24'));
```

#### b) string
You can pass as parameter some string with date
<br>
Example:
```
const date = richDate('2022-09-24');
```

#### c) number
You can pass as parameter the number of milliseconds since the 1st of January 1970
<br>
Example:
```
const date = richDate(1663977600000);
```

#### 4) To receive date string from RichDate object you can just use `format` method
Example:
```
const date = richDate('2022-09-24');
date.format(); // 24.09.2022
```

If you need to customize the output format, you can easily pass as parameter your own output pattern
<br>
Example:
```
date.format('DD.MM.YYYY HH:mm:ss') // 24.09.2022 19:25:53
date.format('DD-MM-YYYY'); // 24-09-2022
```

#### 5) Other methods (e.g. `diff`, `isBefore`, `isAfter`, `isBetween`, `add`, `subtract`) are pretty similar to momentjs package
