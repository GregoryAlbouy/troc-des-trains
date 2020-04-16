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
    };
    // Duplicates an element and positions it in absolute at the same place
    static cloneElement(element)
    {
        // Get actual position of the original element and create the clone
        const
            elementPos = Utils.getOffset(element),
            clone = element.cloneNode(true);

        // Set clone's position to the dynamic position of original element
        clone.style.top = elementPos.top + 'px';
        clone.style.left = elementPos.left + 'px';

        return clone;
    };
}