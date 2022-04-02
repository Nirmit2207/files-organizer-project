const fs = require('fs')
const path = require('path')

function treeFn(dirPath) {

    // if user haven't given the path
    if(dirPath == undefined || dirPath == null) {
        treeHelper(process.cwd(), "")
        return
    }

    // if entered path exists
    if(fs.existsSync(dirPath)) {
        
        treeHelper(dirPath, "")

    }
    else { // if path doesn't exists
        console.log("Please enter the correct path")
        return
    }

}

function treeHelper(dirPath, indent) {

    let is_file = fs.lstatSync(dirPath).isFile()

    if(is_file) {
        let file_name = path.basename(dirPath)
        console.log(indent + "|-" + file_name)
    }
    else {
        let dir_name = path.basename(dirPath)
        console.log(indent + "∟" + dir_name)
        let children = fs.readdirSync(dirPath)
        for(let i = 0; i < children.length; i++) {
            let child_path = path.join(dirPath, children[i])
            treeHelper(child_path, indent+"\t")
        }
    }

}

module.exports = treeFn