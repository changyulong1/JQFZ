window.$ = window.jquery = function (selectorOrArray) {
    let elements
    if (typeof selectorOrArray === 'string') {//判断字符串还是数组
        if (selectorOrArray[0] === '<') {
            console.log(666)
            elements = [createElement(selectorOrArray)]
            console.log(elements)
        } else {
            elements = document.querySelectorAll(selectorOrArray)
        }
    } else if (selectorOrArray instanceof Array) {
        elements = selectorOrArray
    }
    //创建节点函数
    function createElement(string) {
        const creatNode = document.createElement('template')
        creatNode.innerHTML = string.trim()
        return creatNode.content.firstChild
    }
    let api = Object.create(jquery.prototype) // 创建api jquery的原型给api
    // api.oldApi = selectorOrArray.oldApi
    // api.elements = elements
    Object.assign(api, { //给api对象添加属性
        oldApi: selectorOrArray.oldApi,
        elements: elements
    })
    return api //返回生成的对象api
}

//把方法添加到jquery的原型上，节省内存

jquery.fn = jquery.prototype = {
    jquery: true,
    constructor: jquery,//指定构造函数是追
    classAdd(className) {
        console.log(this.elements)
        for (let i = 0; i < this.elements.length; i++) {
            const element = this.elements[i]
            element.classList.add(className)
        }
        return this
    },
    find(selector) {
        let array = []
        for (let i = 0; i < this.elements.length; i++) {
            const elements2 = Array.from(this.elements[i].querySelectorAll(selector))
            array = array.concat(elements2)
        }
        array.oldApi = this//旧的api
        return jquery(array)
    },
    end() {
        return this.oldApi // 新的api
    },//遍历
    each(fn) {
        for (let i = 0; i < this.elements.length; i++) {
            fn.call(null, this.elements[i], i)
        }
        return this
    },//找爸爸
    parent() {
        const array = []
        this.each(function (node) {
            if (array.indexOf(node.parentNode) === -1) {
                array.push(node.parentNode)
            }
        })
        return jquery(array)
    },//打印
    nodeDir() {
        console.log(this.elements)
    },
    //获取孩子
    children() {
        let array = []
        this.each(function (node) {
            array.push(...node.children)
        })
        return jquery(array)
    },
    siblings() {
        let array = []
        this.each(function (node) {
            const elements2 = node.parentNode.children
            for (let i = 0; i < elements2.length; i++) {
                if (elements2[i] !== node) {
                    array.push(elements2[i])
                }
            }
        })
        return jquery(array)
    },//排行
    index() {
        let i
        this.each(function (node) {
            const elements2 = node.parentNode.children
            for (i = 0; i < elements2.length; i++) {
                if (elements2[i] === node) {
                    console.log(i)
                }
            }
        })
        return this
    },
    //获取弟弟
    next() {
        let array = []
        this.each(function (node) {
            if (node.nextSibling.nodeType === 3) {
                node = node.nextSibling
                array.push(node.nextSibling)
            }
        })
        return jquery(array)
    },
    //获取哥哥
    prev() {
        let array = []
        this.each(function (node) {
            if (node.previousSibling.nodeType === 3) {
                node = node.previousSibling
                array.push(node.previousSibling)
            }
        })
        console.log(array)
        return jquery(array)
    },//第几个
    get(number) {
        let array = []
        this.each(function (node, i) {
            if (number === i) {
                array.push(node)
            }
        })
        return jquery(array)
    },//插入元素
    appendTo(selector) {
        this.each(function (node) {
            if (selector) {
                const parent = $(selector)
                parent.each(function (n) {
                    n.appendChild(node)
                })
            } else {
                document.body.appendChild(node)
            }
        })
        this.each(n => {
            console.log(n)
        })
        return this
    },//删除元素
    remove() {
        let array
        this.each(function (node) {
            array = [node.parentNode]
            node.remove()
        })
        return jquery(array)
    },//读写文本
    text(string) {
        let text
        this.each(function (node) {
            if (string && typeof string === "string") {
                console.log(string)
                node.innerText = string
            } else {
                text = node.innerText
            }
        })
        return text || this
    },//读写html
    html(string) {
        let html
        this.each(function (node) {
            if (string && typeof string === "string") {
                node.innerHTML = string
            } else {
                html = node.innerHTML
            }
        })
        return html || this
    },//读改属性
    attr(name, value) {
        const can = arguments.length
        let string
        this.each(function (node) {
            if (can === 2) {
                node.setAttribute(name, value)
            } if (can === 1) {
                if (name instanceof Object) {
                    const object = name
                    for (let key in object) {
                        node[key] = object[key]
                    }
                } else {
                    if (node.getAttribute(name)) {
                        string = node.getAttribute(name)
                    } else {
                        string = "undefined"
                    }
                }
            } else {
                string = null
            }
        })
        return string || this
    },//css样式
    css(attrName, value) {
        const can = arguments.length
        let string
        console.log(can, 123)
        this.each(function (node) {
            if (can === 2) {
                node.style[attrName] = value
            } else if (can === 1) {
                if (attrName instanceof Object) {
                    const object = attrName
                    for (let key in object) {
                        node.style[key] = object[key]
                    }
                } else {
                    if (node.style[attrName]) {
                        string = node.style[attrName]
                    } else {
                        string = 'undefined'
                    }
                }
            } else {
                string = null
            }
        })
        return string || this
    },//绑定事件
    on(eventName, fn) {
        this.each(function (node) {
            node.addEventListener(eventName, fn)
        })
        return this
    },//解绑事件
    off(eventName, fnName) {
        this.each(function (node) {
            node.removeEventListener(eventName, fnName)
        })
    }
}