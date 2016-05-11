
const Parse = require('parse/react-native');
const InteractionManager = require('InteractionManager');

export const LOADED_POSTS = "LOADED_POSTS";
export const DEFAULT_PAGE_SIZE = 20;

const Post = Parse.Object.extend('Post');

export function loadPostByPage(pageNumber: number, pageSize: number) {
  let limit = pageSize || DEFAULT_PAGE_SIZE;
  let skip = ((pageNumber || 1) - 1) * limit;

  let query = new Parse.Query(Post);
  if(skip > 0) query = query.skip(skip);
  query = query.limit(limit).descending('createdAt');

  return (dispatch) => {

    return query.find({
      success: (list) => {
        InteractionManager.runAfterInteractions(() => {
          // Flow can't guarantee {type, list} is a valid action
          dispatch(({LOADED_POSTS, list}: any));
        });
      },
      error: (err) => {
        console.error(err.code +" : "+ err.message);
      },
    });

  };
}
