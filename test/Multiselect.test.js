import React from 'react';
import Multiselect from '../app/components/Multiselect.jsx';
import {mount} from 'enzyme';
import _ from 'lodash-compat';
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
        const wrapper = givenMultiselect(
            <Multiselect options={OPTIONS_ONE_AND_TWO} selected={[]} onSelect={_.noop()}/>
        );
        whenMultiselectOpened();
        const options = getListedOptions();
        expect(options).toEqual([OPTION_ONE.title, OPTION_TWO.title]);
    });

    it('should update options list when properties change', (done) => {
        const wrapper = givenMultiselect(
            <Multiselect options={OPTIONS_ONE_AND_TWO} onSelect={_.noop()}/>
        );
        wrapper.setProps({
            options: [OPTION_ONE, OPTION_THREE]
        }, () => {
            whenMultiselectOpened();
            expect(getListedOptions()).toEqual([OPTION_ONE.title, OPTION_THREE.title]);
            done();
        });

    });

    function givenMultiselect(element) {
        return componentWrapper = mount(element, {attachTo: renderingContainerSupport.getContainer()});
    }

    function whenMultiselectOpened() {
        jQuery('button.ui-multiselect').click();
    }

    function getListedOptions() {
        return jQuery('.ui-multiselect-menu .ui-multiselect-checkboxes li')
            .map((idx, el) =>
                jQuery(el).text())
            .get();
    }
});
