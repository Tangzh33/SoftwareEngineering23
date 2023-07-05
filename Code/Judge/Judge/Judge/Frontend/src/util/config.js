
const data = {
    BACKEND_URL : 'http://119.23.59.217:5000',
    FRONTEND_URL: 'http://skywatch.top',
    PAGINATION: 50,
    COMMUNITY_URL:'http://blog.skywatch.top',
    COURSE_URL:'http://course.skywatch.top'

}

const dataLocal = {
    BACKEND_URL : 'http://119.23.59.217:5000',
    FRONTEND_URL: 'http://localhost:3000',
    PAGINATION: 50,
    COMMUNITY_URL:'http://blog.skywatch.top',
    COURSE_URL:'http://course.skywatch.top'
}

module.exports = (process.env.NODE_ENV === 'development' ? dataLocal : data);