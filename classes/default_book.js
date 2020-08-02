const BookModel = require('../models/book');
const DepartmentModel = require('../models/depertment');


class Default {
    constructor(obj) {
        this.department = obj.department
    }
    createSetter(obj) {
        this.title = obj.title
        this.author = obj.author
        this.quantity = obj.quantity
    }

    async createEntry() {
        let department = await DepartmentModel.findOne({ name: this.department })
        console.log('department: ', department);

        let book = await BookModel.create({
            title: this.title,
            author: this.author,
            department: department._id,
            quantity: this.quantity,
            current: this.quantity
        })

        if (book) {
            console.log('book: ', book);
            return book;
        }
        else
            return false;

    }

    async updatePage(bookID) {
        let book = await BookModel.findById(bookID)
        let departments = await DepartmentModel.find({})

        let obj = {
            book,
            departments
        }
        return obj
    }

    async updater(updateobj) {
        let book = await BookModel.findById(updateobj.bookID)
        if (book) {
            if(updateobj.department)
            book.quantity = updateobj.quantity
            book.title = updateobj.title
            book.author = updateobj.author
            book.department = updateobj.department
            book.save()
            return true
        }
        else{
            return false
        }
    }

    async removeBook() {
        
    }

}

module.exports = Default;