window.$ = window.jQuery = function (selectorOrArrayOrTemplate) {
    let elements
    if (typeof selectorOrArrayOrTemplate === 'string') {
        if (selectorOrArrayOrTemplate[0] === "<") {
            elements = [createElement(selectorOrArrayOrTemplate)];
            console.log(elements)
        } else {
            elements = document.querySelectorAll(selectorOrArrayOrTemplate)
        }
    } else if (selectorOrArrayOrTemplate instanceof Array) {
        elements = selectorOrArrayOrTemplate
    }

    function createElement(string) {
        const container = document.createElement("template");
        container.innerHTML = string.trim();
        return container.content.firstChild;
    }
    const api = Object.create(jQuery.prototype)
    Object.assign(api, {
        elements: elements,
        oldApi: selectorOrArrayOrTemplate.oldApi
    })
    // api.elements = elements
    // api.oldApi = selectorOrArrayOrTemplate.oldApi
    return api
}


jQuery.fn=jQuery.prototype= {
    constructor:jQuery,
    jquery: true,
    get(index){
        return this.elements[index]
    },
    addClass(className){
        for(let i=0; i<this.elements.length;i++){
            this.elements[i].classList.add(className)
        }
        return this
    },
    appendTo(node) {
        if (node instanceof Element) {
            this.each(el => node.appendChild(el));
        } else if (node.jquery === true) {
            this.each(el => node.get(0).appendChild(el));
        }
    },
    append(children) {
        if (children instanceof Element) {
            this.get(0).appendChild(children);
        } else if (children instanceof HTMLCollection) {
            for (let i = 0; i < children.length; i++) {
                this.get(0).appendChild(children[i]);
            }
        } else if (children.jquery === true) {
            children.each(node => this.get(0).appendChild(node));
        }
    },
    find(selector){
        let array = []
        for(let i =0;i<this.elements.length;i++){
            array = array.concat(Array.from(this.elements[i]
                .querySelectorAll(selector)))
        }
        array.oldApi = this
        return  jQuery(array) //return newApi
    },
    end(){
        return this.oldApi
    },
    each(fn){
        for(let i=0;i<this.elements.length;i++){
            fn.call(null,this.elements[i],i)
        }
        return this
    },
    parent(){
        const array = []
        this.each((node)=>{
            if(array.indexOf(node.parentNode)===-1){
                array.push(node.parentNode)
            }
        })
        array.oldApi = this
        return jQuery(array)
    },
    print(){
        console.log(this.elements)
        return this
    },
    children(){
        const  array = []
        this.each((node)=>{
            array.push(...node.children)
        })
        array.oldApi = this
        return jQuery(array)
    },
    siblings(){
        let array = []
        this.each((node)=>{
            array =Array.from(node.parentNode.children).filter(n=>n!==node)
        })
        array.oldApi = this
        return jQuery(array)
    },
    index(){
        this.each((node)=>{
            const element3 = node.parentNode.children
            for(let i=0;i<element3.length;i++){
                if(element3[i]===node) {
                    console.log(i)
                    break
                }
            }
        })
        return this
    },
    next(){
        const array = []
        this.each((node)=>{
            let x = node.nextSibling
            while (x && x.nodeType === 3){
                x = x.nextSibling
                array.push(x)
            }
        })
        array.oldApi = this
        return jQuery(array)
    }
}
