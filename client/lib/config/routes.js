module.exports = function() {
  this.resource('individuals', {
    path: "/individuals"
  }, function(){
    this.route('index', { path: "/:id" });
    this.resource('variants', { path: ":id/variants" });
  });
};
