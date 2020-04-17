export class Utils
{
    
    // Returns offset properties used in various functions
    static getOffset(element)
    {
        return {
            top: element.offsetTop - element.scrollTop,
            left: element.offsetLeft - element.scrollLeft,
            height: element.offsetHeight
        }
    }

    // Duplicates an element and positions it in absolute at the same place
    static cloneElement(element)
    {
        // Get actual position of the original element and create the clone
        const
            elementPos = Utils.getOffset(element),
            clone = element.cloneNode(true)

        // Set clone's position to the dynamic position of original element
        clone.style.top = elementPos.top + 'px'
        clone.style.left = elementPos.left + 'px'

        return clone
    }

    // Makes an accordion without having to set height: 0 in the css file. Also allows css transition with auto height
    static toggleAccordion(trigger, target)
    {
        // First, get actual height of the target element to reinject it later
        const targetHeight = Utils.getOffset(target).height;

        // Then, set it to 0 to hide it
        if (!target.classList.contains('open')) target.style.height = '0px';

        // Finally, restitute its height on click or set it to 0 depending on its state
        trigger.addEventListener('click', () =>  {
            trigger.parentNode.classList.toggle('open');

            if (trigger.parentNode.classList.contains('open')) {
                target.style.height = `${targetHeight}px`
                console.log(targetHeight)

                // Test autoscroll 1
                // target.scrollIntoView({ block: 'start', inline: 'nearest', behavior: 'smooth' });

                // Test autoscroll 2
                // window.scroll(0, getOffset(target).top);
            } else {
                target.style.height = '0px';
            }
        });
    };
}