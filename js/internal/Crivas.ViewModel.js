CS.ViewModel = function () {

    var self = this;

    self.imagesList = ko.observable(CS.imagesList.images);
    self.optionsList = ko.observableArray(ko.utils.arrayMap(CS.documentation.options, function (i) {
        return {
            key: '<b>' + i.key + '</b>',
            defaultValue: i.defaultValue,
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
            eventParams: ko.computed(function(){
                var params = [];
                $.each(i.eventParams, function(a, i){
                    if (!a) {
                        params.push(i);
                    } else {
                        params.push(', ' + i);
                    }

                });
                return params;
            })
		};
	}));

    return self;

};