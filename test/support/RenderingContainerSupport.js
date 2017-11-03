import {mount} from 'enzyme';

export default function RenderingContainerSupport() {
    let componentContainer = null;

    this.setUpHooks = () => {

        beforeEach(() => {
            const container = document.createElement('div');
            document.body.appendChild(container);
            componentContainer = container;
        });

        afterEach(() => {
            componentContainer.remove();
            componentContainer = null;
        });
    }

    this.getContainer = () => componentContainer;

    this.mount = (component, options = {}) => {
        return mount(
            component,
            _.assign({attachTo: componentContainer}, options)
        );
    }
}
