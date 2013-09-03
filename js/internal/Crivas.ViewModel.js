
CS.ViewModel = function(){

	var self = this;

	self.imagesList = ko.observable(CS.imagesList.images);

	return self;

};