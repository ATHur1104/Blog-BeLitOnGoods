const User = require('./User');
const Blog = require('./Blog')
const Comment = require('./Comment')

// User has many blog posts
User.hasMany(Blog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

// user has many comments
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

// blog posts belong to users
Blog.belongsTo(User, {
    foreignKey: 'user_id',
});

// blog posts have many comments
Blog.hasMany(Comment, {
    foreignKey: 'comment_id',
    onDelete: 'CASCADE',
});

// comments belongs to blog posts
Comment.belongsTo(Blog, {
    foreignKey: 'blog_id'
});
// comments belongs to users
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Blog };
