CS.ViewModel = function () {

    var self = this;

    self.imagesList = ko.observable(CS.imagesList.images);
    self.optionsList = ko.observableArray(ko.utils.arrayMap(CS.documentation.options, function (i) {
        return {
            key: '<b>' + i.key + '</b>',
            defaultValue: i.defaultValue,
            params: ko.utils.arrayMap(i.params, function (j) {
                return {
                    name: j.name,
                    description: j.description,
                    functionExample: ko.computed(function() {
                        return i.key + ': function( ' + j.name + ' ){...}';
                    })
                };
            }),
            type: i.type,
            description: i.description,
            required: i.required ? '<span class="true">true</span>' : '<span class="false">false</span>'
        };
    }));

	self.eventsList = ko.observableArray(ko.utils.arrayMap(CS.documentation.events, function (i) {
		return {
			eventName: "'" + i.eventName + "'",
            constant: i.constant,
            description: i.description,
            eventParams: ko.utils.arrayMap(i.eventParams, function (j) {
                return {
                    name: j.name,
                    value: j.value,
                    functionExample: ko.computed(function(){
                        return "$(element).on(" + i.constant + ", function(" + j.name + "){...})"
                    })
                };
            })
		};
	}));

    return self;

};