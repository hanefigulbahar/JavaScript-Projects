import axios from "axios";

async function userData(number) {
    const user = await axios(
        ("https://jsonplaceholder.typicode.com/users/" + number)
    )
    const posts = await axios(
        ("https://jsonplaceholder.typicode.com/posts?userId=" + number)
    )

    return user, posts
}

export default userData