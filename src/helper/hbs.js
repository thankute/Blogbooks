const hbs_dateformat = require('handlebars-dateformat');

module.exports = {
    equal: function (storyUser, loggedUser, storyId) {
        if (storyUser._id.toString() == loggedUser._id.toString()) {
          return `<a href="/me/blog/${storyId}/edit" class="btn btn-primary">Sửa</a>
                  <a class="btn btn-danger" data-id="${storyId}" data-toggle="modal" data-target="#deleteModal">Xoá</a>`
        } else {
          return ''
        }
        // 
    },
}
