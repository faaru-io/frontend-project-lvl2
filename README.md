# "Generate Difference" 

[![Maintainability](https://api.codeclimate.com/v1/badges/143a02400e033f986078/maintainability)](https://codeclimate.com/github/faaru-io/frontend-project-lvl2/maintainability)
![](https://github.com/faaru-io/frontend-project-lvl2/workflows/Node.js%20CI/badge.svg)
[![Test Coverage](https://api.codeclimate.com/v1/badges/143a02400e033f986078/test_coverage)](https://codeclimate.com/github/faaru-io/frontend-project-lvl2/test_coverage)

## Project "Generate Difference"
Educational project of the school ["Hexlet"](https://ru.hexlet.io/?ref=231189).  
The utility for finding differences in configuration files.

## Setup

```sh
$ make install
```

## Examples

### Compare json Configs
```sh
$ gendiff /tmp/file1.json ../experiment/file2.json
```

[![asciicast](https://asciinema.org/connect/f9db8a92-48b7-45af-8982-ab59d7ff0d8b)](https://asciinema.org/connect/f9db8a92-48b7-45af-8982-ab59d7ff0d8b)

### Compare yaml Configs
```sh
$ gendiff __fixtures__/config1.yml __fixtures__/config2.yml
```

[![asciicast](https://asciinema.org/a/UpbjSm83uUJRFveVbJ2wbXhfL)](https://asciinema.org/a/UpbjSm83uUJRFveVbJ2wbXhfL)

### Compare ini Configs
```sh
$ gendiff __fixtures__/config1.ini __fixtures__/config2.ini
```

[![asciicast](https://asciinema.org/a/0i0AU40S2zoejUeLGRyAnK9WA)](https://asciinema.org/a/0i0AU40S2zoejUeLGRyAnK9WA)


### Format to plain
```sh
$ $ gendiff --format plain __fixtures__/config1.json __fixtures__/config2.json
```

[![asciicast](https://asciinema.org/a/OVRhz5BxySj3Q2nk0OKJ7fn3B)](https://asciinema.org/a/OVRhz5BxySj3Q2nk0OKJ7fn3B)


### Format to json
```sh
$ gendiff --format json __fixtures__/config1.json __fixtures__/config2.json
```

[![asciicast](https://asciinema.org/a/qKXqgjxPdIAsmicxia89618FS)](https://asciinema.org/a/qKXqgjxPdIAsmicxia89618FS)


### Format to stylish
```sh
$ gendiff --format stylish __fixtures__/config1.json __fixtures__/config2.json
```

[![asciicast](https://asciinema.org/a/mBtvcevaGHJXI2eBYhk0wa6im)](https://asciinema.org/a/mBtvcevaGHJXI2eBYhk0wa6im)
