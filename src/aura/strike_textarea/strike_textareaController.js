/*
Strike by Appiphony

Version: 1.0.0
Website: http://www.lightningstrike.io
GitHub: https://github.com/appiphony/Strike-Components
License: BSD 3-Clause License
*/
({
    onInit: function(component, event, helper) {
        var randomNumber = Math.floor(1000 + Math.random() * 9000);
        component.set('v.idNumber', randomNumber);

        helper.setHeight(component, event, helper);

        helper.handleEmptyMaxLength(component, event, helper);
    },
    sizeChanged: function(component, event, helper) {
        helper.setHeight(component, event, helper);
    },
    handleBlur: function(component, event, helper) {
        component.getEvent('onblur').fire();
    },
    handleChange: function(component, event, helper) {
        component.getEvent('onchange').fire();
    },
    handleFocus: function(component, event, helper) {
        component.getEvent('onfocus').fire();
    },
    handleKeydown: function(component, event, helper) {
        component.getEvent('onkeydown').fire();
    },
    handleKeyup: function(component, event, helper) {
        component.getEvent('onkeyup').fire();
    },
    handleInput: function(component, event, helper){
        var textareaValue = component.find('thisTextarea').getElement().value;
        var currentValue = component.get('v.value');

        if(textareaValue !== currentValue){
            component.set('v.value', textareaValue);
        }
        
        component.getEvent('oninput').fire();
    },
    handleChangeMaxlength: function(component, event, helper){
        helper.handleEmptyMaxLength(component, event, helper);
    },
    updateTextAreaValue: function (component, event, helper) {
        var textarea = component.find('thisTextarea').getElement();
        var textareaValue = (textarea != null) ? textarea.value : textarea;
        var currentValue = component.get('v.value');

        if (textareaValue != currentValue && textareaValue != null) {
            if($A.util.isEmpty(currentValue)){
                textarea.value = '';
            } else {
                textarea.value = currentValue;
            }
        }
    },
    focus: function(component, event, helper){
        component.find('thisTextarea').getElement().focus();
    },
    blur: function(component, event, helper){
        component.find('thisTextarea').getElement().blur();
    },
    select: function(component, event, helper){
        component.find('thisTextarea').getElement().select();
    },
    showError: function(component, event, helper) {
        var errorMessage = event.getParam('arguments').errorMessage;

        component.set('v.errorMessage', errorMessage);
        component.set('v.error', true);
    },
    hideError: function(component, event, helper) {
        component.set('v.errorMessage', null);
        component.set('v.error', false);
    },
    handleDisabledChange: function(component, event, helper) {
        var disabled = component.get('v.disabled');
        if(disabled) {
            helper.disableInput(component, event, helper);
        } else {
            helper.enableInput(component, event, helper);
        }
    }
})
/*
Copyright 2017 Appiphony, LLC

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the 
following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following 
disclaimer.
2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following 
disclaimer in the documentation and/or other materials provided with the distribution.
3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote 
products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, 
INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, 
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR 
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, 
WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE 
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/