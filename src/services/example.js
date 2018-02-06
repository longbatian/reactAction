import request from '../utils/request';
import remove from '../page/musiclist';

// export function query() {
//   return request('/api/users');
// }
export function remove(id) {
  return request(`../page/musiclist/${id}`, {
    method: 'DELETE',
  });
}