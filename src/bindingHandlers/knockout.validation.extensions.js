
ko.bindingHandlers['validationMessageTitle'] = { // individual error message, if modified or post binding
    update: function (element, valueAccessor) {
        var obsv = valueAccessor(),
                config = utils.getConfigOptions(element),
                val = ko.utils.unwrapObservable(obsv),
                msg = null,
                isModified = false,
                isValid = false;

        obsv.extend({ validatable: true });

        isModified = obsv.isModified();
        isValid = obsv.isValid();

        // create a handler to correctly return an error message
        var errorMsgAccessor = function () {
            if (!config.messagesOnModified || isModified) {
                return isValid ? null : obsv.error;
            } else {
                return null;
            }
        };

        //toggle visibility on validation messages when validation hasn't been evaluated, or when the object isValid
        var visiblityAccessor = function () {
            return isModified ? !isValid : false;
        };

        var attrValueAccessor = function () { return { title: errorMsgAccessor() }; };

        ko.bindingHandlers.attr.update(element, attrValueAccessor);
        ko.bindingHandlers.visible.update(element, visiblityAccessor);
    }
};