angular.module('iaDate', [])
    .value('DefaultMinDate', { year: 1900, month: 1, day: 1 })
    .value('DefaultMaxDate', { year: 2100, month: 12, day: 31 });
