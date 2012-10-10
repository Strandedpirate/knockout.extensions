/*
* ajaxSpinner is for showing a spinning ajax glyph over a given dom element.
* requires: Knockout 2.0+, spin.js 1.2+
*/
ko.bindingHandlers.ajaxSpinner = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var value = valueAccessor();
        var valueUnwrapped = ko.utils.unwrapObservable(value);
        // the default view model property we watch is "isMakingAjaxRequest"
        var viewModelProperty = viewModel["isMakingAjaxRequest"];
        // allow user defined view model property to be watched
        if (viewModel[valueUnwrapped]) {
            viewModelProperty = viewModel[valueUnwrapped];
        }
        viewModelProperty.subscribe(function (value) {
            if (value === true) {
                if (this.spinnerObject)
                    this.spinnerObject.spin(element);
                else
                    this.spinnerObject = new Spinner(_spinnerOpts).spin(element);
            }
            else {
                if (this.spinnerObject)
                    this.spinnerObject.stop();
            }
        });
    }
};