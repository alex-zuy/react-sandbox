import React from 'react';
import Multiselect from '../app/components/Multiselect.jsx';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-14';
import _ from 'lodash-compat';

Enzyme.configure({adapter: new Adapter()})

const OPTION_ONE = {value: 'one', title: 'One title'};
const OPTION_TWO = {value: 'two', title: 'Two title'};
const OPTION_THREE = {value: 'three', title: 'Three title'};

const OPTIONS_ONE_AND_TWO = [
    OPTION_ONE,
    OPTION_TWO
];

describe('Multiselect', () => {

    it('should show option titles in popup', () => {
        const wrapper = givenMutliselect(
            <Multiselect options={OPTIONS_ONE_AND_TWO} selected={[]} onSelect={_.noop()}/>
        );
        whenMultiselectOpened();
        const options = getListedOptions();
        expect(options).toEqual([OPTION_ONE.title, OPTION_TWO.title]);
    });

    it('should update options list when properties change', (done) => {
        const wrapper = givenMutliselect(
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

    function givenMutliselect(element) {
        return mount(element, {attachTo: document.body});
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
