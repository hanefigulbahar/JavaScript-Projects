//Course Class
class Course {
    constructor(title, instructor, image) {
        this.title = title
        this.instructor = instructor
        this.image = image
    }
}

//UI Class
class UI {
    addCourseToList(course) {
        const list = document.getElementById('course-list');

        var html = `
        <tr>
            <td><img src="img/${course.image}"/></td>
            <td>${course.title}</td>
            <td>${course.instructor}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">Delete</a></td>
        </tr>
        `;
        list.innerHTML += html
    }

    clearControls() {
        const title = document.getElementById('title').value = "";
        const instructor = document.getElementById('instructor').value = "";
        const image = document.getElementById('image').value = ""
    }

    deleteCourse(element) {
        if (element.classList.contains('delete')) {
            element.parentElement.parentElement.remove();
        }
    }

    showAlert(message, className) {
        var alert =
            `<div class="alert alert-${className}">
                 ${message}
            </div>
        `
        const row = document.querySelector('.row')

        row.insertAdjacentHTML('beforeBegin', alert)

        setTimeout(() => {
            document.querySelector('.alert').remove()
        }, 2000)
    }
}

//Storage Class
class Storage {

    static getCourses() {
        let courses;

        if (localStorage.getItem('courses') === null) {
            courses = []
        } else {
            courses = JSON.parse(localStorage.getItem('courses'))
        }

        return courses
    }

    static displayCourses() {
        const courses = Storage.getCourses()

        courses.forEach(course => {
            const ui = new UI()
            ui.addCourseToList(course)
        });
    }

    static addCourses(course) {
        const courses = Storage.getCourses()
        courses.push(course)
        localStorage.setItem('course', JSON.stringify())
    }

    static deleteCourses() {

    }

}

document.addEventListener('DOMContentLoaded', Storage.displayCourses)


document.getElementById('new-course').addEventListener('submit', function(e) {
    const title = document.getElementById('title').value;
    const instructor = document.getElementById('instructor').value;
    const image = document.getElementById('image').value

    //create course obj
    const course = new Course(title, instructor, image);

    //create UI
    const ui = new UI();

    if (title === '' || instructor === '' || image === '') {
        ui.showAlert('Please complate the form', 'warning')
    } else {
        //add course to list
        ui.addCourseToList(course);

        //save to LS
        Storage.addCourses(course)

        //clear controls
        ui.clearControls();
        ui.showAlert('The course has been added', 'success')
    }


    e.preventDefault();
});

document.getElementById('course-list').addEventListener('click', function(e) {
    const ui = new UI();
    //delete course
    ui.deleteCourse(e.target);

    //delete from LS
    Storage.deleteCourse()

    ui.showAlert('The course has been delete', 'danger')
});