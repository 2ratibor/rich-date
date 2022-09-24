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
Example:
```
const date = richDate(new Date('2022-09-24'));
```

#### b) string
You can pass as parameter some string with date
Example:
```
const date = richDate('2022-09-24');
```

#### c) number
You can pass as parameter the number of milliseconds since the 1st of January 1970
Example:
```
const date = richDate(1663977600000);
```

