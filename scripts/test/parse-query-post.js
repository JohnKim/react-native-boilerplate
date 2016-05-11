import faker from 'faker';
import Parse from 'parse/node';

var {serverURL, appID} = require('../../js/env');

console.disableYellowBox = true;
Parse.initialize(appID);
Parse.serverURL = `${serverURL}/parse`;

const Post = Parse.Object.extend('Post');

async function main() {

  let postId;
  let query;

  //  Post 정보 입력.
  for (var index = 0; index < 5; index++) {
    await new Post(getPostData()).save(null, {
      success: function(post) {
        postId = post.id;
        //console.log('New object created with objectId: ' + post.id);
      },
      error: function(post, error) {
        console.log('Failed to create new object, with error code: ' + error.message);
      }
    });
  }

  // Post 내역 조회
  query = new Parse.Query(Post);
  await query.get(postId, {
    success: function(post) {
      let location = post.get("location").toJSON();
      //console.log(location.latitude);
      //console.log(post);
    },
    error: function(object, error) {
      console.error(object, error);
    }
  });

  console.log(' --------------------------------- ');

  // Post 내역 조회
  query = new Parse.Query(Post);
  await query.skip(2).limit(10).descending('createdAt').find({

      success: (list) => {
        list.map(function (post) {
          let title = post.get('title');
          let location = post.get("location").toJSON();
          let createdAt = post.get("createdAt");
          console.log(createdAt, title, location.latitude, location.longitude);
        });
      },
      error: console.error,
    });

  console.log(' --------------------------------- ');

  query = new Parse.Query(Post);
  await query.skip(12).limit(15).descending('createdAt').find({

      success: (list) => {
        list.map(function (post) {
          let title = post.get('title');
          let location = post.get("location").toJSON();
          let createdAt = post.get("createdAt");
          console.log(createdAt, title, location.latitude, location.longitude);
        });
      },
      error: console.error,
    });

  return 'OK';
}

main()
  .then(console.dir, console.error);

function getPostData() {

  //  GS Gangseo N Tower {37.521214, 126.890208}
  var point = new Parse.GeoPoint({latitude: 37.521214, longitude: 126.890208});

  let returnPostData = {
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraphs(),
    location: point,
  };

  let resultArray = [];
  let count = faker.random.number({min: 1, max: 10});
  for (var index = 0; index < count; index++) {
    resultArray[index] = faker.random.word();
  }

  returnPostData['tags'] = resultArray;

  return returnPostData;
}

module.exports = { getPostData };



/*
console.log(faker.lorem.sentence()  );
console.log('----------------------')
console.log(faker.lorem.paragraphs());
console.log('----------------------')
console.log(getTags(1,10));

/*

- lorem
word
words
sentence
sentences
paragraph
paragraphs
text
lines

*/
