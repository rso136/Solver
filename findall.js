models.sequelize.Promise.all([
   models.Posts.findAll({
       attributes: ['id', 'title', 'content', 'author'],
       where: { isPublished: true },
       order: '"updatedAt" DESC'
   }),
   models.MenuItems.findAll({
       where: { isActive: true },
   })
  ])
  .spread(function(posts, menus) {
  });