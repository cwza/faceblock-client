import { expect } from 'chai'
import * as usersSelectors from './usersSelectors'
import {usersItems} from '../mockDatas/data'

describe('#getSelfUser()', () => {
  it('should return selfUser', () => {
    let users = {
      items: usersItems,
      isFetching: false
    }
    let state = {apis: {faceblock: {entities: {users}}}};
    let selfUser = usersSelectors.getSelfUser(state);
    let expected = usersItems[usersSelectors.getSelfId(state)];
    console.log('selfUser: ', selfUser);
    expect(selfUser).to.deep.equal(expected);
  });
});
