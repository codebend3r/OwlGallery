CS.ViewModel = function () {

    var self = this;

    self.imagesList = ko.observable(CS.imagesList.images);
    self.optionsList = ko.observable(CS.documentation.options);

    return self;

};