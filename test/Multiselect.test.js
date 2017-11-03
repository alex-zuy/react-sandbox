import React from 'react';
import Multiselect from '../app/components/Multiselect.jsx';
import {mount} from 'enzyme';
import RenderingContainerSupport from './support/RenderingContainerSupport';
import conf from './support/configureEnzyme';

const OPTION_ONE = {value: 'one', title: 'One title'};
const OPTION_TWO = {value: 'two', title: 'Two title'};
const OPTION_THREE = {value: 'three', title: 'Three title'};

const OPTIONS_ONE_AND_TWO = [
    OPTION_ONE,
    OPTION_TWO
];

describe('Multiselect', () => {
    const renderingContainerSupport = new RenderingContainerSupport();
    renderingContainerSupport.setUpHooks();

    let componentWrapper = null;

    beforeEach(() => {
    });

    afterEach(() => {
        componentWrapper.unmount();
    });

    it('should show option titles in popup', () => {
        const wrapper = givenMultiselect({
            options: OPTIONS_ONE_AND_TWO
        });
        whenMultiselectOpened();
        const options = getListedOptions();
        expect(options).toEqual([OPTION_ONE.title, OPTION_TWO.title]);
    });

    it('should update options list when properties change', (done) => {
        const wrapper = givenMultiselect({
            options: OPTIONS_ONE_AND_TWO
        });
        wrapper.setProps({
            options: [OPTION_ONE, OPTION_THREE]
        }, () => {
            whenMultiselectOpened();
            expect(getListedOptions()).toEqual([OPTION_ONE.title, OPTION_THREE.title]);
            done();
        });

    });

    it('should invoke callback when user changes selected options', () => {
        const callback = jasmine.createSpy();
        const wrapper = givenMultiselect({
            options: OPTIONS_ONE_AND_TWO,
            onSelect: callback
        });
        whenMultiselectOpened();
        whenOptionsSelected([OPTION_ONE.title]);
        whenMultiselectClosed();
        expect(callback).toHaveBeenCalledWith([OPTION_ONE.value]);
    });

    function givenMultiselect(props = {}) {
        const defaultProps = {
            selected: [],
            onSelect: _.noop()
        };
        return componentWrapper = renderingContainerSupport.mount(
            <Multiselect {...(_.assign(defaultProps, props))}/>
        );
    }

    function whenMultiselectOpened() {
        findButton().click();
    }

    function whenOptionsSelected(options) {
        const items = findMultiselectOptionItems();
        options.forEach(option =>
            items.filter(`:contains(${option})`).find(':checkbox').click());
    }

    function whenMultiselectClosed() {
        findButton().click();
    }


    function getListedOptions() {
        return findMultiselectOptionItems()
            .map((idx, el) =>
                jQuery(el).text())
            .get();
    }

    function getSelectedOptions() {
        return findMultiselectOptionItems()
            .has('input[checked]')
            .map((idx, el) => jQuery(el).text());
    }

    function findMultiselectOptionItems() {
        return jQuery('.ui-multiselect-menu .ui-multiselect-checkboxes li');
    }

    function findButton() {
        return jQuery('button.ui-multiselect');
    }
});
