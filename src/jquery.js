window.$ = window.jquery = function (selectorOrArray) {
    let elements
    if (typeof selectorOrArray === 'string') {//判断字符串还是数组
        elements = document.querySelectorAll(selectorOrArray)
    } else if (selectorOrArray instanceof Array) {
        elements = selectorOrArray
    }
    return {
        oldApi: selectorOrArray.oldApi,
        classAdd(className) {
            for (let i = 0; i < elements.length; i++) {
                const element = elements[i]
                element.classList.add(className)
            }
            return this
        },
        find(selector) {
            let array = []
            for (let i = 0; i < elements.length; i++) {
                const elements2 = Array.from(elements[i].querySelectorAll(selector))
                array = array.concat(elements2)
            }
            array.oldApi = this//旧的api
            return jquery(array)
        },
        end() {
            return this.oldApi // 新的api
        },//遍历
        each(fn) {
            for (let i = 0; i < elements.length; i++) {
                fn.call(null, elements[i], i)
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
            console.log(elements)
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
        indexNode(number) {
            let array = []
            this.each(function (node, i) {
                if (number === i) {
                    array.push(node)
                }
            })
            return jquery(array)
        }
    }
}