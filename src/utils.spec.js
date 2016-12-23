import * as utils from './utils'
import { DATETIME_FIELDS } from './Constants'
import { expect } from 'chai'

describe('#parseTimeStrFieldToDate()', () => {
  it('should return parsed obj', () => {
    let obj = {id: 1, createTime: '2016-12-21T07:00:39.650Z', updateTime: '2016-12-21T07:00:39.650Z'};
    let parsedObj = utils.parseTimeStrFieldToDate(obj, DATETIME_FIELDS);
    let createTimeType = Object.prototype.toString.call(parsedObj.createTime);
    let updateTimeType = Object.prototype.toString.call(parsedObj.updateTime);
    expect(createTimeType).to.equal('[object Date]');
    expect(updateTimeType).to.equal('[object Date]');
  });
});
