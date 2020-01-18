'use strict';

let imgArr = [];

// constructor function to build the image object
function Builder(buildObj) {
  this.title = buildObj.title;
  this.image_url = buildObj.image_url;
  this.description = buildObj.description;
  this.keyword = buildObj.keyword;
  this.horns = buildObj.horns;
}


Builder.prototype.render = function () {
  //1 get template from html
  let template = $('#horns-template').html();
  //2 use handlerbars to compile html
  let templateRender = Handlebars.compile(template);
  //3 return the html
  // return templateRender(this);
  let templateHTML = templateRender(this);
  $('main').append(templateHTML);

  // dropdown list
  const $addOption = $(`<option>${this.title}</option>`);
  $addOption.attr('value', this.keyword);
  $addOption.attr('class', this.keyword);
  $addOption.text(this.title);

  $('#filter').append($addOption);
};

// dropdown list
const $addOption = $(`<option>${this.title}</option>`);
$addOption.attr('value', this.keyword);
$addOption.attr('class', this.keyword);
$addOption.text(this.title);

$('#filter').append($addOption);

// need code to grab info from json file
// Based off of the Dog demo code in class 02
Builder.readJson = () => {
  $.get('./data/page-1.json', 'json')
    .then(data => {
      console.log(Builder);
      data.forEach(item => {
        imgArr.push(new Builder(item));
      });
    })
    .then(Builder.loadImgs);
};

Builder.loadImgs = () => {
  imgArr.forEach(buildObj => buildObj.render());
};

$(() => Builder.readJson());



//filtering the images handler
$('#filter').on('change', function () {
  $('section').hide();
  $(`.${this.value}`).show();
});


// summon page 2


// PAGE 2 PAGINATION
function showPageTwo() {
  console.log('clicked');
  Builder.readJson = () => {
    $.get('./data/page-2.json', 'json')
      .then(data => {
        console.log(Builder);
        data.forEach(item => {
          imgArr.push(new Builder(item));
        });
      })
      .then(Builder.loadImgs);
  };

  Builder.loadImgs = () => {
    imgArr.forEach(buildObj => buildObj.render());
  };

  Builder.prototype.render = function () {
    //1 get template from html
    let template = $('#horns-template').html();
    //2 use handlerbars to compile html
    let templateRender = Handlebars.compile(template);
    //3 return the html
    // return templateRender(this);
    let templateHTML = templateRender(this);
    $('main').append(templateHTML);
  };
}


$('#pg2').on('click', showPageTwo);

$('#filter').on('change', function () {
  $('section').hide();
  $(`.${this.value}`).show();
});
// $(() => Builder.readJson());



//sorting? credit to my previous iteration of this lab paired with Isaac Nelson

$('#sort').on('click', function () {
  console.log('clicked')
  //on click, hide section
  $('section').hide();
  // re-get json filter
  if (this.value === 'horns') {
    $.get('data/page-1.json', data => {
      data.sort((a, b) => {
        if (a.horns > b.horns) {
          return -1
        } else if (a.horns < b.horns) {
          return 1
        } else {
          return 0
        }
      });
      data.forEach((buildObj) => {
        imgArr.push(buildObj.keyword);
        // should be something else
        new Builder(buildObj).render();
      });
    });
  } else if (this.value === 'title') {
    $.get('data/page-1.json', data => {
      data.sort((a, b) => {
        if (a.title > b.title) {
          return 1
        } else if (a.title < b.title) {
          return -1
        } else {
          return 0
        }
      });
      data.forEach((buildObj) => {
        imgArr.push(buildObj.keyword);
        new Builder(buildObj).render();
      });
    });
  }
});



$.get('data/page-1.json', data => {
  data.sort((a, b) => {
    if (a.horns > b.horns) {
      return 1
    } else if (a.horns < b.horns) {
      return -1
    } else {
      return 0
    }
  });

  data.forEach((buildObj) => {
    imgArr.push(buildObj.keyword);
    new Builder(buildObj).render();
  });
});


