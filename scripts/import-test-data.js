import faker from 'faker';
// /*
import Parse from 'parse/node';

var {serverURL, appID} = require('../js/env');

console.disableYellowBox = true;
Parse.initialize(appID);
Parse.serverURL = `${serverURL}/parse`;

var Post = Parse.Object.extend('Post');

async function main() {

  //  Post 정보 입력.
  for (var index = 0; index < 20; index++) {
    await new Post(getPostData()).save();
  }

  return 'OK';
}

main()
  .then(console.dir, console.error);

/*
async function createSurvey(session) {
  return await new Post({
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraphs(),
  }).save();
}

async function main() {
  await importClass('Speakers');
  var sessions = await importClass('Agenda');

  console.log('Generating sample survey questions');
  await new Parse.Query(Survey)
    .each(record => record.destroy());
  await sessions.map(s => s.get('hasDetails') ? createSurvey(s) : Promise.resolve(null));

  return 'OK';
}

// */

function getPostData() {

  var point = new Parse.GeoPoint({latitude: 40.0, longitude: -30.0});

  let returnPostData = {
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraphs(),
    location: point
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
