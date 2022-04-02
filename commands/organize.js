const fs = require('fs')
const path = require('path')

const types =  {
    media: ["mp4", "mkv"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: ["docx", "doc", "pdf", "xlsx", "xls", "odt", "ods", "odp", "odg", "odf", "txt", "ps", "tex"],
    app: ["exe", "dmg", "pkg", "deb"]
}

function organizeFn(dirPath) {

    // if user haven't given the path
    if(dirPath == undefined || dirPath == null) {
        let dirPath = process.cwd()
        let destPath = path.join(dirPath, "organized-files") // create path for new folder
        fs.mkdirSync(destPath)
        organizeHelper(dirPath, destPath)
        return
    }

    // if entered path exists
    if(fs.existsSync(dirPath)) {
        
        let destPath = path.join(dirPath, "organized-files") // create path for new folder

        // if "organized_files" folder already exists don't run mkdir function
        if(!fs.existsSync(destPath)) {

            fs.mkdirSync(destPath)
            organizeHelper(dirPath, destPath) // organizeHelper does rest of the work

        }

    }
    else { // if entered path doesn't exists
        console.log("Please enter the correct path")
        return
    }

}

function organizeHelper(src, dest) {

    const files = fs.readdirSync(src)
    
    for(let i = 0; i < files.length; i++) {

        let child_addr = path.join(src, files[i])
        let is_file = fs.lstatSync(child_addr).isFile() // check if particular child is file only and not folder

        if(is_file) { 

            let category = findCategory(files[i]) 
            sendFiles(child_addr, dest, category)

        }

    }

}

function findCategory(name) {

    let ext = path.extname(name)
    ext = ext.slice(1) // to remove '.' from extension

    for(let type in types) {
        let arr = types[type]
        for(let i = 0; i < arr.length; i++) {
            if(ext == arr[i]) {
                return type
            }
        }
    }

    return "others"

}

function sendFiles(src_file_path, dest, category) {

    let category_path = path.join(dest, category)

    if(fs.existsSync(category_path) == false) {
        fs.mkdirSync(category_path)
    }

    let file_name = path.basename(src_file_path)
    let dest_file_path = path.join(category_path, file_name)
    fs.copyFileSync(src_file_path, dest_file_path)

}

module.exports = organizeFn