/*
Strike by Appiphony

Version: 1.0.0
Website: http://www.lightningstrike.io
GitHub: https://github.com/appiphony/Strike-Components
License: BSD 3-Clause License
*/
({
    buildInitState: function(component, displayMode) {
        var stageNames = component.get('v.stageNames');
        var activeChevron = component.get('v.activeChevron');
        var forceProcessFlow = component.get('v.forceProcessFlow');
        var disableBackwardNavOnComplete = component.get('v.disableBackwardNavOnComplete');
        var disableForwardNavOnIncomplete = component.get('v.disableForwardNavOnIncomplete');
        var error = component.get('v.error');
        var chevrons = [];

        for (var i = 0; i < stageNames.length; i++) {
            if (displayMode === 'non-linear') {
                chevrons.push({
                    'active': (i === activeChevron) ? true : false,
                    'class': (i === activeChevron) ? 'slds-is-active' : 'slds-is-incomplete',
                    'current': false,
                    'name': stageNames[i],
                    'status': 'incomplete',
                    'disabled': false
                })
            } else if (displayMode === 'linear') {
                if (activeChevron === 0 && i === 0) {
                    chevrons.push({
                        'active': (i === activeChevron) ? true : false,
                        'class': (i === activeChevron) ? (error) ? 'slds-is-current slds-is-lost' : 'slds-is-current' : 'slds-is-incomplete',
                        'current': (i === activeChevron) ? true : false,
                        'name': stageNames[i],
                        'status': 'incomplete',
                        'disabled': forceProcessFlow
                    })
                } else {
                    if (i === activeChevron) {
                        chevrons.push({
                            'name': stageNames[i],
                            'active': true,
                            'current': true,
                            'class': (error) ? 'slds-is-current slds-is-lost' : 'slds-is-current',
                            'status': 'incomplete',
                            'disabled': false
                        })
                    } else if (i > activeChevron) {
                        chevrons.push({
                            'name': stageNames[i],
                            'active': false,
                            'current': false,
                            'class': 'slds-is-incomplete',
                            'status': 'incomplete',
                            'disabled': forceProcessFlow || disableForwardNavOnIncomplete
                        })
                        component.set('v.toggleButtonStyle', true);
                    } else {
                        chevrons.push({
                            'name': stageNames[i],
                            'active': false,
                            'current': false,
                            'class': 'slds-is-complete',
                            'status': 'complete',
                            'disabled': forceProcessFlow || disableBackwardNavOnComplete
                        })
                        component.set('v.toggleButtonStyle', false);
                    }
                }
            }
        }
        if (activeChevron !== 0) component.set('v.initialized', true);
        (activeChevron === 0) ? component.set('v.currentChevron', 1): component.set('v.currentChevron', activeChevron);
        component.set('v.chevrons', chevrons);
        component.set('v.processComplete', false);
        component.set('v.advanceButtonText', component.get('v.advanceButtonNextLabel'));
    },
    renderNonLinearMode: function(component, targetChevron) {
        var chevrons = component.get('v.chevrons');
        var results = {};

        for (var i = 0; i < chevrons.length; i++) {
            var chevron = chevrons[i];
            chevron.class = '';
            if (i === targetChevron) {
                chevron.active = true;
                chevron.current = false;
                results.current = i || 0;
                chevron.class += 'slds-is-active slds-is-incomplete';
            } else {
                chevron.active = false;
                chevron.current = false;
                results.current = i || 0;
                chevron.class += 'slds-is-incomplete';
            }
        }

        component.set('v.activeChevron', targetChevron);
        component.set('v.chevrons', chevrons);
        this.sendResultsToParent(component, results, 'click');
    },
    renderLinearMode: function(component, targetChevron) {
        var chevrons = component.get('v.chevrons');
        var results = {};
        var error = component.get('v.error');
        var setNextAsCurrent = false;
        
        if (component.get('v.forceProcessFlow') === true) return;
        
        for (var i = 0; i < chevrons.length; i++) {
            var chevron = chevrons[i];
            chevron.class = '';

            if (i === targetChevron) {
                if (chevron.current === true) {
                    chevron.active = false;
                    results.current = i || 0;
                    chevron.class = 'slds-is-current';
                    if (error) chevron.class += ' slds-is-lost';
                    component.set('v.advanceButtonText', component.get('v.advanceButtonNextLabel'));
                    component.set('v.toggleButtonStyle', true);
                    setNextAsCurrent = true;
                } else {
                    results.active = i || 0;
                    chevron.active = true;
                    chevron.class = 'slds-is-active';
                    component.set('v.advanceButtonText', component.get('v.advanceButtonSelectLabel'));
                    component.set('v.toggleButtonStyle', false);
                    (chevron.status === 'complete') ? chevron.class += ' slds-is-complete': chevron.class += ' slds-is-incomplete';
                }
            } else {
                if (chevron.current === true) {
                    results.current = i || 0;
                    chevron.class = 'slds-is-current';
                    if (error) chevron.class += ' slds-is-lost';
                } else {
                    chevron.current = false;
                    (chevron.status === 'complete') ? chevron.class += ' slds-is-complete': chevron.class += ' slds-is-incomplete';
                }
                chevron.active = false;
            }
        }
        
        if (setNextAsCurrent) component.set('v.currentChevron', targetChevron + 1);
        else component.set('v.currentChevron', targetChevron);
        
        component.set('v.chevrons', chevrons);
        this.sendResultsToParent(component, results, 'click');
    },
    showErrorState: function(component) {
        var chevrons = component.get('v.chevrons');
        var activeChevron = component.get('v.activeChevron');
        var processComplete = component.get('v.processComplete');

        if (!processComplete) {
            for (var i = 0; i < chevrons.length; i++) {
                var chevron = chevrons[i];
                
                if (chevron.class.indexOf('slds-is-active') >= 0) { // If selected
                    chevron.class = 'slds-is-active';
                } else {
                    chevron.class = '';
                }
                
                if (i === activeChevron) {
                    chevron.active = false;
                    chevron.class += ' slds-is-current slds-is-lost';
                    chevron.current = true;
                    chevron.status = 'incomplete';
                } else if (i < activeChevron) {
                    chevron.active = false;
                    chevron.class += ' slds-is-complete';
                    chevron.current = false;
                    chevron.status = 'complete';
                } else if (i > activeChevron) {
                    chevron.active = false;
                    chevron.class += ' slds-is-incomplete';
                    chevron.current = false;
                    chevron.status = 'incomplete';
                }
            }
        }
        
        component.set('v.chevrons', chevrons);
    },
    hideErrorState:  function(component) {
        var chevrons = component.get('v.chevrons');
        
        chevrons.forEach(function(chevron) {
            chevron.class = chevron.class.replace('slds-is-lost', '');
        });
        
        component.set('v.chevrons', chevrons);
    },
    renderAdvanceButtonClick: function(component, activeChevron) {
        var disableBackwardNavOnComplete = component.get('v.disableBackwardNavOnComplete');
        var disableForwardNavOnIncomplete = component.get('v.disableForwardNavOnIncomplete');
        var forceProcessFlow = component.get('v.forceProcessFlow');

        if (component.get('v.displayMode').toLowerCase() === 'non-linear') return;
        
        var chevrons = component.get('v.chevrons');
        var error = component.get('v.error');
        var results = {};

        if (activeChevron === chevrons.length) {
            chevrons[activeChevron - 1].class = 'slds-is-complete';
            chevrons[activeChevron - 1].status = 'complete';
            chevrons[activeChevron - 1].active = true;
            chevrons[activeChevron - 1].current = false;
            component.set('v.chevrons', chevrons);
            component.set('v.advanceButtonText', component.get('v.advanceButtonCompletedLabel'));
            component.set('v.activeChevron', null);
            component.set('v.processComplete', true);
            return;
        }

        (component.get('v.initialized') === true) ? activeChevron += 1 : activeChevron;
        
        for (var i = 0; i < chevrons.length; i++) {
            if (i === activeChevron) {
                chevrons[i].class = 'slds-is-current';
                if (error) chevrons[i].class += ' slds-is-lost';
                chevrons[i].status = 'incomplete';
                chevrons[i].current = true;
                chevrons[i].disabled = false;
                component.set('v.currentChevron', i + 1);
                component.set('v.activeChevron', i);
            } else if (i < activeChevron) {
                chevrons[i].class = 'slds-is-complete';
                chevrons[i].status = 'complete';
                chevrons[i].current = false;
                chevrons[i].disabled = forceProcessFlow || disableBackwardNavOnComplete;
            } else if (i > activeChevron) {
                chevrons[i].current = false;
                chevrons[i].status = 'incomplete';
                chevrons[i].class = 'slds-is-incomplete';
                chevrons[i].disabled = forceProcessFlow || disableForwardNavOnIncomplete;
            }
            
            if (chevrons[i].current === true) results.current = i || 0;
            if (chevrons[i].active === true) results.active = i || 0;
        }

        component.set('v.advanceButtonText', component.get('v.advanceButtonNextLabel'));
        component.set('v.toggleButtonStyle', true);
        component.set('v.chevrons', chevrons);
        component.set('v.initialized', false);
        this.sendResultsToParent(component, results, 'save');
    },
    sendResultsToParent: function(component, results, type) {
        var clickEvent = component.getEvent('strike_evt_chevron');
        clickEvent.setParams({
            data: {
                'results': results,
                'type': type
            }
        })
        clickEvent.fire();
    },
    showToast: function(component, event) {
        if (component.get('v.displayMode').toLowerCase() === 'non-linear') return;
        var params = event.getParam('arguments');
        var toastEvent = $A.get("e.force:showToast");
        if (typeof(toastEvent) !== 'undefined') {
            if (params) {
                toastEvent.setParams({
                    "title": params.title,
                    "message": params.message,
                    "key": params.key,
                    "duration": params.duration,
                    "type": params.type,
                    "mode": params.mode

                });
            }
            toastEvent.fire();
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
