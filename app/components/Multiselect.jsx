import React, {Component, PropTypes} from 'react';
import _ from 'lodash-compat';
import JQueryUIComponent from './JQueryUIComponent.jsx';

const EMPTY_OPTION_VALUE = '';

function calculateTypeCorrectSelectedItemValues(selectedValues, allOptions) {
    return selectedValues.map(selectedValue => {
        let typeCorrectValue = null;
        const typeCorrectValueFound = allOptions.some(({value}) => {
            if (String(value) == String(selectedValue)) {
                typeCorrectValue = value;
                return true;
            } else {
                return false;
            }
        });
        return typeCorrectValueFound ? typeCorrectValue : selectedValue;
    });
}

function isPropertyValuesEqual(propertiesLeft, propertiesRight) {
    //we need to omit callbacks from consideration and only take into account value changes
    return _.isEqual(
        _.omit(propertiesLeft, _.isFunction),
        _.omit(propertiesRight, _.isFunction)
    );
}

class Multiselect extends JQueryUIComponent {

    constructor(props){
        super(props);
        this._settings = {};
        this.$multiselect = {};
        this.isPropsChanged = (nextProps) => {
            return !_.eq(nextProps, this.props)
        };
        this._handleSelectedOptionsChange = this._handleSelectedOptionsChange.bind(this);
        this._settings = {
            selectedList: 1,
            header: true,
            height: 250,
            multiple: this.props.multiple,
            position:{
                my: 'right top',
                at: 'right bottom'
            },
            beforeopen: () => {
                this.$multiselect.multiselect('widget').width("365px");
                this.selectedItemsChanged = false;
            },
            close: () => {
                if (this.selectedItemsChanged) {
                    const values = this.$multiselect.val() || [];
                    const selectedItems = calculateTypeCorrectSelectedItemValues(_.isString(values) ? [values] : values, this.props.options);
                    this.props.onSelect(selectedItems);
                }
            },
            checkAll: this._handleSelectedOptionsChange,
            uncheckAll: this._handleSelectedOptionsChange,
            click: this._handleSelectedOptionsChange
        };
    }

    componentDidMount() {
        this.$multiselect = jQuery(this.select).multiselect(this._settings).multiselectfilter();
        this.updateMultiSelectButtonWidth();
        this.updateMultiSelectEnabledState();
    }

    componentDidUpdate(prevProps) {
        super.componentDidUpdate();
        if (!isPropertyValuesEqual(prevProps, this.props)) {
            this.$multiselect.multiselect('refresh');
            this.updateMultiSelectButtonWidth();
        }
        if (this.props.enabled !== prevProps.enabled) {
            this.updateMultiSelectEnabledState();
        }
    }

    componentWillUnmount() {
        this.$multiselect.multiselect('destroy');
    }

    _handleSelectedOptionsChange() {
        if (this.$multiselect.multiselect('isOpen')) {
            this.selectedItemsChanged = true;
        }
    }

    updateMultiSelectButtonWidth() {
        this.$multiselect.multiselect('getButton').css({'width': '94%'});
    }

    updateMultiSelectEnabledState() {
        this.$multiselect.multiselect(this.props.enabled ? 'enable' : 'disable');
    }

    render(){
        // We need to add empty option if multiselect should be emptiable
        // or if it isn`t 'multiple'.
        // The latter case is important as underlying HTML select will select
        // first available option if we don`t set one manually. This will
        // make UI state out of sync with props.
        const emptyOption = (this.props.canBeEmpty || !this.props.multiple)
            ? <option key={0} value={EMPTY_OPTION_VALUE}/>
            : null;
        const selectedValue = !this.props.multiple && this.props.selected === null
            ? EMPTY_OPTION_VALUE
            : this.props.selected;
        return <select value={selectedValue}
                       name={this.props.name}
                       readOnly={true}
                       multiple={this.props.multiple}
                       ref={(select)=>this.select = select}>
                {emptyOption}
            {this.props.options.map((option) =>
                <option key={option.value} value={option.value}>
                    {option.title}
                </option>
            )}
        </select>
    }
}

Multiselect.defaultProps = {
    multiple: true,
    enabled: true,
    selected: null
};

Multiselect.propTypes = {
    multiple: PropTypes.bool.isRequired,
    enabled: PropTypes.bool.isRequired,
    selected: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.number),
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.oneOfType([
            PropTypes.number, PropTypes.string
        ])
    ]),
    options: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    canBeEmpty: PropTypes.bool,
    name: PropTypes.string
};

export default Multiselect;