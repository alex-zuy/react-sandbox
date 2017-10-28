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
}
